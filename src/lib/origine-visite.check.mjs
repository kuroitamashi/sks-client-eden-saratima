import assert from 'node:assert/strict';
import { origineAGarder } from './origine-visite.js';

const HOTE = 'boutique.example.com';
const JOUR = 86400000;
const now = 1_000_000_000_000;
const garder = (url, ref, ex) => origineAGarder(url, ref, HOTE, ex, now);
const old = (j) => ({ source: 'instagram', at: now - j * JOUR });

// etiquette explicite
assert.deepEqual(garder('https://boutique.example.com/?utm_source=chatgpt.com', '', null), { source: 'chatgpt.com', at: now });
assert.deepEqual(garder('https://boutique.example.com/?source=instagram&utm_source=x', '', null), { source: 'instagram', at: now });
// referrer externe
assert.deepEqual(garder('https://boutique.example.com/', 'https://www.google.com/search?q=a', null), { referrer: 'https://www.google.com/search?q=a', at: now });
// l'etiquette passe avant le referrer
assert.deepEqual(garder('https://boutique.example.com/?source=tiktok', 'https://www.google.com/', null), { source: 'tiktok', at: now });
// referrer interne ou caisse : l'existante est gardee
assert.deepEqual(garder('https://boutique.example.com/p', 'https://boutique.example.com/', old(3)), old(3));
assert.deepEqual(garder('https://boutique.example.com/', 'https://checkout.senkheweulstore.com/x/y', old(3)), old(3));
// rien de neuf, existante recente
assert.deepEqual(garder('https://boutique.example.com/', '', old(29)), old(29));
// rien de neuf, existante trop vieille ou absente
assert.equal(garder('https://boutique.example.com/', '', old(31)), null);
assert.equal(garder('https://boutique.example.com/', 'https://boutique.example.com/', old(31)), null);
assert.equal(garder('https://boutique.example.com/', '', null), null);
// nouvelle origine externe remplace l'existante
assert.deepEqual(garder('https://boutique.example.com/?utm_source=tiktok', '', old(3)), { source: 'tiktok', at: now });
// valeurs illisibles
assert.equal(garder('pas une url', 'pas une url', null), null);
assert.deepEqual(garder('https://boutique.example.com/?source=', '', old(3)), old(3));
// meme boutique avec ou sans www, ou en majuscules : existante gardee
const ig = old(3);
assert.deepEqual(origineAGarder('https://shop.com/', 'https://www.shop.com/a', 'shop.com', ig, now), ig);
assert.deepEqual(origineAGarder('https://www.shop.com/', 'https://shop.com/a', 'www.shop.com', ig, now), ig);
assert.deepEqual(origineAGarder('https://shop.com/', 'https://SHOP.com/a', 'Shop.COM', ig, now), ig);
assert.deepEqual(garder('https://boutique.example.com/', 'https://WWW.Checkout.SenKheweulStore.com/x', ig), ig);
// wwwfoo.com n'est pas foo.com : le referrer reste externe et remplace l'existante
assert.deepEqual(origineAGarder('https://foo.com/', 'https://wwwfoo.com/a', 'foo.com', ig, now), { referrer: 'https://wwwfoo.com/a', at: now });
// 30 jours pile : perimee ; 30 jours moins 1 ms : gardee
assert.equal(garder('https://boutique.example.com/', '', { source: 'instagram', at: now - 30 * JOUR }), null);
assert.deepEqual(garder('https://boutique.example.com/', '', { source: 'instagram', at: now - 30 * JOUR + 1 }), { source: 'instagram', at: now - 30 * JOUR + 1 });
// existante sans date : null
assert.equal(garder('https://boutique.example.com/', '', { source: 'instagram' }), null);
console.log('origine-visite : OK');
