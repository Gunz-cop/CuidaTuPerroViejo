/**
 * Comportamiento del buscador del sitio (src/components/SiteSearch.astro).
 *
 * El índice es el de Pagefind, generado en el build y servido como estáticos
 * desde /pagefind/. No se descarga nada hasta que el visitante abre el
 * buscador, y toda la consulta ocurre en su navegador: no hay servidor, ni
 * coste por búsqueda, ni registro de lo que se busca.
 */
import {
  ASSISTANT_PREFILL_KEY,
  PAGE_SIZE,
  isSearchable,
  normalizeQuery,
  resultSummary,
  stepIndex,
  toIndexQuery,
  toSearchItem,
  type ExcerptPart,
  type PagefindResultData,
  type SearchItem,
} from '../lib/site-search';

interface PagefindHandle {
  id: string;
  data(): Promise<PagefindResultData>;
}

interface Pagefind {
  options(options: Record<string, unknown>): Promise<void>;
  init(): Promise<void>;
  debouncedSearch(query: string, options?: Record<string, unknown>, debounceMs?: number): Promise<{ results: PagefindHandle[] } | null>;
}

type View = 'idle' | 'loading' | 'found' | 'empty' | 'error';

const PAGEFIND_URL = '/pagefind/pagefind.js';
const DEBOUNCE_MS = 140;
/** Si la respuesta llega antes, no se enseña el rastro de huellas: evitaría un parpadeo. */
const LOADING_DELAY_MS = 180;
/** Margen para que arranque la transición de apertura antes de abrir sin ella. */
const MORPH_TIMEOUT_MS = 200;

const PAW_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="7.2" cy="8" r="2.2"></circle><circle cx="16.8" cy="8" r="2.2"></circle><circle cx="4.8" cy="12.7" r="1.9"></circle><circle cx="19.2" cy="12.7" r="1.9"></circle><path d="M12 11.2c-3.5 0-6.4 2.7-6.4 6 0 2 1.5 3.2 3.4 3.2 1.1 0 2-.5 3-.5s1.9.5 3 .5c1.9 0 3.4-1.2 3.4-3.2 0-3.3-2.9-6-6.4-6Z"></path></svg>';
const GO_ICON = '<svg class="ss-opt-go" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg>';

let pagefindPromise: Promise<Pagefind> | null = null;

const loadPagefind = (): Promise<Pagefind> => {
  pagefindPromise ??= (async () => {
    // La ruta va en una variable para que Vite no intente resolverla: el
    // archivo no existe hasta que Pagefind lo escribe al final del build.
    const pagefind = (await import(/* @vite-ignore */ PAGEFIND_URL)) as Pagefind;
    await pagefind.options({ excerptLength: 24 });
    await pagefind.init();
    return pagefind;
  })().catch((error: unknown) => {
    pagefindPromise = null;
    throw error;
  });
  return pagefindPromise;
};

const el = <K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

// `appendChild` y no `append`: los tipos del runtime de Workers declaran otro
// `Element.append` (el de HTMLRewriter) y el typecheck los confunde.
const add = (parent: Node, ...children: Node[]) => {
  for (const child of children) parent.appendChild(child);
};

const appendExcerpt =(target: HTMLElement, parts: ExcerptPart[]) => {
  for (const part of parts) {
    add(target, part.mark ? el('mark', undefined, part.text) : document.createTextNode(part.text));
  }
};

const isTypingTarget = (target: EventTarget | null): boolean =>
  target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));

const isVisible = (node: HTMLElement): boolean => node.getClientRects().length > 0;

