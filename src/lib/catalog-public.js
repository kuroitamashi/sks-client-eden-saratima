/* Le catalogue tel que le lisent les machines : Google, Meta, les IA.
 *
 *  Trois sorties, une seule source (listProducts) :
 *   - productJsonLd : le bloc schema.org pose sur chaque fiche. C'est lui que
 *     Google et les assistants IA (ChatGPT, Perplexity, Gemini) lisent pour
 *     savoir qu'une page vend un produit, a quel prix, et s'il est en stock.
 *   - productFeedXml : le flux au format Google Merchant (RSS 2.0 + g:).
 *     Meta Commerce Manager le lit tel quel (catalogue WhatsApp, boutique
 *     Instagram et Facebook), Perplexity et Microsoft Merchant Center aussi.
 *   - llmsTxt : la boutique resumee en Markdown pour les IA (/llms.txt).
 *
 *  Aucune dependance a Astro : le fichier se teste avec node seul
 *  (catalog-public.check.mjs) et se recopie tel quel d'une vitrine a l'autre.
 */

const SCHEMA = 'https://schema.org/';

const absolute = (path, site) => new URL(path, site).href;
const productUrl = (p, site) => absolute(`/produits/${p.slug}/`, site);
const currencyOf = (theme) => theme.commerce?.currency ?? 'XOF';

/* Le texte brut d'une description : le dashboard y range du HTML avec ses
   entites (&amp;, &nbsp;). On retire les balises, y compris une balise
   coupee en fin de chaine, PUIS on decode : dans l'autre ordre, un
   « &lt;b&gt; » ecrit par la marchande deviendrait une balise effacee. */
const ENTITES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
const plain = (s) =>
  String(s ?? '')
    .replace(/<[^>]*(>|$)/g, ' ')
    .replace(/&(#\d+|#x[0-9a-f]+|[a-z]+);/gi, (m, e) => {
      if (e[0] !== '#') return ENTITES[e.toLowerCase()] ?? m;
      const n = e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : Number(e.slice(1));
      return Number.isFinite(n) ? String.fromCodePoint(n) : m;
    })
    .replace(/\s+/g, ' ')
    .trim();

/* Un produit qu'un catalogue refuserait : Meta et Google exigent une image
   et un prix. Mieux vaut l'absent que le rejet qui salit le diagnostic. */
const publiable = (p) => (p.images?.length ?? 0) > 0 && p.price > 0;

const xml = (s) =>
  String(s ?? '')
    // Caracteres de controle interdits en XML 1.0 : un seul casse tout le flux.
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

/** Le bloc JSON-LD d'une fiche, deja serialise et sur pour un <script>. */
export function productJsonLd(p, { theme, site }) {
  const url = productUrl(p, site);
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: plain(p.description) || p.subtitle || p.name,
    /* Pas de `sku` : selon la source, p.format est une reference ou une
       contenance (« 200 ml »), et Google lirait la contenance comme un code. */
    productID: p.id,
    url,
    image: p.images?.length ? p.images.map((src) => absolute(src, site)) : undefined,
    brand: { '@type': 'Brand', name: theme.identity.name },
    category: p.collections?.[0]?.name,
    offers: {
      '@type': 'Offer',
      url,
      price: p.price,
      priceCurrency: currencyOf(theme),
      availability: SCHEMA + (p.inStock ? 'InStock' : 'OutOfStock'),
      itemCondition: SCHEMA + 'NewCondition',
      seller: { '@type': 'Organization', name: theme.identity.name },
    },
  };
  /* `<` echappe : un nom de produit contenant "</script>" fermerait la
     balise et ouvrirait la page a une injection. */
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

/** Le flux produits au format Google Merchant. */
export function productFeedXml(products, { theme, site }) {
  const currency = currencyOf(theme);
  const items = products.filter(publiable).map((p) => {
    const images = (p.images ?? []).map((src) => absolute(src, site));
    /* Prix barre : g:price porte l'ancien prix, g:sale_price le prix paye.
       C'est la regle Google, reprise par Meta. */
    const promo = p.comparePrice && p.comparePrice > p.price;
    const tags = [
      ['g:id', p.id],
      ['g:title', p.name],
      ['g:description', plain(p.description) || p.subtitle || p.name],
      ['g:link', productUrl(p, site)],
      ['g:image_link', images[0]],
      ...images.slice(1, 11).map((src) => ['g:additional_image_link', src]),
      // Avec des espaces : la forme de Meta, que Google accepte aussi.
      ['g:availability', p.inStock ? 'in stock' : 'out of stock'],
      ['g:price', `${promo ? p.comparePrice : p.price} ${currency}`],
      ['g:sale_price', promo ? `${p.price} ${currency}` : null],
      ['g:condition', 'new'],
      ['g:brand', theme.identity.name],
      ['g:identifier_exists', 'no'],
      ['g:product_type', p.collections?.[0]?.name],
    ];
    const lines = tags
      .filter(([, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => `      <${k}>${xml(v)}</${k}>`);
    return `    <item>\n${lines.join('\n')}\n    </item>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${xml(theme.identity.name)}</title>
    <link>${xml(absolute('/', site))}</link>
    <description>${xml(theme.identity.tagline || theme.identity.name)}</description>
${items.join('\n')}
  </channel>
</rss>
`;
}

/** La boutique resumee pour les IA, au format llms.txt. */
export function llmsTxt(products, { theme, site, formatMoney }) {
  const { name, tagline, whatsapp, instagram } = theme.identity;
  const contact = [
    whatsapp && `WhatsApp ${whatsapp}`,
    instagram && `Instagram @${instagram}`,
  ].filter(Boolean);

  const lines = [
    `# ${name}`,
    '',
    tagline ? `> ${tagline}\n` : null,
    `Boutique en ligne au Sénégal. Prix en ${currencyOf(theme)}. On commande sur le site${whatsapp ? ' ou par WhatsApp' : ''}.`,
    contact.length ? `Contact : ${contact.join(', ')}.` : null,
    '',
    '## Produits',
    '',
    ...products.map((p) => {
      const dispo = p.inStock ? 'en stock' : 'en rupture';
      /* Depuis la description et non le sous-titre : chez le moteur SKS, le
         sous-titre est la description HTML coupee a 90 caracteres. */
      const resume = plain(p.description || p.subtitle).slice(0, 160);
      return `- [${p.name}](${productUrl(p, site)}) : ${formatMoney(p.price, theme.commerce)}, ${dispo}.${resume ? ` ${resume}` : ''}`;
    }),
    '',
    '## Pour les machines',
    '',
    `- [Flux produits (format Google Merchant)](${absolute('/feeds/products.xml', site)})`,
    `- [Plan du site](${absolute('/sitemap.xml', site)})`,
    '',
  ];
  return lines.filter((l) => l !== null).join('\n');
}

/** Le plan du site : l'accueil, le catalogue, chaque fiche. */
export function sitemapXml(products, { site }) {
  const urls = [absolute('/', site), absolute('/produits/', site), ...products.map((p) => productUrl(p, site))];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${xml(u)}</loc></url>`).join('\n')}
</urlset>
`;
}

/* Catalogue vide = panne du moteur ou de SureCart (listProducts rend [] sur
 * Cloudflare au lieu de planter). Un flux vide servi 200 ferait VIDER le
 * catalogue Meta de la marchande au passage suivant du robot. Un 503 lui dit
 * de revenir plus tard, et il garde la version precedente. */
export const catalogueIndisponible = () =>
  new Response('Catalogue momentanement indisponible', {
    status: 503,
    headers: { 'Retry-After': '600', 'Cache-Control': 'no-store' },
  });
