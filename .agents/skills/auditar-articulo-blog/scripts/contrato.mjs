/** Contrato mecánico; no interpreta bienestar, fuentes ni utilidad. */
export function parseEditorialContract(raw) {
  const headers = raw.split(/\r?\n/).filter(l => /^\s*Contrato editorial\b/.test(l));
  if (!headers.length) return { version: 'legacy', boxes: null, faq: null, errors: [] };
  const errors = [];
  if (headers.length !== 1 || headers[0].trim() !== 'Contrato editorial: 2.0') {
    return { version: 'invalid', boxes: null, faq: null, errors: ['versión de contrato duplicada o no soportada'] };
  }
  const boxLines = raw.split(/\r?\n/).filter(l => /^\s*Componentes de cuerpo\b/.test(l));
  const box = boxLines.length === 1 && boxLines[0].match(/^Componentes de cuerpo: info=([0-9]); danger=([0-9]); warning=([0-9])\s*$/);
  if (!box) errors.push('declaración de componentes 2.0 ausente, duplicada o inválida');
  const faqLines = raw.split(/\r?\n/).filter(l => /^\s*FAQ\s*:/.test(l));
  const faq = faqLines.length === 1 && faqLines[0].match(/^FAQ: (\d+) preguntas\.?\s*$/);
  if (!faq || !Number.isSafeInteger(Number(faq[1]))) errors.push('declaración FAQ 2.0 ausente, duplicada o inválida');
  return { version: '2.0', boxes: box ? { info: Number(box[1]), danger: Number(box[2]), warning: Number(box[3]) } : null,
    faq: faq && Number.isSafeInteger(Number(faq[1])) ? Number(faq[1]) : null, errors };
}
