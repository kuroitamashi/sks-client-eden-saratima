/* Le flux produits, au format Google Merchant : l'adresse a coller dans
 *  Meta Commerce Manager (catalogue WhatsApp, Instagram, Facebook), et plus
 *  tard dans Perplexity ou Microsoft Merchant Center. Voir lib/catalog-public.js. */
import { listProducts } from '../../lib/products.js';
import { getTheme } from '../../lib/theme.js';
import { productFeedXml, catalogueIndisponible } from '../../lib/catalog-public.js';

export const prerender = false;

export async function GET({ site, url }) {
  const produits = await listProducts();
  if (produits.length === 0) return catalogueIndisponible();
  const corps = productFeedXml(produits, { theme: await getTheme(), site: site ?? url.origin });
  return new Response(corps, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
    },
  });
}
