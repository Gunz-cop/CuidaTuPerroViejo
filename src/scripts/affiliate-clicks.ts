/**
 * Avisa al servidor cuando alguien activa el CTA de una ficha afiliada.
 *
 * El enlace conserva su `href` directo al comercio y no se cancela su
 * navegación: esto solo añade un aviso de mejor esfuerzo. Cubre clic, toque,
 * Enter (que el navegador entrega como `click`) y clic con la rueda
 * (`auxclick`). No cubre «Abrir en pestaña nueva» desde el menú contextual ni
 * a quien tenga JavaScript desactivado o un bloqueador que corte la petición.
 *
 * No guarda nada en el navegador ni envía identificadores: solo la ubicación.
 */
const ENDPOINT = '/api/affiliate-click';
const SELECTOR = '[data-affiliate-placement] a[rel~="sponsored"]';
// Un doble clic accidental cuenta una vez.
const REPEAT_WINDOW_MS = 2_000;

const lastSent = new Map<string, number>();

const send = (placement: string) => {
  const now = Date.now();
  if (now - (lastSent.get(placement) ?? 0) < REPEAT_WINDOW_MS) return;
  lastSent.set(placement, now);

  const body = JSON.stringify({ placement });
  try {
    if (navigator.sendBeacon?.(ENDPOINT, new Blob([body], { type: 'application/json' }))) return;
    void fetch(ENDPOINT, {
      method: 'POST',
      body,
      keepalive: true,
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
    }).catch(() => undefined);
  } catch {
    // La medición nunca debe interferir con el enlace.
  }
};

const onActivate = (event: MouseEvent) => {
  if (event.type === 'auxclick' && event.button !== 1) return;
  const target = event.target instanceof Element ? event.target : null;
  const link = target?.closest<HTMLAnchorElement>(SELECTOR);
  const placement = link?.closest<HTMLElement>('[data-affiliate-placement]')?.dataset.affiliatePlacement;
  if (placement) send(placement);
};

declare global {
  interface Window {
    __affiliateClicksReady?: boolean;
  }
}

if (!window.__affiliateClicksReady) {
  window.__affiliateClicksReady = true;
  document.addEventListener('click', onActivate, { capture: true, passive: true });
  document.addEventListener('auxclick', onActivate, { capture: true, passive: true });
}

export {};
