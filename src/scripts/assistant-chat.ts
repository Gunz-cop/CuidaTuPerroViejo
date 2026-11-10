/**
 * Motor de chat del asistente, compartido por el widget flotante y la página
 * /asistente-ia. El marcado inicial lo pone AssistantChat.astro; aquí vive el
 * estado, el streaming y el pintado de mensajes.
 *
 * La conversación se guarda en sessionStorage: sobrevive a la navegación (el
 * visitante abre una guía recomendada y el chat sigue ahí) y se borra al cerrar
 * la pestaña.
 */

type Recommendation = { title: string; description: string; href: string; pillar: string };

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
  id?: string;
  recommendations?: Recommendation[];
  urgent?: boolean;
  feedback?: 'up' | 'down';
  failed?: boolean;
};

type ChatState = { conversationId: string; messages: ChatMessage[] };

type StreamEvent =
  | { type: 'meta'; id: string; urgent: boolean }
  | { type: 'reading'; title: string }
  | { type: 'delta'; text: string }
  | { type: 'reset' }
  | { type: 'done'; id: string; answer: string; recommendations: Recommendation[]; urgent: boolean }
  | { type: 'error'; error: string };

const STORAGE_KEY = 'ctpv-assistant-v1';
const SYNC_EVENT = 'ctpv-assistant-sync';
const RESET_EVENT = 'ctpv-assistant-reset';
const MAX_STORED_MESSAGES = 24;
const MAX_HISTORY_MESSAGES = 8;
const SVG_NS = 'http://www.w3.org/2000/svg';

const ICONS = {
  arrow: 'M5 12h14m-6-6 6 6-6 6',
  up: 'M7 10v11M2 12v7a2 2 0 0 0 2 2h13.4a2 2 0 0 0 2-1.6l1.2-7A2 2 0 0 0 18.7 10H14l.7-4.3A2 2 0 0 0 12.7 3.4L7 10',
  down: 'M17 14V3m5 9V5a2 2 0 0 0-2-2H6.6a2 2 0 0 0-2 1.6l-1.2 7A2 2 0 0 0 5.3 14H10l-.7 4.3a2 2 0 0 0 2 2.3L17 14',
  alert: 'M10.3 2.9 1.8 17a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 2.9a2 2 0 0 0-3.4 0ZM12 9v4m0 4h.01',
};

// appendChild y no append: @cloudflare/workers-types declara su propio
// `interface Element` (el de HTMLRewriter) que se fusiona con el del DOM y
// rechaza pasarle nodos a `append`.
const el = <K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string): HTMLElementTagNameMap[K] => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

const icon = (path: string, className = 'ac-icon'): SVGSVGElement => {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('class', className);
  const shape = document.createElementNS(SVG_NS, 'path');
  shape.setAttribute('d', path);
  svg.appendChild(shape);
  return svg;
};

const newId = (): string => (
  typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) => (Number(c) ^ (crypto.getRandomValues(new Uint8Array(1))[0]! & (15 >> (Number(c) / 4)))).toString(16))
);

const loadState = (): ChatState => {
  try {
    const stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? 'null') as ChatState | null;
    if (stored && typeof stored.conversationId === 'string' && Array.isArray(stored.messages)) return stored;
  } catch { /* almacenamiento no disponible o dañado: se empieza de cero */ }
  return { conversationId: newId(), messages: [] };
};

const saveState = (state: ChatState) => {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
      conversationId: state.conversationId,
      messages: state.messages.slice(-MAX_STORED_MESSAGES),
    }));
  } catch { /* sin almacenamiento el chat funciona igual, solo no persiste */ }
};

const sendEvent = (payload: Record<string, string>) => {
  try {
    const body = JSON.stringify(payload);
    if (!navigator.sendBeacon?.('/api/assistant-event', new Blob([body], { type: 'application/json' }))) {
      void fetch('/api/assistant-event', { method: 'POST', body, keepalive: true, headers: { 'Content-Type': 'application/json' } });
    }
  } catch { /* la métrica es prescindible */ }
};

/* ---------- Markdown seguro: se construyen nodos, nunca innerHTML ---------- */

