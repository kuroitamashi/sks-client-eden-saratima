/* Le contrat de theme de Sen Kheweul Store.
 *
 *  Ce fichier est LA reference. Tout template SKS, present ou futur, decrit
 *  son apparence avec ces cles-la et pas d'autres. C'est ce qui permet
 *  qu'un seul ecran « Personnaliser » du dashboard serve les 50 templates :
 *  l'ecran est ecrit une fois contre ce contrat, jamais contre un template.
 *
 *  Regle : on n'ajoute pas une cle ici pour le besoin d'un seul template.
 *  Ce qui est propre a un template va dans son template.manifest.json.
 *
 *  Documentation lisible : specs/16-contrat-theme.md a la racine du projet.
 */

/* --------------------------------------------------------------------------
 *  1. Couleurs : six roles, pas un de plus.
 *
 *  Six suffit pour qu'une boutique ait sa personnalite, et c'est assez peu
 *  pour qu'un commercant qui n'est pas designer ne puisse pas rendre son
 *  site illisible. Tout le reste (survols, bordures, texte attenue, couleur
 *  du texte pose sur un bouton) est CALCULE a partir de ces six.
 * ------------------------------------------------------------------------ */
export const COLOR_ROLES = ['primary', 'secondary', 'bg', 'surface', 'text', 'accent'];

/* --------------------------------------------------------------------------
 *  2. Typographie : le marchand choisit une ambiance, pas une police.
 *
 *  Protege le design (personne ne choisit Comic Sans) et la performance :
 *  la liste est finie, donc les polices sont connues d'avance et pourront
 *  etre hebergees en local le jour ou on fera le menage des Google Fonts.
 * ------------------------------------------------------------------------ */
export const TYPE_PAIRS = {
  'premium-epure': {
    label: 'Premium epure',
    display: "'Cormorant Garamond', Georgia, serif",
    body: "'Inter', system-ui, -apple-system, sans-serif",
    google: 'Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@300;400;500;600',
    displayWeight: 400,
  },
  'clinique': {
    label: 'Clinique',
    display: "'Inter', system-ui, -apple-system, sans-serif",
    body: "'Inter', system-ui, -apple-system, sans-serif",
    google: 'Inter:wght@300;400;500;600;700',
    displayWeight: 600,
  },
  'editorial': {
    label: 'Editorial',
    display: "'Playfair Display', Georgia, serif",
    body: "'Source Sans 3', system-ui, sans-serif",
    google: 'Playfair+Display:wght@400;500;600&family=Source+Sans+3:wght@300;400;500;600',
    displayWeight: 500,
  },
  'moderne-doux': {
    label: 'Moderne doux',
    display: "'DM Serif Display', Georgia, serif",
    body: "'DM Sans', system-ui, sans-serif",
    google: 'DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;700',
    displayWeight: 400,
  },
  'impact': {
    label: 'Impact',
    display: "'Archivo', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
    google: 'Archivo:wght@500;600;700;800&family=Inter:wght@300;400;500;600',
    displayWeight: 700,
  },
  /* AJOUT PROPRE A TAARU, ET C'EST UNE DETTE ASSUMEE.
   *
   *  Jost est la reprise libre de Futura (Google Fonts, variable). Elle a ete
   *  demandee pour Taaru, ou la typographie porte l'essentiel du caractere :
   *  titres geometriques en capitales, facon Fenty Beauty.
   *
   *  POURQUOI C'EST UNE DETTE : le contrat dit, en tete de fichier, qu'on
   *  n'ajoute pas une cle ici pour le besoin d'un seul template. Cette paire
   *  n'existe QUE dans la copie de Taaru. Les copies de xam-xam et de
   *  beaute-01 ne la connaissent pas, et specs/16-contrat-theme.md non plus.
   *
   *  DECLENCHEUR DE REMISE EN ORDRE, ecrit pour ne pas etre oublie : le jour
   *  ou l'ecran << Personnaliser >> du dashboard sera construit contre le
   *  contrat, cette paire doit remonter dans TOUTES les copies et dans
   *  specs/16-contrat-theme.md. Sinon l'ecran proposera six ambiances a un
   *  marchand dont le site en utilise une septieme, et changer de police
   *  cassera l'identite de sa boutique sans qu'il comprenne pourquoi.
   *
   *  Note licence : la vraie Futura n'est pas libre. Elle ne peut pas etre
   *  servie par un template destine a etre duplique chez des dizaines de
   *  marchands, chaque domaine etant une licence de plus. Jost est libre. */
  'geometrique': {
    label: 'Geometrique',
    display: "'Jost', 'Century Gothic', system-ui, sans-serif",
    body: "'Inter', system-ui, -apple-system, sans-serif",
    google: 'Jost:wght@300;400;500;600&family=Inter:wght@300;400;500;600',
    displayWeight: 500,
  },
  'naturel': {
    label: 'Naturel',
    display: "'Fraunces', Georgia, serif",
    body: "'Nunito Sans', system-ui, sans-serif",
    google: 'Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Nunito+Sans:wght@300;400;600;700',
    displayWeight: 500,
  },
};

