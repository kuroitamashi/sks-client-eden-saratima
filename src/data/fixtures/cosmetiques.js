/* Catalogue de démonstration de Taaru, en attendant le branchement SureCart.
 *
 *  Les objets ont exactement la forme que normalize() produit à partir de
 *  l'API SureCart : c'est ce qui permet de développer en fixture et de
 *  basculer en réel sans toucher à une seule page.
 *
 *  ---------------------------------------------------------------------
 *  CES PRODUITS SONT INVENTÉS, ET C'EST À DIRE AU CLIENT.
 *
 *  Contrairement à Xam Xam, dont les vingt livres sont de vrais titres
 *  d'Open Library, il n'existe aucune base de cosmétique libre de droits
 *  qui ne soit pas une base de MARQUES. Nommer un vrai produit reviendrait
 *  à afficher une marque sur la vitrine d'un marchand qui ne la vend pas.
 *
 *  Tout est donc écrit ici : les noms, les prix, les textures, les conseils
 *  d'usage. Rien ne prétend venir d'un fabricant.
 *
 *  TROIS GARDE-FOUS APPLIQUÉS À CHAQUE LIGNE DE CE FICHIER :
 *
 *   1. Aucun avant / après, aucune promesse de résultat. On écrit ce qu'un
 *      produit EST et comment il s'utilise, jamais ce qu'il fera d'une peau.
 *      « Sérum à la vitamine C, à appliquer le matin » et non « efface les
 *      taches en trois semaines ».
 *   2. Aucun vocabulaire éclaircissant. Le mot renvoie au xessal, sujet de
 *      santé publique au Sénégal. Les champs parlent d'éclat, d'hydratation,
 *      d'uniformité du teint et de taches, et ce sont des USAGES.
 *   3. Aucune marque, aucun logo.
 *  ---------------------------------------------------------------------
 *
 *  LES IMAGES SONT DESSINÉES, PAS PHOTOGRAPHIÉES, ET CE N'EST PAS UN OUBLI.
 *
 *  Aucune source d'images gratuite ne tient pour de la cosmétique. Trois ont
 *  été essayées, la dernière étant Openverse en licence CC0 : sur 101
 *  candidates téléchargées et regardées une par une, « beurre de karité »
 *  rend des flacons Dove et Palmolive avec leur code-barres, « mascara » des
 *  archives brésiliennes de 1920, « masque à l'argile » des masques de
 *  théâtre en terre cuite. Moins de cinq images étaient utilisables.
 *
 *  Une version dessinait les contenants en vectoriel à la place. Écartée le
 *  2026-09-04 : ce template se montre à de vrais commerçants, et un
 *  commerçant qui voit un dessin croit que sa boutique ressemblera à un
 *  dessin.
 *
 *  Donc `images` reste un tableau VIDE et la vignette reste vide aussi.
 *
 *  LE JOUR DE LA CLÉ UNSPLASH : déposer 21 fichiers dans
 *  public/produits/<slug>.jpg, puis remplacer chaque `images: []` par
 *  `images: ['/produits/<slug>.jpg']`. Le dessin s'efface tout seul, rien
 *  d'autre ne bouge. La méthode de tri est celle de Xam Xam : on télécharge,
 *  on monte une planche de contact numérotée, on REGARDE chaque image, et on
 *  écarte à la main.
 *
 *  ---------------------------------------------------------------------
 *  LES CHAMPS PROPRES À TAARU, tous dans `metadata` :
 *
 *   - categorie   : le SLUG du rayon. Son libellé affiché vit dans
 *                   theme.config.js (content.categories), pour que le
 *                   marchand renomme un rayon sans qu'on retouche 21 fiches.
 *   - texture     : gel, crème, huile, poudre. Ce qu'on sent sous le doigt.
 *   - ingredient  : l'ingrédient principal, en clair.
 *   - moment      : matin, soir, ou les deux. La question qu'on se pose
 *                   vraiment devant un rayon de soin.
 *   - rituel      : le conseil d'usage, deux paragraphes. C'est ce que la
 *                   fiche affiche dans la section « Comment l'utiliser ».
 *   - badge       : 'Best-seller' ou 'Nouveauté'. Facultatif. Il s'affiche
 *                   sur la carte et sur la fiche, comme chez Fenty.
 *   - vaBienAvec  : jusqu'à deux slugs, façon « Suggested partners » d'Aesop.
 *   - teintes     : [{ nom, hex }]. UNIQUEMENT sur les produits de teint.
 *
 *  POURQUOI `teintes` EST DANS metadata ET PAS UNE VARIANTE :
 *  le modèle produit du projet n'a pas de variantes, et en inventer une
 *  ici casserait la correspondance avec SureCart. La teinte n'est donc PAS
 *  un prix différent : c'est une précision qui voyage avec la ligne de
 *  panier et qui part dans la commande. Le jour où les variantes existent,
 *  ce champ devient le point de bascule, et il est déjà au bon endroit.
 *
 *  `slug` reste SANS ACCENT, contrairement au reste : c'est une adresse web,
 *  et une adresse accentuée devient illisible dès qu'on la colle dans
 *  WhatsApp.
 */

