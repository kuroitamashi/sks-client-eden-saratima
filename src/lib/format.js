/* Mise en forme des montants et des dates.
 *
 *  La devise et la langue viennent du contrat (theme.commerce), pas d'une
 *  constante : un template SKS doit pouvoir servir un marchand hors zone
 *  FCFA sans qu'on rouvre le code.
 */

/**
 * Formate un montant.
 * @param {number} amount
 * @param {{ currency?: string, locale?: string }} commerce
 * @returns {string} ex: "12 500 F CFA"
 */
export function formatMoney(amount, commerce = {}) {
  const { currency = 'XOF', locale = 'fr-SN' } = commerce;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Genere un slug a partir d'un texte.
 * @param {string} text
 * @returns {string}
 */
export function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
