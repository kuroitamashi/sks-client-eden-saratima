/* Le plan du site, que robots.txt annonce. Rendu a la demande : un produit
 *  ajoute dans le dashboard y entre sans rebuild. */
import { listProducts } from '../lib/products.js';
import { sitemapXml, catalogueIndisponible } from '../lib/catalog-public.js';

export const prerender = false;

export async function GET({ site, url }) {
  const produits = await listProducts();
  if (produits.length === 0) return catalogueIndisponible();
  return new Response(sitemapXml(produits, { site: site ?? url.origin }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
    },
  });
}