export const products = [
  /* --------------------------------------------------------------------
   *  Soin du visage
   * ------------------------------------------------------------------ */
  {
    id: 'gel-nettoyant-hibiscus',
    slug: 'gel-nettoyant-hibiscus',
    name: 'Gel nettoyant à l’hibiscus',
    subtitle: 'Le premier geste du matin et du soir.',
    price: 6500,
    comparePrice: null,
    images: ['/produits/gel-nettoyant-hibiscus.jpg'],
    description:
      "Un gel transparent qui mousse peu et rince vite. Il retire la poussière, la sueur et les restes de maquillage sans laisser la peau qui tire. L’hibiscus, le bissap, vient du Sine-Saloum. Convient aux peaux mixtes et grasses.",
    inStock: true,
    stock: 42,
    format: '150 ml',
    priceId: null,
    metadata: {
      categorie: 'soin-visage',
      texture: 'Gel',
      ingredient: 'Hibiscus',
      moment: 'Matin et soir',
      badge: 'Best-seller',
      vaBienAvec: ['eau-micellaire-fleur-oranger', 'creme-hydratante-legere'],
      rituel:
        "Mouille ton visage à l’eau tiède, jamais chaude : l’eau chaude décape et la peau se venge en fabriquant plus de sébum. Une noisette dans la paume, tu émulsionnes, tu masses trente secondes en petits cercles, tu rinces.\n\nLe soir, si tu étais maquillée, passe d’abord l’eau micellaire : un nettoyant seul ne vient pas à bout d’un fond de teint tenue longue. Évite le contour des yeux.",
    },
  },
  {
    id: 'eau-micellaire-fleur-oranger',
    slug: 'eau-micellaire-fleur-oranger',
    name: 'Eau micellaire à la fleur d’oranger',
    subtitle: 'Pour démaquiller sans frotter.',
    price: 5500,
    comparePrice: null,
    images: ['/produits/gel-nettoyant-hibiscus.jpg'],
    description:
      "Une eau claire qui décolle le maquillage au contact, sans qu’on ait à insister. Elle s’utilise sur le visage, les yeux et les lèvres, et se rince si la peau tiraille. Sans alcool.",
    inStock: true,
    stock: 30,
    format: '200 ml',
    priceId: null,
    metadata: {
      categorie: 'soin-visage',
      texture: 'Eau',
      ingredient: 'Fleur d’oranger',
      moment: 'Soir',
      vaBienAvec: ['gel-nettoyant-hibiscus', 'fond-de-teint-fluide'],
      rituel:
        "Imbibe un coton, pose-le trois secondes sur l’œil fermé, puis fais glisser vers l’extérieur. Frotter un œil maquillé abîme les cils et irrite la paupière : c’est le temps de pose qui fait le travail, pas la pression.\n\nDeux cotons suffisent pour un maquillage de journée. S’il t’en faut cinq, c’est que tu frottes trop vite.",
    },
  },
  {
    id: 'serum-vitamine-c',
    slug: 'serum-vitamine-c',
    name: 'Sérum éclat à la vitamine C',
    subtitle: 'Le sérum du matin, sous la crème.',
    price: 21000,
    comparePrice: 26000,
    images: ['/produits/serum-vitamine-c.jpg'],
    description:
      "Un sérum jaune pâle, dosé à 10 % de vitamine C stabilisée. Il s’applique le matin, avant la crème et avant l’écran solaire. Un produit d’éclat et d’uniformité du teint, à intégrer progressivement.",
    inStock: true,
    stock: 18,
    format: '30 ml',
    priceId: null,
    metadata: {
      categorie: 'soin-visage',
      texture: 'Sérum',
      ingredient: 'Vitamine C 10 %',
      moment: 'Matin',
      badge: 'Best-seller',
      vaBienAvec: ['ecran-solaire-spf50', 'creme-hydratante-legere'],
      rituel:
        "Trois à quatre gouttes sur peau propre et sèche, le matin. Tu attends une minute que ça pénètre, puis la crème, puis l’écran solaire. La vitamine C et le soleil vont ensemble : le sérum le matin sans protection, c’est le sérum qui travaille pour rien.\n\nLes premières semaines, un jour sur deux. Un léger picotement à l’application est courant ; une rougeur qui dure ne l’est pas, et dans ce cas tu espaces.",
    },
  },
  {
    id: 'creme-hydratante-legere',
    slug: 'creme-hydratante-legere',
    name: 'Crème hydratante légère',
    subtitle: 'Elle hydrate sans faire briller.',
    price: 14000,
    comparePrice: null,
    images: ['/produits/creme-hydratante-legere.jpg'],
    description:
      "Une crème fluide, testée sous la chaleur de Dakar : elle pénètre en trente secondes et ne laisse pas de film. Acide hyaluronique et beurre de karité, en petite quantité pour rester légère.",
    inStock: true,
    stock: 26,
    format: '50 ml',
    priceId: null,
    metadata: {
      categorie: 'soin-visage',
      texture: 'Crème fluide',
      ingredient: 'Acide hyaluronique',
      moment: 'Matin et soir',
      vaBienAvec: ['serum-vitamine-c', 'contour-des-yeux'],
      rituel:
        "Une noisette, quatre points sur le visage, tu étales du centre vers l’extérieur. Sur peau encore légèrement humide, l’hydratation tient mieux : l’eau reste enfermée sous la crème au lieu de s’évaporer.\n\nSi ta peau brille à midi, ce n’est pas forcément la crème qui est trop riche : c’est souvent qu’elle manque d’eau et compense.",
    },
  },
  {
    id: 'masque-argile-miel',
    slug: 'masque-argile-miel',
    name: 'Masque argile et miel',
    subtitle: 'Une fois par semaine, pas plus.',
    price: 9500,
    comparePrice: null,
    images: ['/produits/creme-hydratante-legere.jpg'],
    description:
      "Un masque gris-vert à l’argile ghassoul, adouci au miel pour qu’il ne dessèche pas en séchant. Il resserre l’aspect des pores et retire l’excès de sébum sur la zone du front et du nez.",
    inStock: true,
    stock: 22,
    format: '100 ml',
    priceId: null,
    metadata: {
      categorie: 'soin-visage',
      texture: 'Pâte',
      ingredient: 'Argile ghassoul',
      moment: 'Une fois par semaine',
      vaBienAvec: ['gel-nettoyant-hibiscus', 'creme-hydratante-legere'],
      rituel:
        "Une couche épaisse sur peau propre, dix minutes, et tu rinces AVANT qu’il craquelle. Un masque à l’argile qui sèche complètement tire l’eau de la peau au lieu de l’assainir : c’est l’erreur la plus courante.\n\nSi ta peau est sèche, garde-le uniquement sur le front, le nez et le menton, et enchaîne avec la crème.",
    },
  },
  {
    id: 'contour-des-yeux',
    slug: 'contour-des-yeux',
    name: 'Contour des yeux au café',
    subtitle: 'Pour les matins courts.',
    price: 16500,
    comparePrice: null,
    images: ['/produits/serum-vitamine-c.jpg'],
    description:
      "Un soin léger à la caféine, à tapoter autour de l’œil. La peau y est cinq fois plus fine qu’ailleurs sur le visage : elle demande une texture qui ne pèse pas et un geste qui n’étire pas.",
    inStock: true,
    stock: 15,
    format: '15 ml',
    priceId: null,
    metadata: {
      categorie: 'soin-visage',
      texture: 'Gel-crème',
      ingredient: 'Caféine',
      moment: 'Matin',
      badge: 'Nouveauté',
      vaBienAvec: ['creme-hydratante-legere', 'serum-vitamine-c'],
      rituel:
        "Un grain de riz pour les deux yeux. Tu tapotes avec l’annulaire, de l’angle interne vers la tempe, sur l’os et non sur la paupière mobile. L’annulaire parce que c’est le doigt qui appuie le moins fort.\n\nProduit conservé au frais, l’effet est plus agréable au réveil. Ne pas l’appliquer trop près du cil : il migrerait dans l’œil.",
    },
  },
  {
    id: 'ecran-solaire-spf50',
    slug: 'ecran-solaire-spf50',
    name: 'Écran solaire visage SPF 50',
    subtitle: 'Le seul produit à ne jamais sauter.',
    price: 12500,
    comparePrice: null,
    images: ['/produits/ecran-solaire-spf50.jpg'],
    description:
      "Une texture fluide qui ne laisse pas de voile blanc sur les peaux noires et métissées, le reproche que l’on fait à presque tous les écrans solaires. Se porte seul ou sous le maquillage.",
    inStock: true,
    stock: 34,
    format: '50 ml',
    priceId: null,
    featured: true,
    metadata: {
      categorie: 'soin-visage',
      texture: 'Fluide',
      ingredient: 'Filtres SPF 50',
      moment: 'Matin, tous les jours',
      badge: 'Best-seller',
      vaBienAvec: ['serum-vitamine-c', 'creme-hydratante-legere'],
      rituel:
        "Deux doigts de produit pour le visage et le cou, en dernier geste du matin, après la crème. C’est la quantité qui fait la protection annoncée : la moitié du produit, ce n’est pas la moitié de la protection, c’est beaucoup moins.\n\nÀ renouveler toutes les deux heures si tu passes la journée dehors. Sous un maquillage, une brume ou une poudre solaire prend le relais sans tout redéfaire.",
    },
  },

  /* --------------------------------------------------------------------
   *  Maquillage
   *
   *  Les trois produits de teint portent un tableau `teintes`. Voir la note
   *  en tête de fichier : ce n'est pas une variante de prix, c'est une
   *  précision qui voyage avec la commande.
   * ------------------------------------------------------------------ */
  {
    id: 'fond-de-teint-fluide',
    slug: 'fond-de-teint-fluide',
    name: 'Fond de teint fluide',
    subtitle: 'Huit teintes, fini satiné.',
    price: 24000,
    comparePrice: null,
    images: ['/produits/fond-de-teint-fluide.jpg'],
    description:
      "Un fond de teint modulable, du voile léger à la couverture moyenne. Tenue testée sous la chaleur et l’humidité. Huit teintes construites pour les peaux noires et métissées, des sous-tons dorés aux sous-tons rouges.",
    inStock: true,
    stock: 20,
    format: '30 ml',
    priceId: null,
    metadata: {
      categorie: 'maquillage',
      texture: 'Fluide',
      ingredient: 'Pigments enrobés',
      moment: 'Au besoin',
      badge: 'Best-seller',
      vaBienAvec: ['poudre-libre-translucide', 'correcteur-creme'],
      teintes: [
        { nom: '210 Clair doré', hex: '#E7B98F' },
        { nom: '260 Clair neutre', hex: '#DCA97C' },
        { nom: '310 Moyen doré', hex: '#C68B5C' },
        { nom: '350 Moyen chaud', hex: '#B4794C' },
        { nom: '420 Moyen foncé', hex: '#9A6238' },
        { nom: '470 Foncé doré', hex: '#82502D' },
        { nom: '510 Foncé neutre', hex: '#6A3F24' },
        { nom: '560 Profond', hex: '#4E2D1A' },
      ],
      rituel:
        "Sur peau hydratée et écran solaire posé. Trois points, front, joues, menton, que tu estompes du centre vers l’extérieur avec une éponge humide ou les doigts. Le cou reçoit ce qui reste sur l’éponge : une démarcation à la mâchoire se voit de loin.\n\nPour choisir ta teinte, teste sur la mâchoire à la lumière du jour, jamais sur la main : le dos de la main n’a presque jamais la couleur du visage.",
    },
  },
  {
    id: 'correcteur-creme',
    slug: 'correcteur-creme',
    name: 'Correcteur crème',
    subtitle: 'Cinq teintes, couvrance haute.',
    price: 12000,
    comparePrice: null,
    images: ['/produits/fond-de-teint-fluide.jpg'],
    description:
      "Un correcteur crémeux qui ne marque pas les plis sous l’œil. Il sert aussi à rattraper une zone plus foncée autour de la bouche ou du nez. Cinq teintes, à choisir un ton au-dessus de ton fond de teint.",
    inStock: true,
    stock: 24,
    format: '7 ml',
    priceId: null,
    metadata: {
      categorie: 'maquillage',
      texture: 'Crème',
      ingredient: 'Pigments et cires souples',
      moment: 'Au besoin',
      vaBienAvec: ['fond-de-teint-fluide', 'poudre-libre-translucide'],
      teintes: [
        { nom: 'C1 Clair', hex: '#E9C094' },
        { nom: 'C2 Moyen', hex: '#CF9A67' },
        { nom: 'C3 Moyen foncé', hex: '#A97046' },
        { nom: 'C4 Foncé', hex: '#8A5732' },
        { nom: 'C5 Profond', hex: '#5F3A22' },
      ],
      rituel:
        "Trois petits traits en triangle sous l’œil, pointe vers la joue, que tu tapotes du bout du doigt. La chaleur du doigt fond la matière et évite la plaque.\n\nUne couche fine tient mieux que deux couches épaisses. Si le produit marque dans le pli en fin de journée, mets moins de matière avant d’en accuser la formule.",
    },
  },
  {
    id: 'poudre-libre-translucide',
    slug: 'poudre-libre-translucide',
    name: 'Poudre libre translucide',
    subtitle: 'Elle fixe sans blanchir.',
    price: 11000,
    comparePrice: null,
    images: ['/produits/palette-fards-nude.jpg'],
    description:
      "Une poudre très fine, sans pigment blanc, donc sans voile gris sur les peaux foncées. Elle fixe le fond de teint et le correcteur, et absorbe la brillance de la zone du front et du nez.",
    inStock: true,
    stock: 28,
    format: '12 g',
    priceId: null,
    metadata: {
      categorie: 'maquillage',
      texture: 'Poudre',
      ingredient: 'Amidon de riz',
      moment: 'Au besoin',
      vaBienAvec: ['fond-de-teint-fluide', 'correcteur-creme'],
      rituel:
        "Prends très peu de poudre, tapote l’excédent, et presse le pinceau ou l’éponge sur les zones qui brillent. On presse, on ne balaie pas : balayer déplace le fond de teint qui est dessous.\n\nSur le reste du visage, rien. Une peau entièrement poudrée perd le relief qui la fait paraître vivante.",
    },
  },
  {
    id: 'rouge-a-levres-mat',
    slug: 'rouge-a-levres-mat',
    name: 'Rouge à lèvres mat',
    subtitle: 'Six teintes, tenue longue.',
    price: 8500,
    comparePrice: null,
    images: ['/produits/rouge-a-levres-mat.jpg'],
    description:
      "Un mat souple qui ne dessèche pas les lèvres au bout d’une heure. Six teintes, du nude brun au rouge profond, choisies pour tenir sur des lèvres pigmentées sans virer.",
    inStock: true,
    stock: 36,
    format: '3,5 g',
    priceId: null,
    metadata: {
      categorie: 'maquillage',
      texture: 'Mat souple',
      ingredient: 'Cire de candelilla',
      moment: 'Au besoin',
      badge: 'Best-seller',
      vaBienAvec: ['gloss-repulpant', 'palette-fards-nude'],
      teintes: [
        { nom: 'Nude cannelle', hex: '#A5654F' },
        { nom: 'Terre de Casamance', hex: '#8C4433' },
        { nom: 'Brique', hex: '#9E3B2C' },
        { nom: 'Rouge bissap', hex: '#8E1F2A' },
        { nom: 'Prune', hex: '#6B2740' },
        { nom: 'Brun profond', hex: '#4A2420' },
      ],
      rituel:
        "Lèvres propres et sèches. Tu poses le produit au centre, tu étales vers les commissures, et tu tamponnes une fois avec un mouchoir avant une seconde couche fine : c’est ce qui fait tenir un mat toute une soirée.\n\nSur des lèvres gercées, applique un baume vingt minutes avant, puis essuie. Un mat posé sur des peaux mortes accroche et se voit.",
    },
  },
  {
    id: 'gloss-repulpant',
    slug: 'gloss-repulpant',
    name: 'Gloss repulpant',
    subtitle: 'Brillant, pas collant.',
    price: 6500,
    comparePrice: null,
    images: ['/produits/rouge-a-levres-mat.jpg'],
    description:
      "Un gloss transparent aux reflets dorés, à porter seul ou sur un rouge à lèvres. Formule non collante : les cheveux ne restent pas dessus quand il y a du vent.",
    inStock: true,
    stock: 40,
    format: '6 ml',
    priceId: null,
    metadata: {
      categorie: 'maquillage',
      texture: 'Gloss',
      ingredient: 'Huile de jojoba',
      moment: 'Au besoin',
      vaBienAvec: ['rouge-a-levres-mat', 'palette-fards-nude'],
      rituel:
        "Seul, une passe suffit. Sur un rouge à lèvres mat, pose-le uniquement au centre de la lèvre inférieure : c’est ce qui donne du volume sans casser le fini mat sur tout le reste.\n\nÀ réappliquer après avoir bu, comme tous les gloss. Ce n’est pas un défaut de tenue, c’est la nature du produit.",
    },
  },
  {
    id: 'mascara-volume',
    slug: 'mascara-volume',
    name: 'Mascara volume',
    subtitle: 'Il tient sous la chaleur.',
    price: 9000,
    comparePrice: null,
    images: ['/produits/rouge-a-levres-mat.jpg'],
    description:
      "Une brosse dense et une formule qui ne coule pas quand il fait 34 degrés. Il épaissit le cil sans le coller à son voisin, et se retire à l’eau micellaire sans frotter.",
    inStock: true,
    stock: 33,
    format: '10 ml',
    priceId: null,
    metadata: {
      categorie: 'maquillage',
      texture: 'Crème',
      ingredient: 'Cires et fibres courtes',
      moment: 'Au besoin',
      vaBienAvec: ['eau-micellaire-fleur-oranger', 'palette-fards-nude'],
      rituel:
        "Essuie le surplus sur le bord du tube, puis pars de la racine et remonte en zigzag lent. C’est la racine qui donne l’impression de densité, pas la pointe.\n\nNe pompe pas la brosse dans le tube : chaque va-et-vient y fait entrer de l’air, et c’est ce qui sèche un mascara en trois semaines.",
    },
  },
  {
    id: 'palette-fards-nude',
    slug: 'palette-fards-nude',
    name: 'Palette de fards nude',
    subtitle: 'Neuf teintes, du mat au satiné.',
    price: 19500,
    comparePrice: 24000,
    images: ['/produits/palette-fards-nude.jpg'],
    description:
      "Neuf fards à paupières dans une gamme de bruns, cuivres et prunes, tous portables ensemble. Pigmentation forte : une petite quantité suffit, et la couleur reste vraie sur les paupières foncées.",
    inStock: true,
    stock: 12,
    format: '9 x 1,4 g',
    priceId: null,
    metadata: {
      categorie: 'maquillage',
      texture: 'Poudre pressée',
      ingredient: 'Pigments minéraux',
      moment: 'Au besoin',
      badge: 'Nouveauté',
      vaBienAvec: ['mascara-volume', 'rouge-a-levres-mat'],
      rituel:
        "Commence par la teinte la plus claire sur toute la paupière, puis creuse le pli avec la teinte moyenne, et garde la plus foncée pour l’angle externe. Trois couches légères valent mieux qu’une couche chargée.\n\nTape le pinceau avant de l’appliquer : la poudre qui tombe sous l’œil se retire mieux avant le fond de teint qu’après.",
    },
  },

  /* --------------------------------------------------------------------
   *  Corps et cheveux
   * ------------------------------------------------------------------ */
  {
    id: 'beurre-karite-brut',
    slug: 'beurre-karite-brut',
    name: 'Beurre de karité brut',
    subtitle: 'Non raffiné, rien d’autre dedans.',
    price: 3500,
    comparePrice: null,
    images: ['/produits/beurre-karite-brut.jpg'],
    description:
      "Du karité pressé et filtré, sans parfum, sans colorant, sans conservateur. Couleur ivoire et odeur de noisette : c’est l’odeur du karité non raffiné, elle s’estompe sur la peau en quelques minutes.",
    inStock: true,
    stock: 60,
    format: '200 g',
    priceId: null,
    metadata: {
      categorie: 'corps-cheveux',
      texture: 'Beurre',
      ingredient: 'Karité non raffiné',
      moment: 'Après la douche',
      badge: 'Best-seller',
      vaBienAvec: ['savon-noir-africain', 'lait-corps-karite-vanille'],
      rituel:
        "Prends une noix, fais-la fondre entre les paumes trente secondes, puis applique sur peau encore humide. Un beurre appliqué froid sur peau sèche reste en surface et graisse ; fondu sur peau humide, il pénètre.\n\nIl sert aussi aux coudes, aux talons et aux pointes de cheveux. Une seule chose, plusieurs usages.",
    },
  },
  {
    id: 'savon-noir-africain',
    slug: 'savon-noir-africain',
    name: 'Savon noir africain',
    subtitle: 'Le savon du corps, pas du visage.',
    price: 3000,
    comparePrice: null,
    images: ['/produits/savon-noir-africain.jpg'],
    description:
      "Un savon traditionnel à base de cendres de cabosse de cacao et d’huile de palmiste. Il nettoie en profondeur et se rince sans laisser de film. Texture irrégulière et couleur variable : c’est un produit artisanal.",
    inStock: true,
    stock: 55,
    format: '150 g',
    priceId: null,
    metadata: {
      categorie: 'corps-cheveux',
      texture: 'Savon',
      ingredient: 'Cendres de cabosse',
      moment: 'À la douche',
      vaBienAvec: ['beurre-karite-brut', 'gommage-cafe-coco'],
      rituel:
        "Fais mousser dans les mains ou sur un gant, jamais en frottant le pain directement sur la peau : il est abrasif et le geste irrite.\n\nGarde-le hors de l’eau entre deux douches, sur un porte-savon qui s’égoutte. Un savon noir laissé dans une flaque fond en une semaine.",
    },
  },
  {
    id: 'huile-baobab',
    slug: 'huile-baobab',
    name: 'Huile de baobab',
    subtitle: 'Elle pénètre vite, elle ne graisse pas.',
    price: 12000,
    comparePrice: null,
    images: ['/produits/huile-baobab.jpg'],
    description:
      "Une huile jaune clair, pressée à froid, issue des graines de baobab. Elle s’absorbe plus vite que la plupart des huiles végétales, ce qui la rend portable même en journée.",
    inStock: true,
    stock: 25,
    format: '100 ml',
    priceId: null,
    metadata: {
      categorie: 'corps-cheveux',
      texture: 'Huile',
      ingredient: 'Graines de baobab',
      moment: 'Matin ou soir',
      badge: 'Nouveauté',
      vaBienAvec: ['lait-corps-karite-vanille', 'huile-capillaire-ricin'],
      rituel:
        "Quelques gouttes dans les paumes, à appliquer sur peau humide en sortant de la douche. Sur peau sèche, l’huile reste dessus ; sur peau humide, elle enferme l’eau.\n\nSur les cheveux, deux gouttes sur les longueurs seulement. À la racine, elle alourdit.",
    },
  },
  {
    id: 'lait-corps-karite-vanille',
    slug: 'lait-corps-karite-vanille',
    name: 'Lait corps karité et vanille',
    subtitle: 'Plus léger qu’un beurre, plus nourrissant qu’une eau.',
    price: 7500,
    comparePrice: null,
    images: ['/produits/beurre-karite-brut.jpg'],
    description:
      "Un lait fluide au karité, parfumé à la vanille de façon discrète. Il s’étale sur tout le corps sans coller, ce qui permet de s’habiller tout de suite après.",
    inStock: true,
    stock: 38,
    format: '250 ml',
    priceId: null,
    metadata: {
      categorie: 'corps-cheveux',
      texture: 'Lait',
      ingredient: 'Karité et vanille',
      moment: 'Après la douche',
      vaBienAvec: ['beurre-karite-brut', 'gommage-cafe-coco'],
      rituel:
        "Une pression par membre, sur peau encore tiède au sortir de la douche. Remonte des chevilles vers les cuisses : le geste vers le haut est plus agréable et fait durer le massage.\n\nInsiste sur les genoux, les coudes et les talons, qui n’ont presque pas de glandes sébacées et sèchent les premiers.",
    },
  },
  {
    id: 'gommage-cafe-coco',
    slug: 'gommage-cafe-coco',
    name: 'Gommage café et coco',
    subtitle: 'Deux fois par semaine, au maximum.',
    price: 6000,
    comparePrice: null,
    images: ['/produits/savon-noir-africain.jpg'],
    description:
      "Un gommage à grains de marc de café, lié à l’huile de coco. Il retire les peaux mortes du corps et prépare la peau à recevoir le lait ou le beurre. À réserver au corps, il est trop abrasif pour le visage.",
    inStock: true,
    stock: 29,
    format: '200 g',
    priceId: null,
    metadata: {
      categorie: 'corps-cheveux',
      texture: 'Grains',
      ingredient: 'Marc de café',
      moment: 'Deux fois par semaine',
      vaBienAvec: ['lait-corps-karite-vanille', 'savon-noir-africain'],
      rituel:
        "Sur peau mouillée, en cercles larges et sans appuyer, une minute suffit. Rince à l’eau tiède, puis applique le lait ou le beurre dans la foulée : c’est le moment où la peau absorbe le mieux.\n\nJamais sur une peau irritée, sur un coup de soleil, ni juste après un rasage.",
    },
  },
  {
    id: 'huile-capillaire-ricin',
    slug: 'huile-capillaire-ricin',
    name: 'Huile capillaire ricin et menthe',
    subtitle: 'Pour le cuir chevelu, pas pour les longueurs.',
    price: 8500,
    comparePrice: null,
    images: ['/produits/huile-baobab.jpg'],
    description:
      "Une huile épaisse au ricin, allégée à l’huile de tournesol et rafraîchie à la menthe poivrée. Elle s’applique au cuir chevelu, raie par raie, et s’accompagne d’un massage.",
    inStock: true,
    stock: 31,
    format: '100 ml',
    priceId: null,
    metadata: {
      categorie: 'corps-cheveux',
      texture: 'Huile épaisse',
      ingredient: 'Ricin et menthe poivrée',
      moment: 'Avant le shampoing',
      vaBienAvec: ['masque-cheveux-hydratant', 'huile-baobab'],
      rituel:
        "Sépare les cheveux en raies, dépose quelques gouttes sur le cuir chevelu, puis masse cinq minutes avec la pulpe des doigts, jamais avec les ongles. Le massage compte autant que l’huile.\n\nLaisse poser trente minutes à une heure avant le shampoing. Une nuit entière n’apporte rien de plus et laisse les cheveux lourds.",
    },
  },
  {
    id: 'masque-cheveux-hydratant',
    slug: 'masque-cheveux-hydratant',
    name: 'Masque cheveux hydratant',
    subtitle: 'Pour les cheveux crépus et bouclés.',
    price: 10500,
    comparePrice: null,
    images: ['/produits/beurre-karite-brut.jpg'],
    description:
      "Un masque crémeux au karité et à l’aloe vera, qui redonne de la souplesse aux cheveux secs et facilite le démêlage. Sans silicone, donc il se rince complètement.",
    inStock: true,
    stock: 21,
    format: '250 ml',
    priceId: null,
    metadata: {
      categorie: 'corps-cheveux',
      texture: 'Crème',
      ingredient: 'Karité et aloe vera',
      moment: 'Après le shampoing',
      badge: 'Best-seller',
      vaBienAvec: ['huile-capillaire-ricin', 'beurre-karite-brut'],
      rituel:
        "Sur cheveux essorés, jamais dégoulinants : l’eau qui reste dilue le produit et il glisse. Applique des pointes vers les racines, démêle au peigne à dents larges pendant la pose, dix minutes.\n\nRince à l’eau tiède puis fraîche. L’eau fraîche referme l’écaille et c’est ce qui fait la brillance, pas le produit.",
    },
  },
];
