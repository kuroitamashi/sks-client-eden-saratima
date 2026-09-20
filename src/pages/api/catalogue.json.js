/* Le catalogue tel qu'il est MAINTENANT, pour le tiroir de panier.
 *
 *  La page d'accueil est figee au build : le catalogue qu'elle embarque
 *  ignore les produits ajoutes depuis. Quand le tiroir y trouve une ligne
 *  qu'il ne connait pas, il vient ici plutot que de la supprimer.
 *
 *  Ce point d'acces tourne sur le serveur : la cle SureCart ne quitte pas
 *  Cloudflare, le navigateur ne recoit que nom, prix et image. */
import { listProducts, versPanier } from '../../lib/products.js';

export const prerender = false;

export async function GET() {
  const produits = await listProducts();
  return new Response(JSON.stringify(produits.map(versPanier)), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
}
