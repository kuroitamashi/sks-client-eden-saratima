import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';

/* Le fichier de configuration s'execute AVANT que Vite charge le .env : un
 * process.env.PUBLIC_BASE_URL y est donc toujours vide, et `site` retombait
 * silencieusement sur localhost. Consequence invisible en local et visible
 * seulement une fois en ligne : les balises Open Graph pointaient vers
 * http://localhost:4321, donc aucune vignette quand on partage le lien.
 *
 * loadEnv est fourni par Vite, deja installe avec Astro : pas de dependance
 * supplementaire, contrairement au dotenv-cli du template electronique. */
const env = loadEnv(process.env.NODE_ENV ?? '', process.cwd(), '');

/* fileURLToPath et non .pathname : sous Windows, `.pathname` rend
 * "/C:/Users/..." avec une barre de tete, que Vite recolle ensuite en
 * "C:/C:/Users/...". Le chemin ne designe alors plus rien.
 *
 * Ce n'est pas theorique : c'est ce qui a mis tout le projet hors de la liste
 * blanche du serveur de developpement, y compris src/styles/global.css. La
 * page s'affichait donc SANS AUCUN STYLE en local, pendant que `astro build`
 * continuait de passer sans rien signaler. */
const contractPath = fileURLToPath(new URL('./shared/theme-contract.js', import.meta.url));

// Le contrat de theme vit hors du template, dans templates/shared/, parce
// qu'il est partage par tous les templates SKS. En attendant qu'un 2e template
// l'adopte, il vit dans ce depot : une seule copie existe, donc aucune
// derive possible. Voir le declencheur d'extraction dans TODO.md.
export default defineConfig({
  /* L'adresse du site, par ordre de priorite :
   *
   *   1. PUBLIC_BASE_URL, quand le domaine definitif est connu et branche.
   *   2. CF_PAGES_URL, que Cloudflare Pages renseigne tout seul a chaque
   *      build avec l'adresse reelle du deploiement. Tant qu'on travaille
   *      sur l'adresse provisoire en .pages.dev, c'est elle qui gagne, et
   *      elle est toujours juste sans qu'on ait rien a deviner.
   *   3. localhost, en developpement.
   *
   * Consequence concrete : le jour du basculement vers le domaine definitif,
   * il suffit de renseigner PUBLIC_BASE_URL. Rien d'autre ne bouge. */
  site: env.PUBLIC_BASE_URL || env.CF_PAGES_URL || 'http://localhost:4321',
  output: 'static',
  vite: {
    resolve: {
      alias: {
        '@contract': contractPath,
      },
    },
    /* Il n'y a plus de `server.fs.allow` ici, et c'est voulu.
     *
     * Il servait quand le contrat vivait dans un dossier frere, hors du
     * projet. Depuis que shared/ est DANS le depot, la liste blanche par
     * defaut de Vite, qui est la racine du projet, couvre deja tout. En
     * redefinir une ne faisait que REMPLACER la bonne par une plus etroite. */
  },
});
