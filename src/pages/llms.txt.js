/* La boutique resumee pour les assistants IA (convention llms.txt). */
import { listProducts } from '../lib/products.js';
import { getTheme } from '../lib/theme.js';
import { formatMoney } from '../lib/format.js';
import { llmsTxt, catalogueIndisponible } from '../lib/catalog-public.js';

export const prerender = false;

export async function GET({ site, url }) {
  const produits = await listProducts();
  if (produits.length === 0) return catalogueIndisponible();
  const corps = llmsTxt(produits, { theme: await getTheme(), site: site ?? url.origin, formatMoney });
  return new Response(corps, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
    },
  });
}
