/* =====================================================================
   LE TOUAREG · Réglages du restaurant + carte
   C'est le seul fichier à modifier au quotidien (prix, horaires, plats).
   ===================================================================== */

window.TOUAREG = {

  /* ---------- Réglages ---------- */
  reglages: {
    nom: 'Le Touareg',
    adresse: '11 B place Diderot',
    codePostal: '77130',
    ville: 'Montereau-Fault-Yonne',
    telephone: '06 73 82 78 21',
    whatsapp: '33673827821',          // numéro qui reçoit les commandes (format international, sans +)
    email: ['jamel.tp', 'hotmail.com'],   // écrit en deux morceaux contre les robots de spam
    uberEats: 'https://www.ubereats.com/fr/store/le-touareg/Fxfsm_SqW_-STqValFyyPA',
    googleMaps: 'https://www.google.com/maps/search/?api=1&query=Le+Touareg+11+B+place+Diderot+77130+Montereau-Fault-Yonne',
    noteUber: { note: '4,2', avis: '190+' },
    titresRestaurant: ['UpDéjeuner', 'Bimpli', 'Pluxee', 'Swile', 'Ticket Restaurant®'],

    /* Horaires : 0 = dimanche … 6 = samedi. Plusieurs créneaux possibles : [['11:00','14:30'],['18:00','22:45']] */
    horaires: {
      0: [['11:00', '22:45']],
      1: [['11:00', '22:45']],
      2: [['11:00', '22:45']],
      3: [['11:00', '22:45']],
      4: [['11:00', '22:45']],
      5: [['11:00', '22:45']],
      6: [['11:00', '22:45']],
    },
    delaiPreparation: 20,             // minutes, pour le premier créneau de retrait proposé

    /* Les prix ci-dessous sont ceux d'Uber Eats. Ils sont tous égaux au prix comptoir × 1,3.
       Mettre 1.3 ici pour afficher les prix comptoir sur le site (ex. 7,80 € → 6,00 €). */
    diviseurPrix: 1,

    /* Mesure d'audience GoatCounter (gratuite, sans cookie). Créer un compte sur goatcounter.com,
       puis mettre ici le code choisi (ex. 'letouareg' pour letouareg.goatcounter.com).
       Vide = aucune mesure. Elle ne démarre qu'après accord du visiteur dans la bannière. */
    analytics: { goatcounter: '' },
  },

  /* Boissons proposées dans les menus */
  boissonsMenu: ['Coca-Cola', 'Pepsi', 'Lipton Ice Tea'],

  /* ---------- Catégories (ordre d'affichage) ---------- */
  categories: [
    { id: 'sandwichs',   nom: 'Sandwichs',     photo: 'sandwich',  accroche: 'Le n° 1 de la maison. Tous existent en menu.', menu: true, note: 'GPT : galette de pomme de terre.' },
    { id: 'tacos',       nom: 'Tacos',         photo: 'tacos',     accroche: 'Le French tacos, en L ou en XL.', menu: true },
    { id: 'burgers',     nom: 'Burgers',       photo: 'burger',    accroche: 'Du cheese à 3,90 € au double steak de 180 g.', menu: true },
    { id: 'pizzas',      nom: 'Pizzas',        photo: 'pizza',     accroche: 'Taille sénior, base au choix.' },
    { id: 'pizza-turque',nom: 'Pizza turque',  photo: 'pide',      accroche: 'Pâte fine, garniture et épices traditionnelles.', menu: true },
    { id: 'assiettes',   nom: 'Assiettes',     photo: 'assiette',  accroche: 'Pour les grosses faims : jusqu’à 4 viandes au choix.' },
    { id: 'paninis',     nom: 'Paninis',       photo: 'panini',    accroche: 'Pressés et servis bien chauds.', menu: true },
    { id: 'croques',     nom: 'Croques',       photo: 'croque',    accroche: 'Le classique jambon-fromage.', menu: true },
    { id: 'tex-mex',     nom: 'Tex-Mex',       photo: 'texmex',    accroche: 'À grignoter ou à ajouter à votre menu. 3 pièces.' },
    { id: 'salades',     nom: 'Salades',       photo: 'salade',    accroche: 'Fraîches et complètes.' },
    { id: 'buckets',     nom: 'Buckets',       photo: 'bucket',    accroche: 'Format seau, à partager.' },
    { id: 'desserts',    nom: 'Desserts',      photo: 'dessert',   accroche: 'Pour finir en douceur.' },
    { id: 'boissons',    nom: 'Boissons',      photo: 'boisson',   accroche: 'Bien fraîches.' },
  ],

  /* ---------- Produits ----------
     prix   : prix seul           menu : prix en menu (+ frites + boisson)
     choix  : nombre de viandes au choix (ouvre un champ « viande(s) »)
     base   : pizza à base au choix
     tags   : 'n1' (n° 1 des ventes) · 'populaire' · 'vege' · 'maison'
     avis   : % de clients qui recommandent sur Uber Eats [pourcentage, nombre d'avis]
     photo  : photo dédiée (sinon celle de la catégorie)                                  */
  produits: [
    // Sandwichs
    { id: 'kebab',        cat: 'sandwichs', nom: 'Sandwich Kebab',          desc: 'Viande kebab, salade, tomates et oignons.', prix: 7.80, menu: 10.40, tags: ['n1'], photo: 'hero' },
    { id: 'touareg',      cat: 'sandwichs', nom: 'Sandwich Touareg',        desc: 'Steak de viande hachée, œuf, fromage, olives, oignons et tomates.', prix: 7.80, menu: 10.40, tags: ['maison'] },
    { id: 'americain',    cat: 'sandwichs', nom: 'Sandwich Américain',      desc: '2 steaks de 45 g, œuf et fromage.', prix: 9.10, menu: 10.40, tags: ['populaire'], photo: 'americain' },
    { id: 'chicken-curry',cat: 'sandwichs', nom: 'Sandwich Chicken Curry',  desc: 'Poulet mariné, sauce curry et fromage.', prix: 7.80, menu: 10.40, avis: [75, 4] },
    { id: 'paprika',      cat: 'sandwichs', nom: 'Sandwich Paprika',        desc: 'Poulet mariné, paprika et crème fraîche.', prix: 7.80, menu: 10.40 },
    { id: 'mixte',        cat: 'sandwichs', nom: 'Sandwich Mixte',          desc: '2 viandes au choix et fromage.', prix: 7.80, menu: 10.40, choix: 2, avis: [100, 3] },
    { id: 'cordon-bleu',  cat: 'sandwichs', nom: 'Sandwich Cordon Bleu',    desc: 'Poulet mariné, sauce curry et fromage.', prix: 6.50, menu: 8.45, tags: ['populaire'] },
    { id: 'double-croc',  cat: 'sandwichs', nom: 'Sandwich Double Croc',    desc: '2 steaks de 45 g, cordon bleu et fromage.', prix: 7.80, menu: 10.40 },
    { id: 'boursin',      cat: 'sandwichs', nom: 'Sandwich Boursin',        desc: 'Poulet mariné, sauce curry et fromage.', prix: 7.80, menu: 10.40 },
    { id: 'shempa',       cat: 'sandwichs', nom: 'Sandwich Shempa',         desc: 'Chicken, crème fraîche, fromage râpé et champignons.', prix: 7.80, menu: 10.40 },
    { id: 'kefta',        cat: 'sandwichs', nom: 'Sandwich Kefta',          desc: '2 steaks, viande hachée et fromage.', prix: 7.80, menu: 10.40 },
    { id: 'agneau',       cat: 'sandwichs', nom: 'Sandwich Brochette d’agneau', desc: 'Brochette d’agneau et fromage.', prix: 7.80, menu: 10.40 },
    { id: 'forma',        cat: 'sandwichs', nom: 'Sandwich Forma',          desc: 'Viande au choix, crème fraîche, fromage râpé, lardons, œuf et GPT.', prix: 9.10, menu: 11.05, choix: 1 },
    { id: 'zinger-rolo',  cat: 'sandwichs', nom: 'Sandwich Zinger Rolo',    desc: 'Pita, poulet pané croustillant, bacon de dinde, steak de 45 g, 1 GPT et fromage.', prix: 9.10, menu: 11.05 },
    { id: 'special',      cat: 'sandwichs', nom: 'Sandwich Spécial',        desc: 'Pita, viande marinée au choix, oignons frits, borcha et cordon bleu.', prix: 9.10, menu: 11.05, choix: 1 },

    // Tacos
    { id: 'tacos-l',      cat: 'tacos', nom: 'Tacos L',  desc: '1 viande au choix.',  prix: 9.10,  menu: 11.05, choix: 1, avis: [75, 4] },
    { id: 'tacos-xl',     cat: 'tacos', nom: 'Tacos XL', desc: '2 viandes au choix.', prix: 10.40, menu: 13.00, choix: 2, tags: ['populaire'], avis: [87, 8] },

    // Burgers
    { id: 'big-burger',        cat: 'burgers', nom: 'Big Burger',             desc: '1 steak de 180 g, 2 fromages, salade et tomates.', prix: 7.80,  menu: 10.40, tags: ['populaire'], avis: [80, 5] },
    { id: 'double-big-burger', cat: 'burgers', nom: 'Double Big Burger',      desc: '2 steaks de 180 g, 2 fromages, salade et tomates.', prix: 10.40, menu: 13.00, avis: [100, 3], photo: 'burger-dark' },
    { id: 'double-big-plus',   cat: 'burgers', nom: 'Double Big Burger Plus', desc: '2 steaks de 180 g, GPT, œuf et 2 fromages.', prix: 13.00, menu: 15.60 },
    { id: 'burger-maison',     cat: 'burgers', nom: 'Burger Maison',          desc: 'Steak de viande hachée 100 g, fromage, raclette, salade, tomates et oignons.', prix: 7.15, menu: 9.10, tags: ['maison'], photo: 'burger-2' },
    { id: 'cheese',            cat: 'burgers', nom: 'Cheeseburger',           desc: '1 steak et fromage.', prix: 3.90, menu: 7.15, tags: ['populaire'], photo: 'cheese' },
    { id: 'double-cheese',     cat: 'burgers', nom: 'Double Cheeseburger',    desc: '2 steaks et 2 fromages.', prix: 5.20, menu: 8.45, photo: 'cheese' },
    { id: 'chicken-burger',    cat: 'burgers', nom: 'Chicken Burger',         desc: 'Chicken pané et fromage.', prix: 5.20, menu: 7.80, photo: 'burger-2' },
    { id: 'zinger-burger',     cat: 'burgers', nom: 'Zinger Burger',          desc: 'Poulet pané croustillant et fromage.', prix: 5.85, menu: 8.45, avis: [100, 3], photo: 'burger-2' },
    { id: 'fish-burger',       cat: 'burgers', nom: 'Fish Burger',            desc: 'Poisson pané, salade, oignons et fromage.', prix: 4.55, menu: 7.15 },
    { id: 'burger-vege',       cat: 'burgers', nom: 'Burger Végétarien',      desc: 'Steak de pommes de terre, œuf et fromage.', prix: 5.20, menu: 7.80, tags: ['vege'] },

    // Pizzas (taille sénior)
    { id: 'pizza-3-viandes', cat: 'pizzas', nom: 'Pizza 3 Viandes',   desc: 'Base au choix, 3 viandes au choix et fromage.', prix: 9.75, base: true, choix: 3, tags: ['populaire'], avis: [100, 10] },
    { id: 'pizza-touareg',   cat: 'pizzas', nom: 'Pizza Touareg',     desc: 'Base au choix, fromage, poulet, sauce fromagère et pommes de terre.', prix: 9.75, base: true, tags: ['maison'], avis: [100, 3], photo: 'pizza-2' },
    { id: 'margherita',      cat: 'pizzas', nom: 'Pizza Margherita',  desc: 'Base au choix, fromage et oignons.', prix: 9.75, base: true, tags: ['populaire', 'vege'], photo: 'margherita' },
    { id: 'combine',         cat: 'pizzas', nom: 'Pizza Combiné',     desc: 'Base au choix, fromage, viande hachée, champignons et œuf.', prix: 9.75, base: true, avis: [100, 4], photo: 'pizza-2' },
    { id: 'orientale',       cat: 'pizzas', nom: 'Pizza Orientale',   desc: 'Base au choix, fromage, oignons, olives, merguez et œuf.', prix: 9.75, base: true },
    { id: 'saisons',         cat: 'pizzas', nom: 'Pizza Saisons',     desc: 'Base au choix, fromage, jambon de dinde, olives, poivrons et champignons.', prix: 9.75, base: true, photo: 'pizza-2' },
    { id: 'chevre-miel',     cat: 'pizzas', nom: 'Pizza Chèvre Miel', desc: 'Base au choix, fromage, chèvre et miel.', prix: 9.75, base: true, tags: ['vege'], avis: [100, 5] },
    { id: 'pizza-chicken',   cat: 'pizzas', nom: 'Pizza Chicken',     desc: 'Base au choix, fromage, chicken et pommes de terre.', prix: 9.75, base: true, avis: [87, 8], photo: 'pizza-2' },
    { id: 'pizza-saumon',    cat: 'pizzas', nom: 'Pizza Saumon',      desc: 'Base au choix, fromage, saumon et pommes de terre.', prix: 9.75, base: true, avis: [87, 8] },
    { id: 'pizza-thon',      cat: 'pizzas', nom: 'Pizza Thon',        desc: 'Base au choix, fromage, thon et olives.', prix: 9.75, base: true, photo: 'pizza-2' },
    { id: 'pizza-vege',      cat: 'pizzas', nom: 'Pizza Végétarienne',desc: 'Base au choix, fromage, olives, poivrons, champignons et oignons.', prix: 9.75, base: true, tags: ['vege'] },

    // Pizza turque
    { id: 'pizza-turque', cat: 'pizza-turque', nom: 'Pizza Turque', desc: 'Pâte fine façon turque, garniture et assaisonnement traditionnels.', prix: 5.85, menu: 7.80, tags: ['populaire'] },

    // Assiettes
    { id: 'assiette-classique', cat: 'assiettes', nom: 'Assiette Classique', desc: '1 viande au choix.',  prix: 13.00, choix: 1 },
    { id: 'assiette-mixte',     cat: 'assiettes', nom: 'Assiette Mixte',     desc: '4 viandes au choix.', prix: 14.30, choix: 4 },

    // Paninis
    { id: 'panini-thon',      cat: 'paninis', nom: 'Panini Thon',        desc: 'Panini pressé, garni de thon.', prix: 5.85, menu: 8.45, tags: ['populaire'] },
    { id: 'panini-viande',    cat: 'paninis', nom: 'Panini 1 Viande',    desc: '1 viande au choix.', prix: 5.85, menu: 8.45, choix: 1 },
    { id: 'panini-fromage',   cat: 'paninis', nom: 'Panini Fromage',     desc: 'Panini grillé, fromage fondu.', prix: 5.85, menu: 8.45, tags: ['vege'] },
    { id: 'panini-saumon',    cat: 'paninis', nom: 'Panini Saumon',      desc: 'Pain panini pressé, garni de saumon.', prix: 5.85, menu: 8.45 },
    { id: 'panini-bolognaise',cat: 'paninis', nom: 'Panini Bolognaise',  desc: 'Garni de sauce bolognaise, pain pressé et chaud.', prix: 5.85, menu: 8.45 },

    // Croques
    { id: 'croque-monsieur', cat: 'croques', nom: 'Croque Monsieur', desc: 'Pain de mie, jambon et fromage.', prix: 3.90, menu: 6.50, tags: ['populaire'] },

    // Tex-Mex
    { id: 'tenders',     cat: 'tex-mex', nom: 'Tenders',     desc: '3 pièces.', prix: 5.20 },
    { id: 'nuggets',     cat: 'tex-mex', nom: 'Nuggets',     desc: '3 pièces.', prix: 2.60 },
    { id: 'camembert',   cat: 'tex-mex', nom: 'Camembert',   desc: '3 pièces.', prix: 2.60, tags: ['populaire', 'vege'] },
    { id: 'jalapenos',   cat: 'tex-mex', nom: 'Jalapeños',   desc: '3 pièces.', prix: 3.90 },
    { id: 'onion-rings', cat: 'tex-mex', nom: 'Onion Rings', desc: '3 pièces.', prix: 2.60, tags: ['vege'] },

    // Salades
    { id: 'salade-cesar',   cat: 'salades', nom: 'Salade César',   desc: 'Salade, tomates, poulet frit, copeaux de fromage et maïs.', prix: 7.80 },
    { id: 'salade-nicoise', cat: 'salades', nom: 'Salade Niçoise', desc: 'Salade, tomates, olives, maïs et thon.', prix: 6.50 },
    { id: 'salade-mixte',   cat: 'salades', nom: 'Salade Mixte',   desc: 'Salade, tomates et olives.', prix: 5.20, tags: ['vege'] },

    // Buckets
    { id: 'bucket-frites',  cat: 'buckets', nom: 'Bucket Frites',  desc: 'Seau de frites, format à partager.', prix: 2.60 },
    { id: 'bucket-kebab',   cat: 'buckets', nom: 'Bucket Kebab',   desc: 'Viande kebab, format bucket.', prix: 9.10, photo: 'kebab' },
    { id: 'bucket-chicken', cat: 'buckets', nom: 'Bucket Chicken', desc: 'Morceaux de poulet servis en bucket, à partager.', prix: 9.10, photo: 'texmex' },

    // Desserts
    { id: 'tiramisu',      cat: 'desserts', nom: 'Tiramisu',      desc: 'Classique italien au café, biscuits imbibés et crème mascarpone, saupoudré de cacao.', prix: 3.90, avis: [85, 7] },
    { id: 'tarte-daim',    cat: 'desserts', nom: 'Tarte au Daim', desc: '', prix: 3.90, tags: ['populaire'] },

    // Boissons
    { id: 'coca',   cat: 'boissons', nom: 'Coca-Cola',      desc: '', prix: 1.95, avis: [83, 12] },
    { id: 'pepsi',  cat: 'boissons', nom: 'Pepsi',          desc: '', prix: 1.95 },
    { id: 'lipton', cat: 'boissons', nom: 'Lipton Ice Tea', desc: '', prix: 1.95, avis: [85, 7] },
  ],

  /* Grand bandeau rouge du haut (diaporama) */
  diaporama: [
    { id: 'kebab',             formule: 'menu', surtitre: 'Le n° 1 de la maison', titre: 'Menu Sandwich Kebab', texte: 'Viande kebab, salade, tomates et oignons. Servi avec frites et boisson.' },
    { id: 'tacos-xl',          formule: 'menu', surtitre: 'French tacos',          titre: 'Menu Tacos XL',       texte: '2 viandes au choix. Servi avec frites et boisson, pour les grosses faims.' },
    { id: 'double-big-burger', formule: 'seul', surtitre: '2 steaks de 180 g',     titre: 'Double Big Burger',   texte: '2 steaks de 180 g, 2 fromages, salade et tomates. À prendre seul ou en menu.' },
    { id: 'pizza-3-viandes',   formule: 'seul', surtitre: '100 % recommandée',     titre: 'Pizza 3 Viandes',     texte: 'Taille sénior, base et 3 viandes au choix. Recommandée par 100 % des clients Uber Eats qui l’ont notée.' },
  ],

  /* Plats mis en avant en haut de page (dans cet ordre) */
  incontournables: ['kebab', 'tacos-xl', 'pizza-3-viandes', 'big-burger', 'americain', 'pizza-turque'],
};
