/* Origine de la visiteuse : d'ou vient-elle quand elle arrive sur la boutique ?
 *
 * Sans dependance : ce fichier se copie tel quel d'un theme a l'autre.
 * Cle de stockage : sks_origine (localStorage). Duree de garde : 30 jours.
 * Le moteur normalise la valeur (chatgpt.com devient "chatgpt"), on garde le brut.
 */
export const CLE_ORIGINE = 'sks_origine';
const DUREE = 30 * 24 * 3600 * 1000;
const HOTE_CAISSE = 'checkout.senkheweulstore.com';

/* Meme boutique avec ou sans www, majuscules ou non. */
const normaliser = (hote) => String(hote || '').toLowerCase().replace(/^www\./, '');

const hoteDe = (adresse) => {
  try { return normaliser(new URL(adresse).hostname); } catch { return ''; }
};

/* Renvoie l'origine a stocker (ou null pour effacer).
 * Une etiquette (?source, sinon ?utm_source) ou un referrer externe, plus
 * recent, remplace l'existante. Sinon on garde l'existante tant qu'elle a
 * moins de 30 jours. */
export function origineAGarder(url, referrer, hoteBoutique, existante, maintenant) {
  let etiquette = '';
  try {
    const q = new URL(url).searchParams;
    etiquette = (q.get('source') || q.get('utm_source') || '').trim();
  } catch { /* adresse illisible */ }
  if (etiquette) return { source: etiquette, at: maintenant };

  const hote = hoteDe(referrer);
  if (hote && hote !== normaliser(hoteBoutique) && hote !== HOTE_CAISSE) {
    return { referrer, at: maintenant };
  }

  // Sans date valide, ou a 30 jours pile ou plus : perimee, donc null.
  const recente = Number.isFinite(existante?.at) && maintenant - existante.at < DUREE;
  return recente ? existante : null;
}
