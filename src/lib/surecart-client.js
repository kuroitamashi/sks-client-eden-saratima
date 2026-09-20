/* Le seul lien avec SureCart.
 *
 *  Brancher une boutique reelle, aujourd'hui, c'est renseigner SC_SECRET_KEY,
 *  la cle secrete du marchand. Il n'y a pas d'instance WordPress par
 *  marchand : la cle secrete EST le branchement.
 */

import { getSecret } from 'astro:env/server';

/* L'identifiant de compte ne va PAS dans le chemin.
 *
 *  Ce fichier fabriquait `https://api.surecart.com/v1/<compte>/products`, qui
 *  repond 404 : c'est la cle secrete qui designe le compte, pas l'URL.
 *  Verifie contre l'API le 2026-09-09. DATA_SOURCE=surecart n'avait donc
 *  jamais pu fonctionner, et SC_ACCOUNT_ID ne sert a rien. */
const BASE = 'https://api.surecart.com/v1';

async function request(path) {
  /* Lue A CHAQUE appel et non une fois en haut du fichier : sur Cloudflare,
     les secrets n'existent qu'au moment de la requete, pas au chargement
     du module. */
  const TOKEN = getSecret('SC_SECRET_KEY');
  if (!TOKEN) {
    console.warn('[SureCart] SC_SECRET_KEY non configurée. Aucun produit récupéré.');
    return { data: [] };
  }
  try {
    const res = await fetch(`${BASE}${path}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      console.error(`[SureCart] Erreur API ${res.status}: ${path}`);
      return { data: [] };
    }
    return await res.json();
  } catch (err) {
    console.error(`[SureCart] Requête échouée: ${err.message}`);
    return { data: [] };
  }
}

/* `status[]=published` n'est pas une precaution de style.
 *
 *  Sans lui, l'API rend AUSSI les brouillons : une fiche produit que le
 *  marchand a commencee puis laissee de cote se retrouve en vitrine, prix
 *  compris. Verifie contre l'API le 2026-09-09.
 *
 *  C'est aussi ce filtre qui garde hors de la boutique l'article technique
 *  « Livraison », celui qui porte les frais dans le total de la commande. */
const PUBLIES = 'status[]=published';

export async function fetchProducts({ limit = 50 } = {}) {
  const data = await request(`/products?limit=${limit}&${PUBLIES}&expand[]=prices&expand[]=product_medias`);
  return data.data ?? [];
}
