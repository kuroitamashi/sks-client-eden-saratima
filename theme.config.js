/* La source unique de verite du template taaru.
 *
 *  TOUT ce que le marchand peut changer vit ici, et nulle part ailleurs.
 *  Aucune couleur, aucune police, aucun texte visible n'est ecrit en dur
 *  dans un composant : si tu en trouves un, c'est un bug.
 *
 *  Deux racines, volontairement separees :
 *    - theme   : l'apparence. Suit le contrat partage (shared/theme-contract.js).
 *    - content : les mots. Propre a ce template, decrit dans son
 *                template.manifest.json.
 *
 *  ---------------------------------------------------------------------
 *  BOUTIQUE : Taaru, soin, maquillage, corps et cheveux.
 *
 *  << Taaru >> designe la parure, le fait de se faire beau, en wolof.
 *
 *  CE TEMPLATE EST UNE DEMONSTRATION, PAS UNE BOUTIQUE REELLE.
 *  Les produits, les prix et les textes sont INVENTES. Aucun branding
 *  client, aucune marque, aucun logo n'y figure : il sert a montrer un
 *  rendu, pas a vendre.
 *
 *  TROIS GARDE-FOUS NON NEGOCIABLES, valables pour tout texte ajoute ici :
 *   1. Aucun avant / apres de peau. C'est une promesse de resultat dont le
 *      marchand repondrait.
 *   2. Aucun vocabulaire eclaircissant. Le mot renvoie au xessal, sujet de
 *      sante publique au Senegal. On decrit des USAGES (eclat, uniformite
 *      du teint, taches), jamais des resultats.
 *   3. Aucun logo de marque visible sur une image.
 *
 *  AVANT TOUTE MISE EN LIGNE REELLE, trois choses a changer :
 *   1. identity.whatsapp. Le numero ci-dessous est un PLACEHOLDER.
 *   2. commerce.demoMode, a passer a false (voir son commentaire).
 *   3. Le catalogue de src/data/fixtures/cosmetiques.js.
 *  ---------------------------------------------------------------------
 */

export const theme = {
  identity: {
    name: 'Eden by Saratima',
    tagline: 'Soin & Beauté Naturelle',
    logoText: 'EDEN BY SARATIMA',
    logoImage: null,
    favicon: '/favicon.svg',
    ogImage: null,
    whatsapp: '+221770000000',
    email: null,
    instagram: null,
  },

  colors: {
    primary: '#8A2B52',   // framboise chic : boutons, aplats forts
    secondary: '#9C8E93', // gris rosé doux : textes secondaires appuyés, filets
    bg: '#FFFFFF',        // fond de page blanc pur
    surface: '#FCF7F9',   // rose poudré très clair : cartes, rails, blocs
    text: '#1C1317',      // texte sombre lisible
    accent: '#D45D86',    // rose vif : surtitres, badges, prix barrés
  },

  typography: { pair: 'geometrique' },

  shape: { preset: 'net' },

  layout: { contentWidth: '1840px', density: 'aeree' },

  commerce: {
    currency: 'XOF',
    locale: 'fr-SN',
    checkoutUrl: '/commande/',
    demoMode: false,
    mobileMoneyNumber: null,
    sksApiUrl: 'https://app.senkheweulstore.com',
    slug: 'eden-saratima',
  },

  // Metadonnees lues par themes-store/, le repertoire des themes SKS.
  // Ne changent pas le rendu de CETTE boutique, seulement sa fiche
  // dans le catalogue. Voir specs/docs/superpowers/specs/2026-09-12-themes-store-design.md.
  catalogue: {
    secteur: 'beaute',
    tailleCatalogue: 'grand-catalogue', // 21 produits dans src/data/fixtures/cosmetiques.js
    commande: 'formulaire',             // checkoutUrl: '/commande/' ci-dessus
    planMin: 'starter',
  },
};