/* --------------------------------------------------------------------------
 *  3. Formes : trois partis pris d'angles, pas un curseur en pixels.
 *
 *  Meme raison que la typographie. « Rond » respecte la regle SKS du bouton
 *  en pilule ; « net » sert les marques tres graphiques.
 * ------------------------------------------------------------------------ */
export const SHAPES = {
  rond: { label: 'Rond', button: '9999px', card: '20px', image: '20px', input: '9999px' },
  doux: { label: 'Doux', button: '10px', card: '12px', image: '12px', input: '10px' },
  net:  { label: 'Net',  button: '0px', card: '0px', image: '0px', input: '0px' },
};

/* --------------------------------------------------------------------------
 *  4. Densite : l'air entre les sections.
 * ------------------------------------------------------------------------ */
export const DENSITIES = {
  aeree:    { label: 'Aeree', scale: 1.25 },
  normale:  { label: 'Normale', scale: 1 },
  compacte: { label: 'Compacte', scale: 0.8 },
};

/* --------------------------------------------------------------------------
 *  5. Les valeurs par defaut du contrat.
 *
 *  Un theme de template ne redefinit que ce qui change ; tout ce qu'il omet
 *  retombe ici. C'est ce qui garantit qu'aucun token ne peut manquer, meme
 *  si un marchand vide un champ dans le dashboard.
 * ------------------------------------------------------------------------ */
export const DEFAULT_THEME = {
  identity: {
    name: 'Ma boutique',
    tagline: '',
    logoText: null,   // null : on retombe sur identity.name
    logoImage: null,  // chemin ou URL ; prioritaire sur logoText
    favicon: '/favicon.svg',
    ogImage: null,      // vignette 1200x630 des liens partages
    whatsapp: null,
    email: null,
    instagram: null,
  },
  colors: {
    primary: '#1A1816',
    secondary: '#8B8580',
    bg: '#FFFFFF',
    surface: '#F6F4F1',
    text: '#1A1816',
    accent: '#C7846A',
  },
  typography: { pair: 'premium-epure' },
  shape: { preset: 'rond' },
  layout: { contentWidth: '1280px', density: 'normale' },
  commerce: {
    currency: 'XOF',
    locale: 'fr-SN',
    // Ou part le bouton Commander. null : le template retombe sur WhatsApp.
    checkoutUrl: null,
  },
};

/* --------------------------------------------------------------------------
 *  6. Fabrication des variables CSS.
 *
 *  Un seul endroit produit les tokens, donc un seul endroit a corriger.
 *  La sortie est posee sur :root par le layout, et rien d'autre dans le
 *  template ne connait une valeur en dur.
 * ------------------------------------------------------------------------ */