const INLINE = /(\*\*([^*\n]+)\*\*)|(\*([^*\n]+)\*)|(`([^`\n]+)`)|(\[([^\]\n]+)\]\(([^)\s]+)\))/g;

const appendInline = (parent: HTMLElement, text: string) => {
  let last = 0;
  for (const match of text.matchAll(INLINE)) {
    const index = match.index ?? 0;
    if (index > last) parent.appendChild(document.createTextNode(text.slice(last, index)));
    if (match[2] !== undefined) {
      const strong = el('strong');
      appendInline(strong, match[2]);
      parent.appendChild(strong);
    } else if (match[4] !== undefined) {
      parent.appendChild(el('em', undefined, match[4]));
    } else if (match[6] !== undefined) {
      parent.appendChild(el('code', undefined, match[6]));
    } else if (match[8] !== undefined && match[9] !== undefined) {
      // Solo enlaces internos; el servidor ya descartó los que no existen.
      if (match[9].startsWith('/') && !match[9].startsWith('//')) {
        const link = el('a', 'ac-link');
        link.href = match[9];
        appendInline(link, match[8]);
        parent.appendChild(link);
      } else {
        appendInline(parent, match[8]);
      }
    }
    last = index + match[0].length;
  }
  if (last < text.length) parent.appendChild(document.createTextNode(text.slice(last)));
};

const renderMarkdown = (container: HTMLElement, markdown: string) => {
  container.replaceChildren();
  let list: HTMLUListElement | HTMLOListElement | null = null;
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    const p = el('p');
    appendInline(p, paragraph.join(' '));
    container.appendChild(p);
    paragraph = [];
  };

  for (const rawLine of markdown.split('\n')) {
    const line = rawLine.trim();
    const heading = /^(#{1,4})\s+(.*)$/.exec(line);
    const bullet = /^[-*•]\s+(.*)$/.exec(line);
    const ordered = /^\d+[.)]\s+(.*)$/.exec(line);

    if (!line) {
      flushParagraph();
      list = null;
    } else if (heading) {
      flushParagraph();
      list = null;
      const h = el(heading[1]!.length <= 2 ? 'h3' : 'h4');
      appendInline(h, heading[2]!);
      container.appendChild(h);
    } else if (bullet || ordered) {
      flushParagraph();
      const tag = bullet ? 'UL' : 'OL';
      if (!list || list.tagName !== tag) {
        list = el(bullet ? 'ul' : 'ol');
        container.appendChild(list);
      }
      const item = el('li');
      appendInline(item, (bullet ?? ordered)![1]!);
      list.appendChild(item);
    } else {
      list = null;
      paragraph.push(line);
    }
  }
  flushParagraph();
};

/** Mientras llega el texto, no mostrar un enlace o una negrita a medio escribir. */
const hidePartialSyntax = (text: string) => {
  let visible = text.replace(/\[[^\]\n]*(\]\([^)\n]*)?$/, '');
  const lastLine = visible.slice(visible.lastIndexOf('\n') + 1);
  if ((lastLine.match(/\*\*/g) ?? []).length % 2 === 1) {
    const open = visible.lastIndexOf('**');
    visible = visible.slice(0, open) + visible.slice(open + 2);
  }
  return visible;
};

/* ------------------------------ Componente ------------------------------ */

const mountChat = (root: HTMLElement) => {
  const log = root.querySelector<HTMLElement>('[data-ac-log]');
  const form = root.querySelector<HTMLFormElement>('[data-ac-form]');
  const input = root.querySelector<HTMLTextAreaElement>('[data-ac-input]');
  const submit = root.querySelector<HTMLButtonElement>('[data-ac-submit]');
  const intro = root.querySelector<HTMLElement>('[data-ac-intro]');
  const announcer = root.querySelector<HTMLElement>('[data-ac-announcer]');
  const counter = root.querySelector<HTMLElement>('[data-ac-counter]');
  if (!log || !form || !input || !submit) return;

  const surface = root.dataset.acSurface === 'page' ? 'page' : 'widget';
  let state = loadState();
  let busy = false;

  const scrollToEnd = () => { log.scrollTop = log.scrollHeight; };

  const setBusy = (value: boolean) => {
    busy = value;
    submit.disabled = value;
    root.toggleAttribute('data-ac-busy', value);
  };

  const buildCards = (message: ChatMessage): HTMLElement | null => {
    if (!message.recommendations?.length) return null;
    const section = el('div', 'ac-cards');
    section.appendChild(el('p', 'ac-cards-title', message.recommendations.length === 1 ? 'Guía recomendada del sitio' : 'Guías recomendadas del sitio'));
    for (const item of message.recommendations) {
      const card = el('a', 'ac-card');
      card.href = item.href;
      const copy = el('span', 'ac-card-copy');
      copy.appendChild(el('span', 'ac-card-pillar', item.pillar));
      copy.appendChild(el('strong', 'ac-card-name', item.title));
      copy.appendChild(el('span', 'ac-card-description', item.description));
      card.appendChild(copy);
      card.appendChild(icon(ICONS.arrow, 'ac-icon ac-card-arrow'));
      section.appendChild(card);
    }
    return section;
  };

  const buildFeedback = (message: ChatMessage): HTMLElement | null => {
    if (!message.id || message.failed) return null;
    const row = el('div', 'ac-feedback');
    const label = el('span', 'ac-feedback-label', message.feedback ? 'Gracias por tu valoración' : '¿Te sirvió?');
    row.appendChild(label);
    const options: Array<['up' | 'down', string, string]> = [['up', 'Sí, me sirvió', ICONS.up], ['down', 'No me sirvió', ICONS.down]];
    for (const [value, title, path] of options) {
      const button = el('button', 'ac-feedback-button');
      button.type = 'button';
      button.setAttribute('aria-label', title);
      button.title = title;
      button.setAttribute('aria-pressed', String(message.feedback === value));
      button.appendChild(icon(path));
      button.addEventListener('click', () => {
        if (message.feedback === value) return;
        message.feedback = value;
        saveState(state);
        sendEvent({ id: message.id!, type: 'feedback', value });
        row.querySelectorAll('button').forEach((other) => other.setAttribute('aria-pressed', String(other === button)));
        label.textContent = 'Gracias por tu valoración';
      });
      row.appendChild(button);
    }
    return row;
  };

  /** Completa un mensaje del asistente ya terminado: aviso, tarjetas y voto. */
  const finishAssistant = (bubble: HTMLElement, message: ChatMessage) => {
    const body = bubble.querySelector<HTMLElement>('.ac-body');
    if (body) renderMarkdown(body, message.content);
    bubble.querySelector('.ac-status')?.remove();
    bubble.querySelector('.ac-extras')?.remove();

    const extras = el('div', 'ac-extras');
    if (message.urgent) {
      const urgent = el('p', 'ac-urgent');
      urgent.appendChild(icon(ICONS.alert));
      urgent.appendChild(el('span', undefined, 'Esto puede ser una urgencia: contacta ahora con un veterinario de urgencias.'));
      bubble.insertBefore(urgent, bubble.firstChild);
    }
    const cards = buildCards(message);
    if (cards) extras.appendChild(cards);
    if (!message.failed) {
      extras.appendChild(el('p', 'ac-disclaimer', 'Orientación informativa: no sustituye la consulta con tu veterinario. Ante cualquier duda sobre la salud de tu perro, llévalo a revisión.'));
    }
    const feedback = buildFeedback(message);
    if (feedback) extras.appendChild(feedback);
    bubble.appendChild(extras);

    if (message.id) {
      bubble.addEventListener('click', (event) => {
        const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="/"]');
        if (link) sendEvent({ id: message.id!, type: 'click', href: link.getAttribute('href') ?? '' });
      });
    }
  };

  const addMessage = (message: ChatMessage, pending = false): HTMLElement => {
    const row = el('div', `ac-row ac-row-${message.role}`);
    const bubble = el('div', `ac-bubble ac-bubble-${message.role}`);
    if (message.role === 'user') {
      bubble.textContent = message.content;
    } else {
      bubble.appendChild(el('div', 'ac-body'));
      if (pending) {
        const status = el('p', 'ac-status');
        status.appendChild(el('span', 'ac-dots'));
        status.appendChild(el('span', 'ac-status-text', 'Buscando en nuestras guías…'));
        bubble.appendChild(status);
      } else {
        finishAssistant(bubble, message);
      }
    }
    row.appendChild(bubble);
    log.appendChild(row);
    return bubble;
  };

  const render = () => {
    log.querySelectorAll('.ac-row').forEach((row) => row.remove());
    intro?.toggleAttribute('hidden', state.messages.length > 0);
    root.toggleAttribute('data-ac-started', state.messages.length > 0);
    state.messages.forEach((message) => addMessage(message));
    scrollToEnd();
  };

  const ask = async (raw: string) => {
    const question = raw.trim();
    if (busy || question.length < 3) {
      if (!busy) input.focus();
      return;
    }

    const history = state.messages
      .filter((message) => !message.failed)
      .slice(-MAX_HISTORY_MESSAGES)
      .map(({ role, content }) => ({ role, content }));

    state.messages.push({ role: 'user', content: question });
    saveState(state);
    intro?.setAttribute('hidden', '');
    root.setAttribute('data-ac-started', '');
    const questionBubble = addMessage({ role: 'user', content: question });
    input.value = '';
    input.style.height = '';
    if (counter) counter.textContent = '';
    setBusy(true);

    const answer: ChatMessage = { role: 'assistant', content: '' };
    const bubble = addMessage(answer, true);
    const body = bubble.querySelector<HTMLElement>('.ac-body')!;
    const statusText = bubble.querySelector<HTMLElement>('.ac-status-text');
    // La pregunta sube al borde superior y la respuesta crece debajo: así se
    // lee desde el principio en vez de perseguir el final mientras se escribe.
    log.scrollTop = questionBubble.getBoundingClientRect().top - log.getBoundingClientRect().top + log.scrollTop - 12;

    let frame = 0;
    const paint = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        renderMarkdown(body, hidePartialSyntax(answer.content));
      });
    };

    const fail = (text: string) => {
      answer.content = text;
      answer.failed = true;
    };

    // Se pone a true cuando el servidor cierra la respuesta con `done` o `error`.
    let finished = false;
    const handle = (event: StreamEvent) => {
      if (event.type === 'meta') {
        answer.id = event.id;
      } else if (event.type === 'reading') {
        if (statusText) statusText.textContent = `Leyendo la guía: ${event.title}`;
      } else if (event.type === 'delta') {
        answer.content += event.text;
        if (statusText) statusText.textContent = 'Escribiendo la respuesta…';
        paint();
      } else if (event.type === 'reset') {
        answer.content = '';
        paint();
      } else if (event.type === 'done') {
        finished = true;
        answer.id = event.id;
        answer.content = event.answer;
        answer.recommendations = event.recommendations;
        answer.urgent = event.urgent;
      } else if (event.type === 'error') {
        finished = true;
        fail(event.error);
      }
    };

    try {
      // Si el servidor corta la respuesta antes de enviar nada, se reintenta una
      // vez: es un fallo transitorio y la consulta no llegó a responderse.
      for (let attempt = 0; attempt < 2 && !finished; attempt += 1) {
        const response = await fetch('/api/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question, history, stream: true, surface, conversationId: state.conversationId }),
        });

        if (!response.ok || !response.body) {
          const data = await response.json().catch(() => ({})) as { error?: string };
          fail(data.error || 'No pudimos procesar la consulta. Inténtalo de nuevo en unos segundos.');
          break;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';
          for (const line of lines) {
            if (line.trim()) handle(JSON.parse(line) as StreamEvent);
          }
        }
        if (buffer.trim()) handle(JSON.parse(buffer) as StreamEvent);

        if (finished) break;
        if (answer.content) {
          answer.content += '\n\n*La respuesta se interrumpió antes de terminar.*';
          break;
        }
        if (attempt === 1) fail('No conseguimos preparar una respuesta. Inténtalo de nuevo en unos segundos.');
        else if (statusText) statusText.textContent = 'Buscando en nuestras guías…';
      }
    } catch {
      // Si el corte llegó a mitad de respuesta, se conserva lo recibido y se avisa.
      if (answer.content) answer.content += '\n\n*La respuesta se interrumpió antes de terminar.*';
      else fail('No logramos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.');
    }

    if (frame) cancelAnimationFrame(frame);
    bubble.classList.toggle('ac-bubble-failed', Boolean(answer.failed));
    finishAssistant(bubble, answer);
    state.messages.push(answer);
    saveState(state);
    setBusy(false);
    if (announcer) announcer.textContent = answer.failed ? answer.content : 'Respuesta lista.';
    window.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: root }));
  };

  const autoGrow = () => {
    input.style.height = 'auto';
    input.style.height = `${Math.min(input.scrollHeight, 160)}px`;
    if (counter) {
      const remaining = input.maxLength - input.value.length;
      counter.textContent = remaining <= 80 ? `${remaining}` : '';
    }
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    void ask(input.value);
  });
  input.addEventListener('input', autoGrow);
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
      event.preventDefault();
      void ask(input.value);
    }
  });
  root.querySelectorAll<HTMLButtonElement>('[data-ac-suggestion]').forEach((button) => {
    button.addEventListener('click', () => void ask(button.dataset.acSuggestion || button.textContent || ''));
  });
  window.addEventListener(RESET_EVENT, () => {
    if (busy) return;
    state = { conversationId: newId(), messages: [] };
    saveState(state);
    render();
    if (root.closest('[inert]') === null) input.focus();
  });

  // Si hay dos chats en la misma página, el otro refleja la conversación.
  window.addEventListener(SYNC_EVENT, (event) => {
    if ((event as CustomEvent).detail === root || busy) return;
    state = loadState();
    render();
  });

  render();
};

/* --------------------------- Widget flotante --------------------------- */

const mountWidget = (widget: HTMLElement) => {
  const toggle = widget.querySelector<HTMLButtonElement>('[data-ac-toggle]');
  const panel = widget.querySelector<HTMLElement>('[data-ac-panel]');
  const input = widget.querySelector<HTMLTextAreaElement>('[data-ac-input]');
  if (!toggle || !panel) return;

  const setOpen = (open: boolean, focus = true) => {
    widget.toggleAttribute('data-ac-open', open);
    panel.toggleAttribute('inert', !open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar el asistente' : 'Abrir el asistente');
    try { sessionStorage.setItem(`${STORAGE_KEY}-open`, open ? '1' : '0'); } catch { /* sin persistencia */ }
    if (open) {
      const log = panel.querySelector<HTMLElement>('[data-ac-log]');
      if (log) log.scrollTop = log.scrollHeight;
      // En pantallas táctiles no se enfoca el campo: abriría el teclado y taparía el chat.
      if (focus && window.matchMedia('(hover: hover) and (min-width: 640px)').matches) input?.focus();
    } else if (focus) {
      toggle.focus();
    }
  };

  toggle.addEventListener('click', () => setOpen(!widget.hasAttribute('data-ac-open')));
  widget.querySelectorAll('[data-ac-close]').forEach((button) => button.addEventListener('click', () => setOpen(false)));
  widget.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && widget.hasAttribute('data-ac-open')) setOpen(false);
  });

  let wasOpen = false;
  try { wasOpen = sessionStorage.getItem(`${STORAGE_KEY}-open`) === '1'; } catch { /* sin persistencia */ }
  // Al navegar con el chat abierto se reabre solo en escritorio; en móvil
  // ocuparía toda la pantalla y taparía la guía que el visitante quiso leer.
  setOpen(wasOpen && window.matchMedia('(min-width: 640px)').matches, false);
};

export const initAssistantChats = () => {
  document.querySelectorAll<HTMLElement>('[data-assistant-chat]:not([data-ac-ready])').forEach((root) => {
    root.setAttribute('data-ac-ready', '');
    mountChat(root);
  });
  document.querySelectorAll<HTMLElement>('[data-ac-reset]:not([data-ac-ready])').forEach((button) => {
    button.setAttribute('data-ac-ready', '');
    button.addEventListener('click', () => window.dispatchEvent(new CustomEvent(RESET_EVENT)));
  });
  document.querySelectorAll<HTMLElement>('[data-assistant-widget]:not([data-ac-ready])').forEach((widget) => {
    widget.setAttribute('data-ac-ready', '');
    mountWidget(widget);
  });
};