export const content = {
  announcement: {
    actif: true,
    texte: 'Livraison à Dakar sous 24h/48h — Bienvenue chez Eden by Saratima',
  },

  /* Ancres ABSOLUES et non '#catalogue' : depuis une fiche produit, une
     ancre relative ne trouve pas la section qui n'existe que sur l'accueil,
     et le lien ne fait rien. */
  nav: [
    { libelle: 'Tous les produits', href: '/produits/' },
    { libelle: 'Soin du visage', href: '/produits/?rayon=soin-visage' },
    { libelle: 'Maquillage', href: '/produits/?rayon=maquillage' },
    { libelle: 'Le rituel du moment', href: '/#focus' },
    { libelle: 'Questions', href: '/#faq' },
  ],

  /* Les rayons.
   *
   *  `cle` est le slug ecrit dans metadata.categorie de chaque produit.
   *  `libelle` est ce qui s'affiche. Renommer un rayon se fait donc ICI, en
   *  une ligne, sans toucher aux vingt et une fiches. */
  categories: [
    { cle: 'soin-visage', libelle: 'Soin du visage', surAccueil: true },
    { cle: 'maquillage', libelle: 'Maquillage', surAccueil: true },
    { cle: 'corps-cheveux', libelle: 'Corps et cheveux', surAccueil: true },
  ],

  /* La banniere, en trois volets qui defilent.
   *
   *  C'est la rupture avec Xam Xam, dont la banniere etalait trois
   *  couvertures en eventail. Une boutique de soin raconte : chaque volet
   *  porte une idee, un titre et une destination. Le defilement est
   *  automatique, il s'arrete au survol et au focus clavier.
   *
   *  `fond` choisit l'aplat du volet parmi trois valeurs du theme :
   *  'surface' (creme), 'accent' (terre cuite) et 'primary' (noir). Ce sont
   *  des ROLES du contrat, pas des couleurs : changer la palette dans le
   *  dashboard change la banniere sans qu'on touche a ce fichier.
   */
  hero: {
    volets: [
      {
        fond: 'surface',
        grandTitre: 'SOIN DU VISAGE',
        surtitre: 'Rituel quotidien',
        titre: 'Une peau qu’on écoute',
        texte:
          "Des formules courtes, choisies pour le climat de Dakar : la chaleur, la poussière, le soleil. On te dit à quoi sert chaque produit et à quel moment le mettre.",
        cta: 'Voir les soins',
        href: '/produits/?rayon=soin-visage',
        bgImage: '/hero/hero-soin-visage.jpg',
        archImage: '/produits/serum-vitamine-c.jpg',
      },
      {
        fond: 'primary',
        grandTitre: 'MAQUILLAGE',
        surtitre: 'Teint & Lèvres',
        titre: 'Des teintes faites pour nous',
        texte:
          "Du fond de teint au rouge à lèvres, une gamme pensée pour les peaux noires et métissées. Choisis ta teinte, elle part avec ta commande.",
        cta: 'Voir le maquillage',
        href: '/produits/?rayon=maquillage',
        bgImage: '/hero/hero-maquillage.jpg',
        archImage: '/produits/fond-de-teint-fluide.jpg',
      },
      {
        fond: 'accent',
        grandTitre: 'CORPS & CHEVEUX',
        surtitre: 'Artisanat & Pureté',
        titre: 'Le karité, sans détour',
        texte:
          "Beurre de karité, huiles et savons. Ce qui se fait ici depuis toujours, présenté comme il le mérite.",
        cta: 'Voir le rayon',
        href: '/produits/?rayon=corps-cheveux',
        bgImage: '/hero/hero-corps-cheveux.jpg',
        archImage: '/produits/beurre-karite-brut.jpg',
      },
    ],
  },

  benefits: [
    {
      chiffre: '21',
      titre: 'Produits',
      texte: "Un catalogue court. Chaque produit est là parce qu'on sait à qui le conseiller.",
    },
    {
      chiffre: '3',
      titre: 'Rayons',
      texte: 'Le visage, le maquillage, le corps et les cheveux. Rien de plus, rien à trier.',
    },
    {
      chiffre: '48 h',
      titre: 'Livraison à Dakar',
      texte: 'Commandée aujourd’hui, livrée après-demain, payée à la remise si tu préfères.',
    },
    {
      chiffre: '0',
      titre: 'Promesse en l’air',
      texte:
        "On dit à quoi sert un produit et comment l'utiliser. Jamais ce qu'il va faire de ta peau.",
    },
  ],

  productFocus: {
    surtitre: 'Le rituel du moment',
    titre: 'Par où commencer',
    texte:
      "Chaque mois, un produit est mis en avant parce qu'il répond à une question qui revient souvent. Ce mois-ci, c'est celui-là.",
    points: [
      'Une texture qui tient sous la chaleur',
      'À utiliser matin ou soir, on te dit lequel',
      'Format qui dure entre six et huit semaines',
      'Un conseil d’usage avant de décider',
    ],
    lienFiche: 'Voir le produit',
  },

  catalogue: {
    surtitre: 'La boutique',
    titre: 'Par rayon',
    texte: 'Fais glisser pour voir la suite du rayon, ou ouvre le catalogue complet.',
    voirTout: 'Voir tout',
  },

  cataloguePage: {
    surtitre: 'Catalogue',
    titre: 'Tous les produits',
    texte: 'Vingt et un produits, trois rayons. Choisis un rayon pour réduire la liste.',
  },

  /* En-tete du bloc de conseil, sur la fiche produit. Le texte lui-meme
     vient de metadata.rituel, donc du catalogue : chaque produit a le sien. */
  presentation: {
    surtitre: 'Comment l’utiliser',
    titre: 'Le geste, en deux minutes',
    texte: "Quand le mettre, sur quelle peau, et ce qu'il ne faut pas faire avec.",
  },

  // Etiquettes courtes sous le titre du produit, sur la fiche.
  targets: ['Testé sous la chaleur', 'Sans parfum ajouté', 'Livraison 48 h à Dakar'],

  buyReassurance: [
    { titre: 'Comment tu paies', texte: 'À la livraison, ou par Wave et Orange Money' },
    { titre: 'Quand tu reçois', texte: 'Sous 48 h à Dakar, on te confirme le créneau' },
    { titre: 'Une question avant ?', texte: 'On répond sur WhatsApp, sans pousser à l’achat' },
  ],

  /* Aucun avis n'est ecrit ici, VOLONTAIREMENT.
     Inventer des temoignages pour une boutique montree a un vrai client,
     c'est lui livrer de faux avis qu'il publierait sans le savoir. La
     section se retire d'elle-meme tant que la liste est vide. */
  reviews: {
    surtitre: 'Elles ont essayé',
    titre: 'Ce qu’on nous écrit',
    liste: [],
  },

  faq: {
    surtitre: 'Questions',
    titre: 'Ce qu’on nous demande le plus',
    liste: [
      {
        question: 'Comment je paie ?',
        reponse:
          "À la livraison, en espèces, quand le livreur te remet le colis. Ou par Wave et Orange Money avant l'envoi, si tu préfères : on te confirme le numéro sur WhatsApp au moment de la commande.",
      },
      {
        question: 'Vous livrez où, et en combien de temps ?',
        reponse:
          "À Dakar et en banlieue, sous 48 h. Pour les régions, on passe par le transporteur que tu utilises d'habitude et on convient du délai ensemble.",
      },
      {
        question: 'Comment je choisis ma teinte ?',
        reponse:
          "Sur la fiche du produit, chaque teinte a son carré et son nom. Tu cliques, la teinte reste attachée à ta commande. Si tu hésites entre deux, écris-nous sur WhatsApp avec une photo à la lumière du jour.",
      },
      {
        question: 'Vos produits conviennent aux peaux sensibles ?',
        reponse:
          "Chaque fiche indique la texture et l'ingrédient principal. En cas de peau réactive, applique d'abord une petite quantité au creux du bras et attends 24 h. En cas de doute, demande à un dermatologue avant d'acheter.",
      },
      {
        question: 'Est-ce que ces produits éclaircissent la peau ?',
        reponse:
          "Non, et nous n'en vendons pas. Nos produits s'occupent d'éclat, d'hydratation, d'uniformité du teint et de taches. Aucun n'a pour but de changer la couleur de ta peau.",
      },
      {
        question: 'Je peux échanger si le produit ne me va pas ?',
        reponse:
          "Un produit non ouvert s'échange sous 7 jours. Un produit entamé ne se reprend pas : c'est de l'hygiène, pas de la mauvaise volonté.",
      },
    ],
  },

  reassurance: [
    { titre: 'Livraison 48 h', texte: 'À Dakar et en banlieue' },
    { titre: 'Paiement à la livraison', texte: 'Tu paies quand tu reçois' },
    { titre: 'Conseil sur WhatsApp', texte: 'Une question, une réponse' },
    { titre: 'Conseils d’usage', texte: 'Pas de promesse de résultat' },
  ],

  /* La page de commande.
   *
   *  Elle n'existait pas dans Xam Xam, dont le tiroir du panier ouvrait
   *  WhatsApp directement. Ici, la cliente passe par un vrai bon de
   *  commande : coordonnees, adresse, mode de paiement, recapitulatif. */
  commande: {
    surtitre: 'Commande',
    titre: 'Finaliser ma commande',
    contactTitre: 'Contact',
    livraisonTitre: 'Livraison',
    paiementTitre: 'Paiement',
    paiementTexte: 'Aucun paiement n’est prélevé sur le site.',

    champs: {
      nom: 'Nom complet',
      telephone: 'Numéro de téléphone',
      telephonePlaceholder: '77 123 45 67',
      email: 'Adresse e-mail',
      emailPlaceholder: 'Facultatif',
      zone: 'Zone de livraison',
      zoneVide: 'Choisis ta zone',
      adresse: 'Adresse de livraison',
      adressePlaceholder: 'Quartier, rue, point de repère',
      note: 'Un mot pour le marchand',
      notePlaceholder: 'Facultatif : une précision sur ta commande',
    },

    /* Les zones de livraison et leurs tarifs.
     *
     *  `tarif` est un montant en FCFA. `tarif: null` veut dire << à
     *  convenir >> : la zone reste choisissable, le total affiche alors le
     *  sous-total seul et la ligne de livraison dit que le prix se fixe avec
     *  le marchand. C'est le cas des régions, où le prix dépend du
     *  transporteur que la cliente utilise d'habitude.
     *
     *  Le marchand modifie SES zones ici, en une ligne chacune. */
    zones: [
      { cle: 'dakar-centre', libelle: 'Dakar centre (Plateau, Médina, Fann)', tarif: 1500, delai: 'Sous 24 h' },
      { cle: 'dakar-ouest', libelle: 'Almadies, Ngor, Yoff, Ouakam', tarif: 2000, delai: 'Sous 24 h' },
      { cle: 'banlieue', libelle: 'Pikine, Guédiawaye, Thiaroye', tarif: 2500, delai: 'Sous 48 h' },
      { cle: 'rufisque', libelle: 'Rufisque, Bargny, Diamniadio', tarif: 3000, delai: 'Sous 48 h' },
      { cle: 'regions', libelle: 'Autres régions', tarif: null, delai: 'Par transporteur' },
    ],

    /* Les modes de paiement.
     *
     *  AUCUN N'ENCAISSE : PayDunya n'est pas branché. Le mode choisi part
     *  avec la commande et le marchand confirme. Écrire ici une phrase qui
     *  laisse croire à un paiement en ligne serait un mensonge de vitrine.
     *
     *  `operateurs` n'a de sens que sur le mode mobile : ce sont les
     *  pastilles affichées sous l'option, façon Shopify. `logo` accepte un
     *  chemin d'image le jour où on a les vrais logos ; tant qu'il vaut
     *  null, la pastille affiche le nom de l'opérateur. */
    modes: [
      {
        cle: 'livraison',
        libelle: 'Paiement à la livraison',
        aide: 'Tu paies en espèces au livreur, au moment où il te remet le colis. Rien à avancer.',
      },
      {
        cle: 'mobile',
        libelle: 'Paiement mobile',
        aide: 'Tu envoies le montant avant l’expédition. On te confirme le numéro sur WhatsApp juste après ta commande.',
        aideAvecNumero: 'Envoie le montant au',
        operateurs: [
          { nom: 'Wave', couleur: '#1DC8F2', logo: null },
          { nom: 'Orange Money', couleur: '#FF7900', logo: null },
          { nom: 'Free Money', couleur: '#E4002B', logo: null },
          { nom: 'Wizall', couleur: '#00A651', logo: null },
        ],
      },
    ],

    payer: 'Payer',
    // Pendant l'aller-retour vers SKS. Le bouton est bloque le temps de
    // l'envoi : sans ca, un double clic sur un reseau lent cree deux fois la
    // meme commande, et le marchand livre deux fois.
    envoiEnCours: 'Envoi en cours...',

    /* Le récapitulatif, colonne de droite. */
    recapTitre: 'Ton panier',
    reduction: {
      placeholder: 'Code de réduction',
      bouton: 'Valider',
      applique: 'Code appliqué',
      retirer: 'Retirer',
      inconnu: 'Ce code n’existe pas.',
    },

    /* Les codes de réduction que la boutique accepte.
     *
     *  ⚠️ LIMITE À CONNAÎTRE : la vérification se fait dans le NAVIGATEUR,
     *  puisqu'un site statique n'a pas de serveur. Quelqu'un qui sait lire
     *  le code source de la page voit la liste et peut la contourner. Ce
     *  n'est donc pas un prix garanti : c'est une remise annoncée au
     *  marchand dans la commande, qu'il confirme avant d'expédier. Le jour
     *  où le paiement en ligne existe, la remise devra être recalculée par
     *  le serveur, jamais reprise telle quelle. */
    codes: [
      { code: 'TAARU10', type: 'pourcent', valeur: 10, libelle: '10 % de remise' },
      { code: 'LIVRAISON', type: 'livraison', valeur: 0, libelle: 'Livraison offerte' },
    ],

    totaux: {
      sousTotal: 'Sous-total',
      livraison: 'Livraison',
      livraisonAChoisir: 'Choisis ta zone',
      livraisonOfferte: 'Offerte',
      livraisonAConvenir: 'À convenir',
      reduction: 'Réduction',
      total: 'Total',
    },

    /* Les trois arguments sous le récapitulatif, avec leur icône.
       `icone` vaut 'livraison', 'paiement' ou 'retour'. */
    avantages: [
      { icone: 'livraison', titre: 'Livraison suivie', texte: 'On t’appelle avant de passer, jamais de colis déposé sans toi.' },
      { icone: 'paiement', titre: 'Paiement à la remise', texte: 'Tu peux ne rien avancer et payer le livreur en espèces.' },
      { icone: 'retour', titre: 'Échange sous 7 jours', texte: 'Un produit non ouvert s’échange. Un produit entamé ne se reprend pas.' },
    ],

    erreurs: {
      nom: 'Écris ton nom complet, le livreur en a besoin.',
      telephone: 'Écris un numéro sénégalais à 9 chiffres, par exemple 77 123 45 67.',
      email: 'Cette adresse e-mail n’a pas l’air valide.',
      zone: 'Choisis ta zone de livraison.',
      adresse: 'Écris ton adresse, avec un point de repère si tu peux.',
      vide: 'Ton panier est vide, il n’y a rien à commander.',
    },

    confirmation: {
      titre: 'Merci, c’est noté',
      texteDemo:
        'Ceci est une boutique de démonstration : rien n’a été envoyé et personne ne te rappellera. Sur une vraie boutique, le marchand recevrait cette commande à l’instant.',
      texteReel: 'On te rappelle très vite pour confirmer le créneau de livraison.',
      retour: 'Retour à la boutique',
    },
  },

  footer: {
    texte: 'Des soins et du maquillage choisis un par un, pour les peaux d’ici.',
    colonnes: [
      {
        titre: 'La boutique',
        liens: [
          { libelle: 'Tous les produits', href: '/produits/' },
          { libelle: 'Soin du visage', href: '/produits/?rayon=soin-visage' },
          { libelle: 'Maquillage', href: '/produits/?rayon=maquillage' },
          { libelle: 'Corps et cheveux', href: '/produits/?rayon=corps-cheveux' },
        ],
      },
      {
        titre: 'Aide',
        liens: [
          { libelle: 'Questions fréquentes', href: '/#faq' },
          { libelle: 'Livraison et paiement', href: '/#faq' },
        ],
      },
    ],
    mentions: 'Boutique propulsée par Sen Kheweul Store',
  },

  // Textes d'interface. Ils s'affichent, donc ils ne sont pas ecrits en dur.
  ui: {
    ajouterAuPanier: 'Ajouter au panier',
    ajouterCourt: 'Ajouter',
    // Une carte de catalogue ne porte pas de nuancier : elle renvoie a la
    // fiche, ou la teinte se choisit.
    choisirTeinte: 'Choisir la teinte',
    panier: 'Panier',
    panierVide: 'Ton panier est vide.',
    continuerAchats: 'Continuer mes achats',
    commander: 'Passer commande',
    sousTotal: 'Sous-total',
    quantite: 'Quantité',
    livraisonCalculee: 'Livraison confirmée à l’étape suivante.',
    rupture: 'Bientôt disponible',
    retirer: 'Retirer',
    enStock: 'En stock, expédié sous 24 h',
    allerAuContenu: 'Aller au contenu',
    ecrireSurWhatsapp: 'Écrire sur WhatsApp',
    // Propres a une boutique de cosmetique
    teinte: 'Teinte',
    teinteChoisie: 'Teinte choisie',
    contenance: 'Contenance',
    tousLesRayons: 'Tous les rayons',
    aucunResultat: 'Aucun produit dans ce rayon pour le moment.',
    produitsAuCatalogue: 'produits au catalogue',
    vaBienAvec: 'Va bien avec',
  },
};

export default { theme, content };
