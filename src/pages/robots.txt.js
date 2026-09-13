/* robots.txt, genere au build.
 *
 *  Par defaut le site est FERME aux moteurs de recherche. C'est le bon
 *  reglage pour une demo : un prototype indexe sous le nom d'une marque qui
 *  n'est pas encore choisie, avec des photos d'attente et des prix a
 *  confirmer, reste dans Google des mois. Il concurrence ensuite la vraie
 *  boutique sur son propre nom.
 *
 *  Pour ouvrir le site le jour de la mise en ligne reelle :
 *      SITE_INDEXABLE=true
 *  dans le fichier .env, ou dans les variables du projet Cloudflare Pages.
 */

const indexable = import.meta.env.SITE_INDEXABLE === 'true';

export function GET({ site }) {
  const corps = indexable
    ? `User-agent: *\nAllow: /\n${site ? `Sitemap: ${new URL('sitemap.xml', site)}\n` : ''}`
    : 'User-agent: *\nDisallow: /\n';

  return new Response(corps, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