/** Fusion d'un theme partiel sur les valeurs par defaut. */
export function resolveTheme(partial = {}) {
  const out = {};
  for (const key of Object.keys(DEFAULT_THEME)) {
    out[key] = { ...DEFAULT_THEME[key], ...(partial[key] ?? {}) };
  }
  return out;
}

/** Luminance relative d'une couleur hexadecimale (WCAG). */
function luminance(hex) {
  const raw = String(hex).replace('#', '');
  const full = raw.length === 3 ? raw.split('').map((ch) => ch + ch).join('') : raw;
  const parts = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255);
  const lin = (v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  return 0.2126 * lin(parts[0]) + 0.7152 * lin(parts[1]) + 0.0722 * lin(parts[2]);
}

/* Le texte pose SUR une couleur ne peut pas etre un 7e reglage : le marchand
   choisirait du blanc sur du beige. On le deduit de la luminance du fond.
   0.179 est le point ou le blanc et le noir donnent le meme contraste WCAG :
   en dessous le blanc gagne, au-dessus le noir. Un seuil choisi a vue (0.5,
   par exemple) met du blanc sur un terracotta clair, a 3:1, sous la norme. */
function readableOn(hex) {
  return luminance(hex) > 0.179 ? '#111111' : '#FFFFFF';
}

/** Le bloc de variables CSS a poser sur :root. */
export function themeToCss(theme) {
  const t = resolveTheme(theme);
  const type = TYPE_PAIRS[t.typography.pair] ?? TYPE_PAIRS['premium-epure'];
  const shape = SHAPES[t.shape.preset] ?? SHAPES.rond;
  const density = DENSITIES[t.layout.density] ?? DENSITIES.normale;
  const c = t.colors;
  const rem = (n) => (n * density.scale).toFixed(3) + 'rem';

  return [
    '/* Couleurs : les six roles du contrat */',
    '--color-primary: ' + c.primary + ';',
    '--color-secondary: ' + c.secondary + ';',
    '--color-bg: ' + c.bg + ';',
    '--color-surface: ' + c.surface + ';',
    '--color-text: ' + c.text + ';',
    '--color-accent: ' + c.accent + ';',
    '/* Couleurs derivees : calculees, jamais reglees */',
    '--color-on-primary: ' + readableOn(c.primary) + ';',
    '--color-on-accent: ' + readableOn(c.accent) + ';',
    '--color-text-muted: color-mix(in oklab, var(--color-text) 58%, var(--color-bg));',
    '--color-border: color-mix(in oklab, var(--color-text) 14%, var(--color-bg));',
    '--color-border-strong: color-mix(in oklab, var(--color-text) 30%, var(--color-bg));',
    '--color-primary-hover: color-mix(in oklab, var(--color-primary) 82%, var(--color-accent));',
    '--color-accent-soft: color-mix(in oklab, var(--color-accent) 14%, var(--color-bg));',
    '--color-surface-strong: color-mix(in oklab, var(--color-surface) 70%, var(--color-text));',
    '/* Typographie */',
    '--font-display: ' + type.display + ';',
    '--font-body: ' + type.body + ';',
    '--font-display-weight: ' + type.displayWeight + ';',
    '/* Formes */',
    '--radius-button: ' + shape.button + ';',
    '--radius-card: ' + shape.card + ';',
    '--radius-image: ' + shape.image + ';',
    '--radius-input: ' + shape.input + ';',
    '/* Mise en page */',
    '--content-width: ' + t.layout.contentWidth + ';',
    '--section-space-s: ' + rem(2.5) + ';',
    '--section-space-m: ' + rem(4) + ';',
    '--section-space-l: ' + rem(6) + ';',
    '--section-space-xl: ' + rem(8) + ';',
  ].join('\n  ');
}

/** L'URL Google Fonts de la paire choisie, ou null. */
export function fontHref(theme) {
  const t = resolveTheme(theme);
  const pair = TYPE_PAIRS[t.typography.pair];
  return pair ? 'https://fonts.googleapis.com/css2?family=' + pair.google + '&display=swap' : null;
}
