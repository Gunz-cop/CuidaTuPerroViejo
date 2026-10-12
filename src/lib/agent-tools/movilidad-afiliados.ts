// URLs de afiliado de la tabla RES legada, en el mismo orden que cada plan.
// Sólo las importa la página del selector, que las mantiene ocultas
// (SHOW_AFFILIATE_LINKS=false). La API y WebMCP no las usan ni las exponen.
import type { ResultKey } from './movilidad.ts';

export const AFFILIATE_URLS = {
  LA: ['https://s.click.aliexpress.com/e/_c4Ksutk5', 'https://s.click.aliexpress.com/e/_c3jZdpHP'],
  LB: ['https://s.click.aliexpress.com/e/_c4EfIVmD', 'https://s.click.aliexpress.com/e/_c3pSeh6p'],
  MA: ['https://s.click.aliexpress.com/e/_DFhM6S7', 'https://s.click.aliexpress.com/e/_Dk1eTpt', 'https://s.click.aliexpress.com/e/_Dei2D0J'],
  MB: ['https://s.click.aliexpress.com/e/_Dk1eTpt', 'https://s.click.aliexpress.com/e/_c3pSeh6p', 'https://s.click.aliexpress.com/e/_DmRsn9H'],
  SA: ['https://s.click.aliexpress.com/e/_DkwyN83', 'https://s.click.aliexpress.com/e/_DmRsn9H', 'https://s.click.aliexpress.com/e/_Dmn5fL1', 'https://s.click.aliexpress.com/e/_Dd80lF9'],
  SB: ['https://s.click.aliexpress.com/e/_DkwyN83', 'https://s.click.aliexpress.com/e/_DmRsn9H', 'https://s.click.aliexpress.com/e/_Dd80lF9'],
} as const satisfies Record<ResultKey, readonly string[]>;