export const initSiteSearch = () => {
  const dialog = document.querySelector<HTMLDialogElement>('[data-site-search]');
  if (!dialog || dialog.dataset.ssReady !== undefined) return;
  dialog.dataset.ssReady = '';

  const input = dialog.querySelector<HTMLInputElement>('#ss-input');
  const list = dialog.querySelector<HTMLUListElement>('#ss-results');
  const status = dialog.querySelector<HTMLElement>('[data-ss-status]');
  const summary = dialog.querySelector<HTMLElement>('[data-ss-summary]');
  const term = dialog.querySelector<HTMLElement>('[data-ss-term]');
  const clear = dialog.querySelector<HTMLButtonElement>('[data-ss-clear]');
  const more = dialog.querySelector<HTMLButtonElement>('[data-ss-more]');
  const body = dialog.querySelector<HTMLElement>('.ss-body');
  const views = new Map<View, HTMLElement>();
  dialog.querySelectorAll<HTMLElement>('[data-ss-view]').forEach((view) => views.set(view.dataset.ssView as View, view));
  if (!input || !list || !status || !summary || !term || !clear || !more || !body) return;

  let token = 0;
  let query = '';
  let handles: PagefindHandle[] = [];
  let shown = 0;
  let optionCount = 0;
  let active = -1;

  const show = (view: View) => {
    views.forEach((node, name) => { node.hidden = name !== view; });
    input.setAttribute('aria-expanded', String(view === 'found'));
    if (view !== 'found') setActive(-1);
  };

  const options = () => Array.from(list.querySelectorAll<HTMLLIElement>('[role="option"]'));

  const setActive = (index: number, scroll = false) => {
    const all = options();
    active = index >= 0 && index < all.length ? index : -1;
    all.forEach((option, i) => option.setAttribute('aria-selected', String(i === active)));
    const current = all[active];
    if (current) {
      input.setAttribute('aria-activedescendant', current.id);
      if (scroll) current.scrollIntoView({ block: 'nearest' });
    } else {
      input.removeAttribute('aria-activedescendant');
    }
  };

  const buildOption = (className: string, href: string, delayIndex: number) => {
    const option = el('li', `ss-opt ${className}`.trim());
    option.id = `ss-opt-${optionCount}`;
    option.setAttribute('role', 'option');
    option.setAttribute('aria-selected', 'false');
    option.style.setProperty('--i', String(delayIndex));
    const index = optionCount;
    optionCount += 1;
    const link = el('a', 'ss-opt-link');
    link.href = href;
    link.tabIndex = -1;
    add(option, link);
    option.addEventListener('pointermove', () => { if (active !== index) setActive(index); });
    return { option, link };
  };

  const renderItem = (item: SearchItem, delayIndex: number) => {
    const fragment = document.createDocumentFragment();
    const { option, link } = buildOption('', item.url, delayIndex);

    const thumb = el('span', 'ss-opt-thumb');
    thumb.innerHTML = PAW_ICON;
    if (item.image) {
      const image = el('img');
      image.alt = '';
      // Sin `loading="lazy"`: la imagen aún no está en el documento y no cargaría nunca.
      image.decoding = 'async';
      image.width = 56;
      image.height = 56;
      image.addEventListener('load', () => thumb.replaceChildren(image));
      image.src = item.image;
    }

    const text = el('span', 'ss-opt-text');
    add(text,
      el('span', 'ss-opt-meta', item.seccion && item.seccion !== item.tipo ? `${item.tipo} · ${item.seccion}` : item.tipo),
      el('span', 'ss-opt-title', item.title),
    );
    if (item.excerpt.length > 0) {
      const excerpt = el('span', 'ss-opt-excerpt');
      appendExcerpt(excerpt, item.excerpt);
      add(text, excerpt);
    }
    add(link, thumb, text);
    link.insertAdjacentHTML('beforeend', GO_ICON);
    add(fragment, option);

    for (const section of item.sections) {
      const sub = buildOption('ss-opt--section', section.url, delayIndex);
      const subText = el('span', 'ss-opt-text');
      add(subText, el('span', 'ss-opt-title', section.title));
      // Sin coincidencia resaltada, el fragmento solo repetiría el título del apartado.
      if (section.excerpt.some((part) => part.mark)) {
        const excerpt = el('span', 'ss-opt-excerpt');
        appendExcerpt(excerpt, section.excerpt);
        add(subText, excerpt);
      }
      add(sub.link, subText);
      sub.link.insertAdjacentHTML('beforeend', GO_ICON);
      add(fragment, sub.option);
    }
    return fragment;
  };

  const loadPage = async (current: number) => {
    const page = handles.slice(shown, shown + PAGE_SIZE);
    const items = (await Promise.all(page.map((handle) => handle.data()))).map(toSearchItem);
    if (current !== token) return;
    items.forEach((item, i) => add(list, renderItem(item, i)));
    shown += page.length;
    more.hidden = shown >= handles.length;
  };

  const fail = (current: number) => {
    if (current !== token) return;
    show('error');
    status.textContent = 'El buscador no pudo cargar.';
  };

  const run = async () => {
    query = normalizeQuery(input.value);
    clear.hidden = input.value === '';
    const current = ++token;

    if (!isSearchable(query)) {
      show('idle');
      status.textContent = '';
      return;
    }

    const loadingTimer = window.setTimeout(() => { if (current === token) show('loading'); }, LOADING_DELAY_MS);
    try {
      const pagefind = await loadPagefind();
      const response = await pagefind.debouncedSearch(toIndexQuery(query), {}, DEBOUNCE_MS);
      // `null` significa que llegó otra pulsación antes: esa búsqueda manda.
      if (response === null || current !== token) return;

      handles = response.results;
      shown = 0;
      optionCount = 0;
      list.replaceChildren();
      body.scrollTop = 0;

      if (handles.length === 0) {
        term.textContent = query;
        show('empty');
        status.textContent = `${resultSummary(0, query)}. Puedes preguntarle al asistente.`;
        return;
      }

      await loadPage(current);
      if (current !== token) return;
      summary.textContent = resultSummary(handles.length, query);
      status.textContent = `${resultSummary(handles.length, query)}. Usa las flechas para recorrerlos.`;
      show('found');
    } catch {
      fail(current);
    } finally {
      window.clearTimeout(loadingTimer);
    }
  };

  /* ------------------------------ Abrir y cerrar ------------------------------ */

  const open = (trigger?: HTMLElement) => {
    if (dialog.open || dialog.classList.contains('ss--morph')) return;
    // El hueco de la barra de desplazamiento se compensa para que la página no salte.
    document.documentElement.style.setProperty('--ss-scrollbar', `${window.innerWidth - document.documentElement.clientWidth}px`);

    const origin = trigger && isVisible(trigger)
      ? trigger
      : Array.from(document.querySelectorAll<HTMLElement>('[data-search-open]')).find(isVisible);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // View Transitions: la lupa o el campo que se pulsó se convierte en la barra
    // del buscador. Sin soporte (o con «reducir movimiento»), entrada con CSS.
    if (origin && !reduceMotion && typeof document.startViewTransition === 'function') {
      origin.style.setProperty('view-transition-name', 'ss-bar');
      dialog.classList.add('ss--morph');
      const reveal = () => {
        origin.style.removeProperty('view-transition-name');
        if (!dialog.open) dialog.showModal();
        input.focus();
      };
      const transition = document.startViewTransition(reveal);
      // Una transición omitida rechaza estas promesas; no es un error que atender.
      void transition.ready.catch(() => undefined);
      void transition.updateCallbackDone.catch(() => undefined);
      // La transición espera al siguiente fotograma. Si el navegador no pinta
      // (pestaña en segundo plano, equipo saturado), el buscador se abre igual.
      const fallback = window.setTimeout(() => {
        if (dialog.open) return;
        transition.skipTransition();
        reveal();
      }, MORPH_TIMEOUT_MS);
      void transition.finished.catch(() => undefined).then(() => {
        window.clearTimeout(fallback);
        dialog.classList.remove('ss--morph');
      });
    } else {
      dialog.showModal();
    }

    input.focus();
    input.select();
    // El índice empieza a descargarse al abrir, no al cargar la página.
    void loadPagefind().catch(() => undefined);
  };

  const close = () => { if (dialog.open) dialog.close(); };

  document.addEventListener('click', (event) => {
    const trigger = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-search-open]') : null;
    if (!trigger) return;
    event.preventDefault();
    open(trigger);
  });

  document.addEventListener('keydown', (event) => {
    if (event.defaultPrevented || event.isComposing) return;
    if ((event.ctrlKey || event.metaKey) && !event.altKey && !event.shiftKey && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      if (dialog.open) close(); else open();
      return;
    }
    if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey && !dialog.open && !isTypingTarget(event.target)) {
      event.preventDefault();
      open();
    }
  });

  // Un clic en el fondo (el propio <dialog>, fuera del panel) cierra.
  dialog.addEventListener('click', (event) => { if (event.target === dialog) close(); });
  dialog.querySelectorAll('[data-ss-close]').forEach((button) => button.addEventListener('click', close));

  /* --------------------------------- Escritura -------------------------------- */

  input.addEventListener('input', () => void run());

  input.addEventListener('keydown', (event) => {
    if (event.isComposing) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      const length = options().length;
      if (length === 0) return;
      event.preventDefault();
      setActive(stepIndex(active, event.key === 'ArrowDown' ? 1 : -1, length), true);
    } else if (event.key === 'Enter') {
      const all = options();
      const target = all[active] ?? all[0];
      if (!target) return;
      event.preventDefault();
      target.querySelector<HTMLAnchorElement>('a')?.click();
    }
  });

  clear.addEventListener('click', () => {
    input.value = '';
    input.focus();
    void run();
  });

  more.addEventListener('click', () => {
    more.hidden = true;
    void loadPage(token).catch(() => fail(token));
  });

  dialog.querySelectorAll<HTMLButtonElement>('[data-ss-query]').forEach((chip) => {
    chip.addEventListener('click', () => {
      input.value = chip.dataset.ssQuery ?? '';
      input.focus();
      void run();
    });
  });

  dialog.querySelector('[data-ss-retry]')?.addEventListener('click', () => void run());

  // «Pregúntale al asistente»: la consulta viaja por sessionStorage, no por la
  // URL, y el asistente la deja escrita sin enviarla.
  dialog.querySelectorAll('[data-ss-ask]').forEach((link) => {
    link.addEventListener('click', () => {
      try { sessionStorage.setItem(ASSISTANT_PREFILL_KEY, query); } catch { /* sin almacenamiento: llega al asistente vacío */ }
    });
  });

  // En Mac el atajo se anuncia con ⌘.
  if (/Mac|iPhone|iPad/.test(navigator.platform)) {
    document.querySelectorAll<HTMLElement>('[data-search-key]').forEach((key) => { key.textContent = '⌘K'; });
  }
};
