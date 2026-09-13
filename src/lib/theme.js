/* Le robinet.
 *
 *  Aucune page, aucun composant ne lit theme.config.js directement. Tout
 *  passe par ici. Le jour ou le dashboard exposera une route publique
 *  (GET /api/public/boutiques/[slug]/theme), seule la fonction load() de ce
 *  fichier change : le reste du template n'en saura rien.
 *
 *  C'est pour cela que les fonctions sont asynchrones alors qu'elles n'ont
 *  rien a attendre aujourd'hui : un fetch() est asynchrone, et on ne veut
 *  pas avoir a rouvrir trente fichiers ce jour-la.
 */

import config from '../../theme.config.js';
import { resolveTheme, themeToCss, fontHref } from '@contract';

/**
 * Fusionne la configuration locale par défaut avec les données distantes de l'API SKS.
 * Garantit qu'aucun token ou structure obligatoire ne manque.
 */
function mergeThemeAndContent(defaultConfig, apiData) {
  if (!apiData || !apiData.ok) return defaultConfig;

  const { boutique, theme: apiTheme } = apiData;

  const mergedTheme = {
    ...defaultConfig.theme,
    identity: {
      ...defaultConfig.theme.identity,
      name: boutique?.nom || defaultConfig.theme.identity.name,
      tagline: boutique?.description || defaultConfig.theme.identity.tagline,
      logoText: boutique?.nom ? boutique.nom.toUpperCase() : defaultConfig.theme.identity.logoText,
      logoImage: boutique?.logoUrl || defaultConfig.theme.identity.logoImage,
      whatsapp: boutique?.whatsappNumero || defaultConfig.theme.identity.whatsapp,
    },
    colors: {
      ...defaultConfig.theme.colors,
      ...(apiTheme?.palette || {}),
    },
    typography: {
      ...defaultConfig.theme.typography,
      pair: apiTheme?.typography?.pair || defaultConfig.theme.typography.pair,
    },
    shape: {
      preset: apiTheme?.shape || defaultConfig.theme.shape?.preset || 'net',
    },
    commerce: {
      ...defaultConfig.theme.commerce,
      sksApiUrl: defaultConfig.theme.commerce?.sksApiUrl || import.meta.env.PUBLIC_SKS_API_URL,
      slug: boutique?.slug || defaultConfig.theme.commerce?.slug || import.meta.env.PUBLIC_SKS_BOUTIQUE_SLUG,
    },
  };

  const customContent = apiTheme?.content || {};
  const mergedContent = {
    ...defaultConfig.content,
    ...customContent,
    announcement: {
      ...defaultConfig.content.announcement,
      ...(customContent.announcement || {}),
    },
    hero: {
      ...defaultConfig.content.hero,
      ...(customContent.hero || {}),
    },
  };

  return { theme: mergedTheme, content: mergedContent };
}

let cachedConfig = null;

/**
 * Charge la configuration de thème.
 * Si une URL SKS ou un slug boutique est fourni dans l'environnement ou dans theme.config.js,
 * charge la configuration en direct depuis l'API SKS (palette personnalisée, nom, WhatsApp).
 * En cas d'indisponibilité, retombe sur la configuration locale.
 */
async function load() {
  if (cachedConfig) return cachedConfig;

  const directUrl = import.meta.env.SKS_THEME_URL;
  const apiUrl =
    import.meta.env.PUBLIC_SKS_API_URL ||
    import.meta.env.SKS_API_URL ||
    config.theme?.commerce?.sksApiUrl;
  const slug =
    import.meta.env.PUBLIC_SKS_BOUTIQUE_SLUG ||
    import.meta.env.SKS_BOUTIQUE_SLUG ||
    config.theme?.commerce?.slug;

  const targetUrl =
    directUrl ||
    (apiUrl && slug ? `${apiUrl.replace(/\/$/, '')}/api/public/boutiques/${slug}/theme` : null);

  if (targetUrl) {
    try {
      const res = await fetch(targetUrl, { headers: { Accept: 'application/json' } });
      if (res.ok) {
        const data = await res.json();
        cachedConfig = mergeThemeAndContent(config, data);
        return cachedConfig;
      }
      console.warn(
        `[sks-theme] Impossible de charger le thème depuis ${targetUrl} (statut ${res.status}). Repli sur la configuration locale.`,
      );
    } catch (err) {
      console.warn(
        `[sks-theme] Connexion impossible vers ${targetUrl}. Repli sur la configuration locale.`,
      );
    }
  }

  cachedConfig = config;
  return cachedConfig;
}

/** L'apparence, complete : ce que le fichier definit, pose sur les defauts
 *  du contrat. Aucun token ne peut donc manquer. */
export async function getTheme() {
  const { theme } = await load();
  return resolveTheme(theme);
}

/** Les mots et les images du site. */
export async function getContent() {
  const { content } = await load();
  return content;
}

/** Le bloc de variables CSS a poser sur :root, produit par le contrat. */
export async function getThemeCss() {
  const { theme } = await load();
  return themeToCss(theme);
}

/** L'URL de la paire typographique choisie. */
export async function getFontHref() {
  const { theme } = await load();
  return fontHref(theme);
}

