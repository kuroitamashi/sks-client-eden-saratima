# Taaru, template soin et maquillage

Boutique de cosmétique : soin du visage, maquillage, corps et cheveux.
Née pour montrer un rendu à des clients, pas encore pour vendre.

`Taaru` désigne la parure, le fait de se faire beau, en wolof.

## Ce que c'est, en une phrase

Un site Astro statique, né de la duplication de `xam-xam`, qui vend un
catalogue de cosmétique avec des rayons, des teintes et une vraie page de
commande. Ambiance tirée de deux références : la photographie et le calme
d'Aesop, la grille et la typographie géométrique de Fenty Beauty.

## Lancer le projet

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # produit dist/
npm run preview  # sert dist/ pour vérifier le rendu réel
```

⚠️ Tous les templates SKS servent sur le port 4321 et partagent donc le même
`localStorage`. Un panier laissé par un autre template produit une pastille
qui compte un article que le tiroir n'affiche pas. Le nettoyage est en place
dans `CartDrawer.astro`, mais si tu vois un compte bizarre, c'est ça.

## Les quatre pages

| Adresse | Ce qu'elle fait |
|---|---|
| `/` | Bannière en trois volets, chiffres clés, rangées par rayon, rituel du moment, questions |
| `/produits/` | Le catalogue complet, avec filtre par rayon |
| `/produits/<slug>/` | La fiche d'un produit : galerie, nuancier de teintes, conseil d'usage, « Va bien avec » |
| `/commande/` | Le bon de commande : coordonnées, adresse, mode de paiement, récapitulatif |

## Où se change quoi

| Ce que tu veux changer | Le fichier |
|---|---|
| Couleurs, police, formes, nom de la boutique | `theme.config.js`, racine `theme` |
| Tous les textes du site | `theme.config.js`, racine `content` |
| Les produits, prix, textures, teintes, conseils | `src/data/fixtures/cosmetiques.js` |
| Les rayons et leurs noms | `theme.config.js`, `content.categories` |
| Les photos | `public/produits/`, une image par slug (voir plus bas) |
| Ce que le dashboard proposera au marchand | `template.manifest.json` |

Rien de visible n'est écrit en dur dans un composant. Si tu trouves une
couleur ou une phrase dans un `.astro`, c'est un bug.

## Trois choses à savoir avant de toucher au contenu

### 1. Il n'y a pas de photos, et ce n'est pas un oubli

Aucune source d'images gratuite ne tient pour de la cosmétique : LoremFlickr
renvoie des logos et des filigranes, Wikimedia donne des pièces de musée et
des savons d'archives. Il faut une clé d'API Unsplash, elle n'est pas encore
fournie.

En attendant, `ProductMedia.astro` dessine un aplat typographique à la place
de chaque photo. C'est un parti pris, pas une image cassée : le site est
montrable, mais pas encore vendeur.

**Le jour de la clé :** déposer 21 fichiers dans `public/produits/<slug>.jpg`,
puis remplacer chaque `images: []` de la fixture par
`images: ['/produits/<slug>.jpg']`. Rien d'autre ne bouge. La méthode de tri
est celle de Xam Xam : on télécharge, on monte une planche de contact
numérotée, on **regarde** chaque image, et on écarte à la main.

### 2. Les garde-fous éditoriaux ne sont pas négociables

Trois règles s'appliquent à chaque mot ajouté dans `theme.config.js` ou dans
la fixture :

1. **Aucun avant / après, aucune promesse de résultat.** On décrit ce qu'un
   produit est et comment il s'utilise, jamais ce qu'il fera d'une peau.
2. **Aucun vocabulaire éclaircissant.** Le mot renvoie au xessal, sujet de
   santé publique au Sénégal. Les textes parlent d'éclat, d'hydratation,
   d'uniformité du teint et de taches, et ce sont des **usages**.
3. **Aucune marque, aucun logo.**

Les produits du catalogue sont **inventés**, contrairement aux vingt livres
réels de Xam Xam. C'est à dire au client : il n'existe aucune base de
cosmétique libre de droits qui ne soit pas une base de marques.

### 3. Les teintes ne sont pas des variantes

Le modèle produit du projet n'a pas de variantes. Une teinte n'est donc pas
un prix différent : c'est une précision rangée dans `metadata.teintes`, qui
voyage avec la ligne de panier (`{ id, qty, teinte }`) et part dans la
commande.

Conséquences visibles :

- une carte de catalogue d'un produit à teintes n'a **pas** de bouton
  d'ajout, elle renvoie à la fiche ;
- sur la fiche, aucune teinte n'est présélectionnée et le bouton reste
  inactif tant qu'on n'a pas choisi. Une teinte choisie à la place de la
  cliente, c'est un colis qui revient ;
- deux teintes du même produit font deux lignes de panier distinctes.

## La page de commande, et le drapeau qui la gouverne

`theme.commerce.demoMode` sépare une démonstration d'une boutique.

| Valeur | Ce qui se passe au clic sur « Valider ma commande » |
|---|---|
| `true` (par défaut) | Écran de confirmation, panier vidé, **rien n'est envoyé**. Un bandeau le dit en haut de la page. |
| `false` | La commande part sur le WhatsApp de `identity.whatsapp` : produits, teintes, total, nom, téléphone, quartier, repère, mode de paiement. |

C'est ce qui permet de montrer le même template à dix marchands sans que
personne ne reçoive dix fausses commandes.

**Il n'y a aucun paiement en ligne**, dans les deux cas. PayDunya n'est pas
branché. « Wave ou Orange Money » est un mode **déclaré** : il part dans la
commande et le marchand confirme. `commerce.mobileMoneyNumber` affiche son
numéro sur la page quand il est renseigné.

## Ce qui diffère de Xam Xam

- **Une bannière éditoriale en trois volets** (`Hero.astro`), sans une seule
  image : chaque volet est un aplat pris dans les couleurs du thème. Xam Xam
  étalait trois couvertures du catalogue.
- **Des images carrées** sur les cartes, et non en 2/3 : un livre a un
  format, un flacon n'en a pas.
- **Un nuancier de teintes** sur la fiche (`[slug].astro`).
- **Une page de commande** (`commande.astro`), là où le tiroir de Xam Xam
  ouvrait WhatsApp directement.
- **Un bloc « Va bien avec »** (`VaBienAvec.astro`), choisi produit par
  produit dans `metadata.vaBienAvec` et non tiré du rayon.
- **`ProductMedia.astro`**, le seul endroit où une image de produit est
  dessinée, avec son repli typographique.
- **Un correctif d'apparition au défilement** dans `Default.astro` : la
  dernière section de la page ne franchissait jamais le seuil de
  l'observateur et restait invisible pour toujours. **À porter sur Xam Xam.**

## Ce qui reste vrai, comme pour Xam Xam

- **Pas de branding client.** Ce template se montre, il ne vend pas.
- **Le numéro WhatsApp est un placeholder** (`+221770000000`) et doit être
  remplacé avant toute mise en ligne, en même temps que `demoMode`.
- **`SITE_INDEXABLE=false`.** Ne le passer à `true` que le jour d'un vrai
  client, et jamais avec un catalogue de démonstration.
- **Les slugs restent en ASCII pur** alors que tous les textes visibles sont
  accentués : une adresse accentuée devient illisible dans WhatsApp.
- **Le contrat de thème est une copie par template**, à
  `shared/theme-contract.js`, parce qu'une boutique est un dépôt GitHub et
  que Cloudflare construit à partir de ce dépôt seul.

## Une dette écrite, avec son déclencheur

La paire typographique `geometrique` (Jost, la reprise libre de Futura)
**n'existe que dans la copie du contrat de Taaru**. Les copies de `xam-xam`
et de `beaute-01` ne la connaissent pas, et `specs/16-contrat-theme.md` non
plus.

**Déclencheur :** le jour où l'écran « Personnaliser » du dashboard sera
construit contre le contrat, cette paire doit remonter dans toutes les
copies et dans la spec. Sinon l'écran proposera six ambiances à un marchand
dont le site en utilise une septième.

La vraie Futura n'est pas libre : elle ne peut pas être servie par un
template destiné à être dupliqué chez des dizaines de marchands, chaque
domaine étant une licence de plus.

## Mise en ligne

Nommage, règle SKS : dossier `taaru`, dépôt `sks-theme-taaru`, projet
Cloudflare `sks-theme-taaru`, sous-domaine `taaru.demosenkheweul.com`.

Réglages Cloudflare Pages : preset Astro, `npm run build`, sortie `dist`,
racine vide, et la variable `NODE_VERSION = 20`.
