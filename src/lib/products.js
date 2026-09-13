/* Le second robinet : d'ou viennent les produits.
 *
 *  Les pages ne connaissent que listProducts() et getProduct(). Basculer
 *  d'une boutique de demonstration a un vrai catalogue est un changement de
 *  variable d'environnement, pas un changement de code :
 *
 *      DATA_SOURCE=fixture    -> src/data/fixtures/cosmetiques.js
 *      DATA_SOURCE=surecart   -> l'API SureCart, avec la cle du marchand
 *
 *  normalize() est la piece qui rend les deux sources interchangeables :
 *  quelle que soit l'origine, une page recoit toujours la meme forme
 *  d'objet. Sans elle, chaque composant devrait connaitre les deux formats.
 */

import { products as fixtureProducts } from '../data/fixtures/cosmetiques.js';
import { slugify } from './format.js';

const SOURCE = import.meta.env.DATA_SOURCE ?? 'surecart';

/** La forme unique qu'une page voit, quelle que soit la source. */
function normalizeFromSureCart(raw) {
  const prices = raw.prices?.data ?? raw.prices ?? [];
  const price = prices[0] ?? {};
  const medias = raw.product_medias?.data ?? raw.product_medias ?? [];

  return {
    id: raw.id,
    slug: raw.slug ?? slugify(raw.name),
    name: raw.name,
    subtitle: raw.description ? String(raw.description).slice(0, 90) : '',
    /* PAS de division par 100.
     *
     *  Le franc CFA n'a pas de subdivision : SureCart stocke 825 pour
     *  825 FCFA, la ou il stockerait 825 pour 8,25 euros. La division venait
     *  d'une devise a centimes, et affichait un produit a 14 900 FCFA au prix
     *  de 149 FCFA. Verifie contre l'API le 2026-09-09, et le dashboard lit
     *  ces montants sans division depuis toujours.
     *
     *  Une boutique qui vendrait un jour en euros aurait besoin du diviseur
     *  de sa devise, pas d'un 100 en dur. */
    price: price.amount ?? 0,
    comparePrice: price.scratch_amount ?? null,
    images: medias.map((m) => m.url ?? m.media?.url).filter(Boolean),
    description: raw.description ?? '',
    inStock: raw.available_stock === null || raw.available_stock > 0,
    stock: raw.available_stock ?? null,
    format: raw.sku ?? null,
    priceId: price.id ?? null,
    /* Le dictionnaire libre de SureCart, recopie tel quel.
       Taaru y range la categorie, la texture, l'ingredient principal, le
       moment d'application, le conseil d'usage, le badge, les suggestions
       et les TEINTES : ce sont des donnees de COSMETIQUE, que SureCart ne
       modelise pas et qui n'ont pas leur place dans le contrat de theme.
       Les pages lisent product.metadata.teintes, jamais un champ a plat,
       pour que la fixture et l'API aient exactement la meme forme.

       Les teintes ne sont PAS des variantes SureCart : le modele produit du
       projet n'en a pas. Voir la note en tete de la fixture. */
    metadata: raw.metadata ?? {},
  };
}

export async function listProducts() {
  if (SOURCE === 'surecart') {
    const { fetchProducts } = await import('./surecart-client.js');
    return (await fetchProducts()).map(normalizeFromSureCart);
  }
  return fixtureProducts;
}

export async function getProduct(slug) {
  if (SOURCE === 'surecart') {
    const { fetchProductBySlug } = await import('./surecart-client.js');
    const raw = await fetchProductBySlug(slug);
    return raw ? normalizeFromSureCart(raw) : null;
  }
  return fixtureProducts.find((p) => p.slug === slug) ?? null;
}

/** Le produit mis en avant : le premier marque featured, sinon le premier. */
export async function getFeaturedProduct() {
  const all = await listProducts();
  return all.find((p) => p.featured) ?? all[0] ?? null;
}
