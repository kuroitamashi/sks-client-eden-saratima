// node src/lib/catalog-public.check.mjs : verifie les trois sorties machine.
import assert from 'node:assert/strict';
import { productJsonLd, productFeedXml, llmsTxt, sitemapXml, catalogueIndisponible } from './catalog-public.js';
import { formatMoney } from './format.js';

const theme = { identity: { name: 'Fatima & Co', tagline: 'Huiles', whatsapp: '+221 78 000 00 00' }, commerce: { currency: 'XOF', locale: 'fr-SN' } };
const site = 'https://boutique.test';
const p = {
  id: 'v1', slug: 'huile-oud', name: 'Huile </script> oud', subtitle: 'Douce', description: '<p>Huile <b>pure</b></p>',
  price: 15000, comparePrice: 18000, images: ['/produits/a.jpg', 'https://cdn.test/b.jpg'], inStock: true, format: null,
  collections: [{ name: 'Parfums' }],
};
const rupture = { ...p, id: 'v2', slug: 'chantilly', name: 'Chantilly', comparePrice: null, inStock: false, images: ['/produits/c.jpg'] };

const ld = productJsonLd(p, { theme, site });
assert.ok(!ld.includes('</script>'), 'JSON-LD ne doit jamais fermer la balise script');
const data = JSON.parse(ld);
assert.equal(data.offers.price, 15000);
assert.equal(data.offers.priceCurrency, 'XOF');
assert.equal(data.offers.availability, 'https://schema.org/InStock');
assert.equal(data.url, 'https://boutique.test/produits/huile-oud/');
assert.deepEqual(data.image, ['https://boutique.test/produits/a.jpg', 'https://cdn.test/b.jpg']);
assert.equal(data.description, 'Huile pure');
assert.equal(JSON.parse(productJsonLd(rupture, { theme, site })).offers.availability, 'https://schema.org/OutOfStock');

const feed = productFeedXml([p, rupture], { theme, site });
assert.match(feed, /<g:price>18000 XOF<\/g:price>/, 'prix barre dans g:price');
assert.match(feed, /<g:sale_price>15000 XOF<\/g:sale_price>/);
assert.match(feed, /<g:price>15000 XOF<\/g:price>/, 'sans promo, g:price est le prix paye');
assert.match(feed, /<g:availability>out of stock<\/g:availability>/);
assert.match(feed, /<title>Fatima &amp; Co<\/title>/);
assert.match(feed, /Huile &lt;\/script&gt; oud/);
assert.equal((feed.match(/<g:sale_price>/g) ?? []).length, 1);
assert.ok(!/<g:image_link><\/g:image_link>/.test(feed), 'pas de balise vide sans image');

const llms = llmsTxt([p, rupture], { theme, site, formatMoney });
assert.match(llms, /^# Fatima & Co/);
assert.match(llms, /\[Chantilly\]\(https:\/\/boutique\.test\/produits\/chantilly\/\) : .*en rupture/);

const sm = sitemapXml([p], { site });
assert.match(sm, /<loc>https:\/\/boutique\.test\/produits\/huile-oud\/<\/loc>/);

console.log('catalog-public : OK');

// Retours de la relecture du 2026-11-04.
const sks = { ...p, id: 'v3', slug: 'savon', name: 'Savon\u0002', comparePrice: null,
  description: '<p>Huile&nbsp;douce &amp; pure &#233;t&#xE9; <strong>bio</strong></p>', subtitle: '<p>Huile&nbsp;douce &amp; pure <stro' };
const sansImage = { ...rupture, id: 'v4', inStock: true, images: [] };
const gratuit = { ...p, id: 'v5', price: 0, comparePrice: null };
const feed2 = productFeedXml([sks, sansImage, gratuit], { theme, site });
assert.match(feed2, /<g:description>Huile douce &amp; pure été bio<\/g:description>/, 'entites decodees une fois, re-echappees une fois');
assert.ok(!feed2.includes('\u0002'), 'caracteres de controle retires');
assert.ok(!feed2.includes('<g:id>v4</g:id>'), 'sans image : hors du flux');
assert.ok(!feed2.includes('<g:id>v5</g:id>'), 'prix nul : hors du flux');
assert.equal(JSON.parse(productJsonLd(sks, { theme, site })).description, 'Huile douce & pure été bio');
assert.equal(JSON.parse(productJsonLd(sansImage, { theme, site })).image, undefined, 'pas de image: [] vide');
const llms2 = llmsTxt([sks], { theme: { ...theme, identity: { name: 'X' } }, site, formatMoney });
assert.ok(!llms2.includes('undefined') && !llms2.includes('<stro'), 'ni tagline vide ni balise coupee');
assert.equal((await catalogueIndisponible()).status, 503);
console.log('catalog-public (relecture) : OK');
