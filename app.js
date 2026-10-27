/* ============ DATA ============ */
const CATEGORIES = [
  { id:'sandwiches', label:"Sandwichs" },
  { id:'menus-sandwiches', label:"Menus Sandwichs" },
  { id:'tacos', label:"Tacos" },
  { id:'menus-tacos', label:"Menus Tacos" },
  { id:'burgers', label:"Burgers" },
  { id:'menus-burgers', label:"Menus Burgers" },
  { id:'pizzas', label:"Pizzas" },
  { id:'assiettes', label:"Assiettes" },
  { id:'pizzas-turques', label:"Pizzas turques" },
  { id:'menus-pizzas-turques', label:"Menus Pizzas turques" },
  { id:'paninis', label:"Paninis" },
  { id:'menus-paninis', label:"Menus Paninis" },
  { id:'croques', label:"Croques" },
  { id:'menus-croques', label:"Menus Croques" },
  { id:'texmex', label:"Tex-Mex" },
  { id:'buckets', label:"Buckets" },
  { id:'salades', label:"Salades" },
  { id:'desserts', label:"Desserts" },
  { id:'boissons', label:"Boissons" },
];


/* Prix COMPTOIR (à emporter / sur place). Les prix relevés sur Uber Eats étaient
   tous des multiples de 0,65€, soit prix comptoir × 1,3 (ex. 7,80€ sur l'appli
   = 6,00€ ici) : ils ont été ramenés au prix comptoir. À faire valider par le
   restaurant. */
const PRODUCTS = [
  { id:1, name:"Menu Sandwich Kebab", desc:"Viande kebab, salade, tomates et oignons.", price:8.00, cat:'menus-sandwiches', menu:true },
  { id:2, name:"Menu Sandwich Chicken Curry", desc:"Poulet mariné, sauce curry et fromage.", price:8.00, cat:'menus-sandwiches', menu:true },
  { id:3, name:"Menu Sandwich Paprika", desc:"Poulet mariné, paprika et crème fraîche.", price:8.00, cat:'menus-sandwiches', menu:true },
  { id:4, name:"Menu Sandwich Mixte", desc:"2 viandes au choix et fromage.", price:8.00, cat:'menus-sandwiches', config:'v2', menu:true },
  { id:5, name:"Menu Sandwich Cordon Bleu", desc:"Poulet mariné, sauce curry et fromage.", price:6.50, cat:'menus-sandwiches', menu:true },
  { id:6, name:"Menu Sandwich Double Croc", desc:"2 steaks 45 g, cordon bleu et fromage.", price:8.00, cat:'menus-sandwiches', menu:true },
  { id:7, name:"Menu Sandwich Boursin", desc:"Poulet mariné, sauce curry et fromage.", price:8.00, cat:'menus-sandwiches', menu:true },
  { id:8, name:"Menu Sandwich Shempa", desc:"Chicken, crème fraîche, fromage râpé et champignons.", price:8.00, cat:'menus-sandwiches', menu:true },
  { id:9, name:"Menu Sandwich Touareg", desc:"Steak viande hachée, œuf, fromage, olives, oignons et tomates.", price:8.00, cat:'menus-sandwiches', menu:true },
  { id:10, name:"Menu Sandwich Kefta", desc:"2 steaks, viande hachée et fromage.", price:8.00, cat:'menus-sandwiches', menu:true },
  { id:11, name:"Menu Sandwich Brochette d'Agneau", desc:"Brochette d'agneau et fromage.", price:8.00, cat:'menus-sandwiches', menu:true },
  { id:12, name:"Menu Sandwich Américain", desc:"2 steaks 45 g, œuf et fromage.", price:8.00, cat:'menus-sandwiches', menu:true },
  { id:13, name:"Menu Sandwich Forma", desc:"Viande au choix, crème fraîche, fromage râpé, lardons, œuf et galette de pommes de terre.", price:8.50, cat:'menus-sandwiches', config:'v1', menu:true },
  { id:14, name:"Menu Sandwich Zinger Rolo", desc:"Pita poulet façon KFC, bacon de dinde, steak 45 g, 1 galette de pommes de terre et fromage.", price:8.50, cat:'menus-sandwiches', menu:true },
  { id:15, name:"Menu Sandwich Spécial", desc:"Pita, viande marinée au choix, oignons frits, borcha et cordon bleu.", price:8.50, cat:'menus-sandwiches', config:'v1', menu:true },
  { id:16, name:"Menu Panini Thon", desc:"Panini grillé garni de thon.", price:6.50, cat:'menus-paninis', menu:true },
  { id:17, name:"Menu Panini Fromage", desc:"Panini garni de fromage fondu.", price:6.50, cat:'menus-paninis', menu:true },
  { id:18, name:"Menu Panini Saumon", desc:"Panini garni de saumon.", price:6.50, cat:'menus-paninis', menu:true },
  { id:19, name:"Menu Panini Bolognaise", desc:"Panini garni de sauce bolognaise, pain pressé et chaud.", price:6.50, cat:'menus-paninis', menu:true },
  { id:20, name:"Menu Panini 1 Viande", desc:"Panini garni d’1 viande au choix. Formule menu.", price:6.50, cat:'menus-paninis', config:'v1', menu:true },
  { id:21, name:"Menu Tacos L", desc:"1 viande au choix.", price:8.50, cat:'menus-tacos', config:'v1', menu:true },
  { id:22, name:"Menu Tacos XL", desc:"2 viandes au choix.", price:10.00, cat:'menus-tacos', config:'v2', menu:true, popular:true },
  { id:23, name:"Menu Double Big Burger", desc:"2 steaks 180 g, 2 fromages, salade et tomates.", price:10.00, cat:'menus-burgers', menu:true },
  { id:24, name:"Menu Big Burger", desc:"1 steak 180 g, 2 fromages, salade et tomates.", price:8.00, cat:'menus-burgers', menu:true, popular:true },
  { id:25, name:"Menu Double Big Burger Plus", desc:"2 steaks 180 g, galette de pommes de terre, œuf et 2 fromages.", price:12.00, cat:'menus-burgers', menu:true },
  { id:26, name:"Menu Cheese Burger", desc:"1 steak et fromage.", price:5.50, cat:'menus-burgers', menu:true },
  { id:27, name:"Menu Double Cheeseburger", desc:"2 steaks et 2 fromages.", price:6.50, cat:'menus-burgers', menu:true },
  { id:28, name:"Menu Chicken Burger", desc:"Chicken pané et fromage.", price:6.00, cat:'menus-burgers', menu:true },
  { id:29, name:"Menu Zinger Burger", desc:"Poulet façon KFC et fromage.", price:6.50, cat:'menus-burgers', menu:true },
  { id:30, name:"Menu Fish Burger", desc:"Poisson pané, salade, oignons et fromage.", price:5.50, cat:'menus-burgers', menu:true },
  { id:31, name:"Menu Burger Maison", desc:"Steak viande hachée 100 g, fromage, raclette, salade, tomates et oignons.", price:7.00, cat:'menus-burgers', menu:true },
  { id:32, name:"Menu Burger Végétarien", desc:"Steak de pommes de terre, œuf et fromage.", price:6.00, cat:'menus-burgers', menu:true },
  { id:33, name:"Menu Pizza Turque", desc:"Spécialité turque de pâte garnie façon pizza. Formule menu.", price:6.00, cat:'menus-pizzas-turques', menu:true },
  { id:34, name:"Menu Croque Monsieur", desc:"Pain de mie, jambon et fromage.", price:5.00, cat:'menus-croques', menu:true },
  { id:35, name:"Nuggets", desc:"3 pièces.", price:2.00, cat:'texmex' },
  { id:36, name:"Tenders", desc:"3 pièces.", price:4.00, cat:'texmex', popular:true },
  { id:37, name:"Camembert", desc:"3 pièces.", price:2.00, cat:'texmex' },
  { id:38, name:"Jalapenos", desc:"3 pièces.", price:3.00, cat:'texmex' },
  { id:39, name:"Onion Rings", desc:"3 pièces.", price:2.00, cat:'texmex' },
  { id:40, name:"Salade César", desc:"Salade, tomates, poulet frit, copeaux de fromage et maïs.", price:6.00, cat:'salades' },
  { id:41, name:"Salade Niçoise", desc:"Salade, tomates, olives, maïs et thon.", price:5.00, cat:'salades' },
  { id:42, name:"Salade Mixte", desc:"Salade, tomates et olives.", price:4.00, cat:'salades' },
  { id:43, name:"Pizza Margherita", desc:"Base au choix, fromage et oignons. Taille sénior.", price:7.50, cat:'pizzas', base:true },
  { id:44, name:"Pizza Touareg", desc:"Base au choix, fromage, poulet, sauce fromagère et pommes de terre. Taille sénior.", price:7.50, cat:'pizzas', base:true },
  { id:45, name:"Pizza Combine", desc:"Base au choix, fromage, viande hachée, champignons et œuf. Taille sénior.", price:7.50, cat:'pizzas', base:true },
  { id:46, name:"Pizza Orientale", desc:"Base au choix, fromage, oignons, olives, merguez et œuf. Taille sénior.", price:7.50, cat:'pizzas', base:true, popular:true },
  { id:47, name:"Pizza Saisons", desc:"Base au choix, fromage, jambon dinde, olives, poivrons et champignons. Taille sénior.", price:7.50, cat:'pizzas', base:true },
  { id:48, name:"Pizza Végétarien", desc:"Base au choix, fromage, olives, poivrons, champignons et oignons. Taille sénior.", price:7.50, cat:'pizzas', base:true },
  { id:49, name:"Pizza Chèvre Miel", desc:"Base au choix, fromage, chèvre et miel. Taille sénior.", price:7.50, cat:'pizzas', base:true },
  { id:50, name:"Pizza Chicken", desc:"Base au choix, fromage, chicken et pommes de terre. Taille sénior.", price:7.50, cat:'pizzas', base:true },
  { id:51, name:"Pizza Saumon", desc:"Base au choix, fromage, saumon et pommes de terre. Taille sénior.", price:7.50, cat:'pizzas', base:true },
  { id:52, name:"Pizza Thon", desc:"Base au choix, fromage, thon et olives. Taille sénior.", price:7.50, cat:'pizzas', base:true },
  { id:53, name:"Pizza 3 Viandes", desc:"Base et 3 viandes au choix et fromage. Taille sénior.", price:7.50, cat:'pizzas', config:'pizza-3v', base:true, signature:true },
  { id:54, name:"Tacos L", desc:"1 viande au choix.", price:7.00, cat:'tacos', config:'v1' },
  { id:55, name:"Tacos XL", desc:"2 viandes au choix.", price:8.00, cat:'tacos', config:'v2', signature:true },
  { id:56, name:"Double Big Burger", desc:"2 steaks 180 g, 2 fromages, salade et tomates.", price:8.00, cat:'burgers' },
  { id:57, name:"Big Burger", desc:"1 steak 180 g, 2 fromages, salade et tomates.", price:6.00, cat:'burgers' },
  { id:58, name:"Double Big Burger Plus", desc:"2 steaks 180 g, galette de pommes de terre, œuf et 2 fromages.", price:10.00, cat:'burgers' },
  { id:59, name:"Cheese Burger", desc:"1 steak et fromage.", price:3.00, cat:'burgers' },
  { id:60, name:"Double Cheeseburger", desc:"2 steaks et 2 fromages.", price:4.00, cat:'burgers' },
  { id:61, name:"Chicken Burger", desc:"Chicken pané et fromage.", price:4.00, cat:'burgers' },
  { id:62, name:"Zinger Burger", desc:"Poulet façon KFC et fromage.", price:4.50, cat:'burgers' },
  { id:63, name:"Fish Burger", desc:"Poisson pané, salade, oignons et fromage.", price:3.50, cat:'burgers' },
  { id:64, name:"Burger Maison", desc:"Steak viande hachée 100 g, fromage, raclette, salade, tomates et oignons.", price:5.50, cat:'burgers' },
  { id:65, name:"Burger Végétarien", desc:"Steak de pommes de terre, œuf et fromage.", price:4.00, cat:'burgers' },
  { id:66, name:"Sandwich Chicken Curry", desc:"Poulet mariné, sauce curry et fromage.", price:6.00, cat:'sandwiches' },
  { id:67, name:"Sandwich Kebab", desc:"Viande kebab, salade, tomates et oignons.", price:6.00, cat:'sandwiches', popular:true },
  { id:68, name:"Sandwich Paprika", desc:"Poulet mariné, paprika et crème fraîche.", price:6.00, cat:'sandwiches' },
  { id:69, name:"Sandwich Mixte", desc:"2 viandes au choix et fromage.", price:6.00, cat:'sandwiches', config:'v2' },
  { id:70, name:"Sandwich Cordon Bleu", desc:"Poulet mariné, sauce curry et fromage.", price:5.00, cat:'sandwiches' },
  { id:71, name:"Sandwich Double Croc", desc:"2 steaks 45 g, cordon bleu et fromage.", price:6.00, cat:'sandwiches' },
  { id:72, name:"Sandwich Boursin", desc:"Poulet mariné, sauce curry et fromage.", price:6.00, cat:'sandwiches' },
  { id:73, name:"Sandwich Shempa", desc:"Chicken, crème fraîche, fromage râpé et champignons.", price:6.00, cat:'sandwiches' },
  { id:74, name:"Sandwich Touareg", desc:"Steak viande hachée, œuf, fromage, olives, oignons et tomates.", price:6.00, cat:'sandwiches', signature:true },
  { id:75, name:"Sandwich Kefta", desc:"2 steaks, viande hachée et fromage.", price:6.00, cat:'sandwiches' },
  { id:76, name:"Sandwich Brochette d'Agneau", desc:"Brochette d'agneau et fromage.", price:6.00, cat:'sandwiches' },
  { id:77, name:"Sandwich Américain", desc:"2 steaks 45 g, œuf et fromage.", price:7.00, cat:'sandwiches' },
  { id:78, name:"Sandwich Forma", desc:"Viande au choix, crème fraîche, fromage râpé, lardons, œuf et galette de pommes de terre.", price:7.00, cat:'sandwiches', config:'v1' },
  { id:79, name:"Sandwich Zinger Rolo", desc:"Pita poulet façon KFC, bacon de dinde, steak 45 g, 1 galette de pommes de terre et fromage.", price:7.00, cat:'sandwiches' },
  { id:80, name:"Sandwich Spécial", desc:"Pita, viande marinée au choix, oignons frits, borcha et cordon bleu.", price:7.00, cat:'sandwiches', config:'v1' },
  { id:81, name:"Assiette Classique", desc:"1 viande au choix.", price:10.00, cat:'assiettes', config:'v1' },
  { id:82, name:"Assiette Mixte", desc:"4 viandes au choix.", price:11.00, cat:'assiettes', config:'v4', popular:true },
  { id:83, name:"Pizza Turque", desc:"Pâte fine façon turque, garniture et assaisonnement traditionnels.", price:4.50, cat:'pizzas-turques' },
  { id:84, name:"Panini Thon", desc:"Panini pressé, garni de thon.", price:4.50, cat:'paninis' },
  { id:85, name:"Panini Fromage", desc:"Panini grillé, fromage fondu.", price:4.50, cat:'paninis' },
  { id:86, name:"Panini Saumon", desc:"Pain panini pressé garni de saumon.", price:4.50, cat:'paninis' },
  { id:87, name:"Panini Bolognaise", desc:"Panini garni de sauce bolognaise, pain pressé et chaud.", price:4.50, cat:'paninis' },
  { id:88, name:"Panini 1 Viande", desc:"1 viande au choix.", price:4.50, cat:'paninis', config:'v1' },
  { id:89, name:"Croque Monsieur", desc:"Sandwich chaud au jambon et fromage.", price:3.00, cat:'croques' },
  { id:90, name:"Bucket Frites", desc:"Seau de frites, format à partager.", price:2.00, cat:'buckets' },
  { id:91, name:"Bucket Kebab", desc:"Viande kebab, format bucket.", price:7.00, cat:'buckets' },
  { id:92, name:"Bucket Chicken", desc:"Morceaux de poulet servis en bucket, à partager.", price:7.00, cat:'buckets' },
  { id:93, name:"Tiramisu", desc:"Classique italien au café, biscuits imbibés et crème mascarpone, saupoudré de cacao.", price:3.00, cat:'desserts' },
  { id:94, name:"Tarte Au Daim", desc:"", price:3.00, cat:'desserts' },
  { id:95, name:"Pepsi", desc:"Boisson fraîche.", price:1.50, cat:'boissons' },
  { id:96, name:"Lipton Ice Tea", desc:"Boisson fraîche.", price:1.50, cat:'boissons' },
  { id:97, name:"Coca-Cola", desc:"Boisson fraîche.", price:1.50, cat:'boissons' },
];

/* Listes de choix — la carte dit « viande(s) au choix » sans les détailler : liste construite
   à partir des viandes citées dans la carte (à valider avec le restaurant). */
const VIANDES = ['Kebab','Poulet mariné','Steak haché','Cordon bleu','Brochette d\'agneau','Merguez','Chicken pané'];
const BOISSONS = ['Coca-Cola','Pepsi','Lipton Ice Tea','Sans boisson'];
/* Sauces de base, offertes — 2 au choix maximum */
const SAUCES = ['Fromagère maison','Sauce blanche','Harissa','Ketchup','Algérienne','Samouraï','Cocktail'];
/* Pizzas : « base au choix » */
const BASES = ['Tomate','Crème fraîche'];

const CONFIG_RULES = {
  'v1': { viandes:1, label:'1 viande au choix' },
  'v2': { viandes:2, label:'2 viandes au choix' },
  'v4': { viandes:4, label:'4 viandes au choix' },
  'pizza-3v': { viandes:3, label:'3 viandes au choix', sauces:false },
};


/* Horaires — ouvert tous les jours de 11h00 à 22h45 (heures décimales : 22.75 = 22h45). */
const HOURS_BY_DAY = [
  { day:0, open:11, close:22.75 }, // dimanche
  { day:1, open:11, close:22.75 }, // lundi
  { day:2, open:11, close:22.75 }, // mardi
  { day:3, open:11, close:22.75 }, // mercredi
  { day:4, open:11, close:22.75 }, // jeudi
  { day:5, open:11, close:22.75 }, // vendredi
  { day:6, open:11, close:22.75 }, // samedi
];
const DAY_NAMES = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
/* 22.75 -> « 22h45 » ; 24 -> « 00h00 » */
function fmtHour(n) {
  if (n >= 24) return '00h00';
  const h = Math.floor(n), m = Math.round((n - h) * 60);
  return h + 'h' + String(m).padStart(2, '0');
}

const WHATSAPP_NUMBER = SITE.whatsapp;
const PHONE_DISPLAY = SITE.phoneDisplay;
const RESTAURANT_NAME = SITE.name;
const ADDRESS = `${SITE.street}, ${SITE.postalCode} ${SITE.city}`;

/* ============ STATE ============ */
let cart = [];
let activeCategory = 'all';
let searchQuery = '';
let activeBudget = 'all'; // 'all' | 'lt5' | '5to8' | 'gt8'
let favorites = [];       // ids des plats favoris du client (localStorage)
let showOnlyFavs = false;
let stockOverrides = {};  // { [productId]: true } -> marqué en rupture par le vendeur aujourd'hui
let cfgCurrentProduct = null;
let cfgSelectedMeats = [];
let cfgSelectedSauces = [];
let cfgSelectedDrink = null;
let cfgSelectedBase = null;
let cfgQty = 1;

/* ============ UTILS ============ */
function euro(n) { return n.toFixed(2).replace('.', ',') + '€'; }
function getProduct(id) { return PRODUCTS.find(p => p.id === id); }
function getCategoryLabel(catId) { const c = CATEGORIES.find(c => c.id === catId); return c ? c.label : catId; }
function debounce(fn, ms) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; }

/* ============ PRODUCT CARD RENDER ============ */
/* Une photo par famille, uniquement quand elle montre vraiment le plat.
   Paninis, croques, assiettes, pizzas turques, salades et desserts n'ont pas
   encore de photo : plutôt qu'une image hors-sujet, ils restent sans photo
   dans la carte et prennent une tuile typographique dans le carrousel.
   Pour ajouter une vraie photo : déposer le fichier, créer la classe
   .vis-xxx dans le CSS et l'associer ici. */
const CAT_PHOTO = {
  'sandwiches':'kebab', 'menus-sandwiches':'kebab',
  'burgers':'burger', 'menus-burgers':'burger',
  'tacos':'wrap', 'menus-tacos':'wrap',
  'pizzas':'pizza',
  'texmex':'texmex', 'buckets':'texmex',
  'boissons':'drink',
};
function photoClassFor(p) {
  const key = CAT_PHOTO[p.cat];
  return key ? 'vis-' + key : '';
}

function productBadges(p, unavailable) {
  if (unavailable) return '<span class="product-badge badge-unavailable">Indisponible aujourd\'hui</span>';
  const b = [];
  if (p.signature) b.push('<span class="product-badge">Signature</span>');
  else if (p.popular) b.push('<span class="product-badge">Sélection</span>');
  if (p.menu) b.push('<span class="product-badge menu-badge">Frites + boisson</span>');
  return b.join('');
}

function productCardHTML(p, variant) {
  const unavailable = p.available === false || isOutOfStock(p.id);
  const isFav = favorites.includes(p.id);
  const favLabel = isFav ? 'Retirer des favoris' : 'Ajouter aux favoris';
  const addBtn = (cls) => unavailable
    ? `<button class="${cls}" disabled aria-label="${esc(p.name)} indisponible aujourd'hui" aria-disabled="true">—</button>`
    : `<button class="${cls}" data-add-id="${p.id}" aria-label="Ajouter ${esc(p.name)}">+</button>`;

  if (variant === 'pop') {
    const photo = photoClassFor(p);
    return `
    <div class="pop-card${unavailable ? ' is-unavailable' : ''}" data-id="${p.id}" tabindex="0" role="button" aria-label="Voir ${esc(p.name)}, ${euro(p.price)}">
      <div class="pop-card-vis ${photo || 'vis-none'}">
        ${photo ? '' : `<span class="vis-none-label">${esc(getCategoryLabel(p.cat))}</span>`}
        ${productBadges(p, unavailable)}
        <button class="vis-share-btn" data-share-id="${p.id}" aria-label="Partager ${esc(p.name)}" title="Partager ce plat"><svg class="icon"><use href="#i-share" xlink:href="#i-share"/></svg></button>
        <button class="vis-fav-btn${isFav ? ' is-fav' : ''}" data-fav-id="${p.id}" aria-label="${favLabel}" title="Favori"><svg class="icon"><use href="#i-heart" xlink:href="#i-heart"/></svg></button>
      </div>
      <div class="pop-body">
        <div class="pop-name">${esc(p.name)}</div>
        <div class="pop-desc">${esc(p.desc)}</div>
        <div class="pop-foot">
          <span class="pop-price">${euro(p.price)}</span>
          ${addBtn('pop-add')}
        </div>
      </div>
    </div>`;
  }

  /* Carte : ligne compacte sans photo (lisible, rapide, pas de répétition) */
  return `
    <div class="product-card${unavailable ? ' is-unavailable' : ''}" id="produit-${p.id}" data-id="${p.id}" tabindex="0" role="button" aria-label="Voir ${esc(p.name)}, ${euro(p.price)}">
      <div class="pc-main">
        <div class="pc-top"><span class="product-name">${esc(p.name)}</span>${productBadges(p, unavailable)}</div>
        ${p.desc ? `<p class="product-desc">${esc(p.desc)}</p>` : ''}
        <div class="pc-foot"><span class="product-price">${euro(p.price)}</span></div>
      </div>
      <div class="pc-side">
        <div class="pc-icons">
          <button class="pc-icon-btn" data-share-id="${p.id}" aria-label="Partager ${esc(p.name)}" title="Partager ce plat"><svg class="icon"><use href="#i-share" xlink:href="#i-share"/></svg></button>
          <button class="pc-icon-btn${isFav ? ' is-fav' : ''}" data-fav-id="${p.id}" aria-label="${favLabel}" title="Favori"><svg class="icon"><use href="#i-heart" xlink:href="#i-heart"/></svg></button>
        </div>
        ${addBtn('product-add')}
      </div>
    </div>`;
}

/* Vignette (panier, configurateur) : la photo de la famille si elle existe,
   sinon l'icône couverts. */
function thumbHTML(p, cls, id) {
  const photo = p ? photoClassFor(p) : '';
  const idAttr = id ? ` id="${id}"` : '';
  return photo
    ? `<div class="${cls} ${photo}"${idAttr} aria-hidden="true"></div>`
    : `<div class="${cls}"${idAttr} aria-hidden="true"><svg class="icon icon-lg"><use href="#i-utensils" xlink:href="#i-utensils"/></svg></div>`;
}

function renderPopulaires() {
  const el = document.getElementById('popScroller');
  const pops = PRODUCTS.filter(p => p.popular);
  el.innerHTML = pops.map(p => productCardHTML(p, 'pop')).join('');
}

function renderCatFilters() {
  const el = document.getElementById('catFilters');
  let html = `<button class="cat-chip ${activeCategory === 'all' && !showOnlyFavs ? 'active' : ''}" data-cat="all"><svg class="icon"><use href="#i-utensils" xlink:href="#i-utensils"/></svg> Tout voir</button>`;
  html += `<button class="cat-chip cat-chip-fav ${showOnlyFavs ? 'active' : ''}" id="favFilterChip" data-cat="favs"><svg class="icon"><use href="#i-heart" xlink:href="#i-heart"/></svg> Mes favoris <span id="favCount" class="fav-count">${favorites.length}</span></button>`;
  html += CATEGORIES.map(c => `<button class="cat-chip ${activeCategory === c.id && !showOnlyFavs ? 'active' : ''}" data-cat="${c.id}">${c.label}</button>`).join('');
  el.innerHTML = html;
  updateFavCount();
}

function resetFilters() {
  activeCategory = 'all';
  activeBudget = 'all';
  searchQuery = '';
  showOnlyFavs = false;
  const input = document.getElementById('searchInput');
  const box = document.getElementById('searchBox');
  if (input) input.value = '';
  if (box) box.classList.remove('has-val');
  renderCatFilters();
  document.querySelectorAll('.budget-chip').forEach(b => b.classList.toggle('active', b.dataset.budget === 'all'));
  renderMenuGrid();
}

function getFilteredProducts() {
  let list = PRODUCTS;
  if (showOnlyFavs) list = list.filter(p => favorites.includes(p.id));
  if (activeCategory !== 'all') list = list.filter(p => p.cat === activeCategory);
  if (activeBudget === 'lt5') list = list.filter(p => p.price < 5);
  else if (activeBudget === '5to8') list = list.filter(p => p.price >= 5 && p.price <= 8);
  else if (activeBudget === 'gt8') list = list.filter(p => p.price > 8);
  if (searchQuery.trim()) {
    const q = searchQuery.trim().toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
  }
  return list;
}

function renderMenuGrid() {
  const grid = document.getElementById('menuGrid');
  const info = document.getElementById('menuResultsInfo');
  const list = getFilteredProducts();

  if (list.length === 0) {
    if (showOnlyFavs) {
      grid.innerHTML = `<div class="no-results"><div class="no-results-emoji"><svg class="icon icon-xl"><use href="#i-heart" xlink:href="#i-heart"/></svg></div><p>Vous n'avez pas encore de favoris.<br>Touchez le cœur sur un plat pour l'ajouter ici.</p><button class="btn btn-outline" id="resetFiltersBtn" style="margin-top:1rem">Voir tout le menu</button></div>`;
    } else {
      grid.innerHTML = `<div class="no-results"><div class="no-results-emoji"><svg class="icon icon-xl"><use href="#i-search" xlink:href="#i-search"/></svg></div><p>Aucun plat ne correspond à votre recherche.</p><button class="btn btn-outline" id="resetFiltersBtn" style="margin-top:1rem">Réinitialiser les filtres</button></div>`;
    }
    info.textContent = '';
    return;
  }

  if (showOnlyFavs) {
    info.textContent = `${list.length} favori${list.length > 1 ? 's' : ''}`;
  } else if (searchQuery.trim() || activeCategory !== 'all') {
    info.textContent = `${list.length} plat${list.length > 1 ? 's' : ''} trouvé${list.length > 1 ? 's' : ''}`;
  } else {
    info.textContent = '';
  }

  if (showOnlyFavs || activeCategory !== 'all' || searchQuery.trim()) {
    grid.innerHTML = `<div class="product-grid">${list.map(p => productCardHTML(p, 'grid')).join('')}</div>`;
  } else {
    let html = '';
    CATEGORIES.forEach(c => {
      const items = list.filter(p => p.cat === c.id);
      if (items.length === 0) return;
      html += `<div class="menu-cat-group">
        <div class="menu-cat-title">${CAT_PHOTO[c.id] ? `<span class="mct-thumb vis-${CAT_PHOTO[c.id]}" aria-hidden="true"></span>` : ''}<span>${c.label}</span> <span class="mct-count">${items.length}</span>${c.id.startsWith('menus-') ? '<span class="mct-note">Frites + boisson inclus</span>' : ''}</div>
        <div class="product-grid">${items.map(p => productCardHTML(p, 'grid')).join('')}</div>
      </div>`;
    });
    grid.innerHTML = html;
  }
}

/* ============ REVIEWS ============ */
/* Aucun avis client n'est stocké en dur dans ce fichier : afficher des
   témoignages rédigés serait du faux contenu. La section renvoie vers les
   vraie fiche Google, où les avis sont publics et vérifiables.
   Si le restaurant souhaite afficher de vrais avis ici, ils doivent être
   recopiés depuis sa fiche Google avec l'accord de leurs auteurs. */
function renderReviews() {
  /* Rien à générer : la section avis est entièrement statique et pointe
     vers les plateformes d'avis réelles. Fonction conservée pour rester
     compatible avec l'ordre d'initialisation. */
}

/* ============ HOURS ============ */
function renderHoursTable() {
  const el = document.getElementById('hoursTable');
  const now = new Date();
  const today = now.getDay();
  /* Affichage du lundi au dimanche (convention française) */
  const week = [...HOURS_BY_DAY].sort((a, b) => ((a.day + 6) % 7) - ((b.day + 6) % 7));
  el.innerHTML = week.map(h => {
    const isToday = h.day === today;
    const timeLabel = h.open === h.close ? 'Fermé' : `${fmtHour(h.open)} – ${fmtHour(h.close)}`;
    return `<div class="hours-row ${isToday ? 'today' : ''}"><span class="hours-day">${DAY_NAMES[h.day]}${isToday ? " (aujourd'hui)" : ''}</span><span class="hours-time">${timeLabel}</span></div>`;
  }).join('');
}

function isOpenNow() {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours() + now.getMinutes() / 60;
  const today = HOURS_BY_DAY.find(h => h.day === day);
  if (!today) return false;
  return hour >= today.open && hour < today.close;
}

function updateOpenStatus() {
  const pill = document.getElementById('heroStatusPill');
  if (!pill) return;
  const open = isOpenNow();
  const now = new Date();
  const day = now.getDay();
  const today = HOURS_BY_DAY.find(h => h.day === day);
  pill.classList.remove('status-open', 'status-closed');
  if (open) {
    pill.classList.add('status-open');
    pill.innerHTML = `<span class="status-dot pulse"></span> Ouvert jusqu'à ${fmtHour(today.close)}`;
  } else {
    pill.classList.add('status-closed');
    pill.innerHTML = `<span class="status-dot"></span> Fermé · Ouvre à ${fmtHour(today.open)}`;
  }
}

/* ============ FAQ ============ */
const FAQ_ITEMS = [
  { q:`${SITE.name} est-il ouvert tous les jours ?`, a:"Consultez nos horaires dans la section « Infos & Accès » ci-dessous : ils sont mis à jour en direct et indiquent si le restaurant est ouvert en ce moment." },
  { q:`Comment commander chez ${SITE.name} à ${SITE.city} ?`, a:"Composez votre panier directement sur ce site, puis envoyez votre commande sur WhatsApp en un clic. Nous confirmons la disponibilité et le délai par message." },
  { q:"Comment puis-je payer ma commande ?", a:"Le règlement se fait sur place au moment de la prise en charge de votre commande. Titres-restaurant acceptés : UpDéjeuner, Bimpli (ex Apetiz), Pluxee, Swile et Ticket Restaurant®." },
  { q:`Où est situé ${SITE.name} ?`, a:`${SITE.street}, ${SITE.postalCode} ${SITE.city}.` },
  { q:"Puis-je me faire livrer ?", a: SITE.uberEatsUrl ? `Oui, la livraison est disponible via Uber Eats dans la zone couverte autour de ${SITE.city}. Pour une commande à emporter ou sur place, passez plutôt par ce site et WhatsApp.` : `Pour toute question sur la livraison, contactez-nous au ${SITE.phoneDisplay}.` },
  { q:"Puis-je connaître les allergènes d'un plat ?", a:`Oui. Les allergènes réglementaires (gluten, lait, œufs, fruits à coque, etc.) peuvent être présents dans nos préparations. Demandez-nous avant de commander : par téléphone au ${SITE.phoneDisplay} ou par message WhatsApp. Nous vous indiquerons les allergènes de chaque plat.` },
];
function renderFAQ() {
  const el = document.getElementById('faqList');
  el.innerHTML = FAQ_ITEMS.map((item, i) => `
    <div class="faq-item" data-idx="${i}">
      <button class="faq-q" data-faq-toggle="${i}" aria-expanded="false" aria-controls="faqA${i}">
        <span>${item.q}</span>
        <span class="faq-q-icon">+</span>
      </button>
      <div class="faq-a" id="faqA${i}" role="region">
        <div class="faq-a-inner">${item.a}</div>
      </div>
    </div>`).join('');
}


/* ============ CART ============ */
function loadCart() {
  try {
    const saved = localStorage.getItem(SITE.storageKey);
    if (saved) {
      cart = JSON.parse(saved);
      if (cart.length > 0) showToast('On a gardé votre panier de la dernière visite');
    }
  } catch (e) { cart = []; }
}
function saveCart() {
  try { localStorage.setItem(SITE.storageKey, JSON.stringify(cart)); } catch (e) {}
}

/* ============ FAVORIS CLIENT ============ */
function loadFavorites() {
  try {
    const saved = localStorage.getItem(SITE.favKey);
    favorites = saved ? JSON.parse(saved) : [];
  } catch (e) { favorites = []; }
}
function saveFavorites() {
  try { localStorage.setItem(SITE.favKey, JSON.stringify(favorites)); } catch (e) {}
}
function toggleFavorite(productId) {
  const idx = favorites.indexOf(productId);
  const wasFav = idx !== -1;
  if (wasFav) favorites.splice(idx, 1);
  else favorites.push(productId);
  saveFavorites();
  document.querySelectorAll(`[data-fav-id="${productId}"]`).forEach(btn => {
    btn.classList.toggle('is-fav', !wasFav);
    btn.classList.remove('pulse'); void btn.offsetWidth; btn.classList.add('pulse');
    btn.setAttribute('aria-label', wasFav ? 'Ajouter aux favoris' : 'Retirer des favoris');
  });
  updateFavCount();
  if (!wasFav) showToast(`${getProduct(productId)?.name || 'Plat'} ajouté aux favoris`);
  if (showOnlyFavs) renderMenuGrid();
}
function updateFavCount() {
  const el = document.getElementById('favCount');
  if (el) el.textContent = favorites.length;
  const chip = document.getElementById('favFilterChip');
  if (chip) chip.classList.toggle('has-items', favorites.length > 0);
}

/* ============ PANNEAU VENDEUR — ruptures du jour ============ */
function loadStockOverrides() {
  try {
    const saved = localStorage.getItem(SITE.stockKey);
    stockOverrides = saved ? JSON.parse(saved) : {};
  } catch (e) { stockOverrides = {}; }
}
function saveStockOverrides() {
  try { localStorage.setItem(SITE.stockKey, JSON.stringify(stockOverrides)); } catch (e) {}
}
function isOutOfStock(productId) { return !!stockOverrides[productId]; }
function toggleStock(productId) {
  if (stockOverrides[productId]) delete stockOverrides[productId];
  else stockOverrides[productId] = true;
  saveStockOverrides();
  renderMenuGrid();
  renderPopulaires();
  renderVendorPanelList();
}

/* ============ STATS VENDEUR — ajouts au panier du jour ============
   Compteur local et anonyme, remis à zéro chaque jour, pour aider
   l'équipe à repérer les plats qui partent bien aujourd'hui. */
function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
}
function loadAddStats() {
  try {
    const saved = JSON.parse(localStorage.getItem(SITE.statsKey) || 'null');
    if (!saved || saved.day !== todayKey()) return {};
    return saved.counts || {};
  } catch (e) { return {}; }
}
function bumpAddStat(productId) {
  try {
    const counts = loadAddStats();
    counts[productId] = (counts[productId] || 0) + 1;
    localStorage.setItem(SITE.statsKey, JSON.stringify({ day: todayKey(), counts }));
  } catch (e) {}
}

/* ============ DERNIÈRE COMMANDE — recommander en 1 clic ============ */
function saveLastOrder() {
  try {
    const snapshot = cart.map(i => ({ id:i.id, qty:i.qty, config:i.config, name:i.name, price:i.price, emoji:i.emoji }));
    localStorage.setItem(SITE.lastOrderKey, JSON.stringify(snapshot));
  } catch (e) {}
}
function loadLastOrder() {
  try {
    const saved = localStorage.getItem(SITE.lastOrderKey);
    return saved ? JSON.parse(saved) : null;
  } catch (e) { return null; }
}
function reorderLast() {
  const last = loadLastOrder();
  if (!last || !last.length) { showToast('Aucune commande précédente trouvée'); return; }
  last.forEach(item => {
    const key = item.config ? ('p' + item.id + '_' + item.config.replace(/\s+/g,'') + '_' + Date.now() + Math.random()) : ('p' + item.id);
    const existing = !item.config && cart.find(i => i.key === key);
    if (existing) existing.qty += item.qty;
    else cart.push({ key, id:item.id, name:item.name, price:item.price, emoji:item.emoji, qty:item.qty, config:item.config || null });
  });
  saveCart();
  renderCart();
  bumpCartBadges();
  openCart();
  showToast('Votre dernière commande a été ajoutée au panier');
}
function cartTotal() { return cart.reduce((sum, item) => sum + item.price * item.qty, 0); }
function cartCount() { return cart.reduce((sum, item) => sum + item.qty, 0); }

function addToCartSimple(productId) {
  const p = getProduct(productId);
  if (!p || p.available === false || isOutOfStock(productId)) return;
  const existing = cart.find(i => i.key === 'p' + productId);
  if (existing) { existing.qty++; }
  else { cart.push({ key:'p' + productId, id:productId, name:p.name, price:p.price, qty:1, config:null }); }
  saveCart();
  renderCart();
  bumpCartBadges();
  bumpAddStat(productId);
  flashAddButton(productId);
  showToast(`${p.name} ajouté au panier`);
}

function addToCartConfigured(product, meats, sauces, drink, qty, base) {
  const parts = [];
  if (base) parts.push('Base ' + base.toLowerCase());
  if (meats && meats.length) parts.push(meats.join(', '));
  if (sauces && sauces.length) parts.push('Sauces : ' + sauces.join(', '));
  if (drink) parts.push(drink);
  const configLabel = parts.join(' · ');
  const key = 'p' + product.id + '_' + configLabel.replace(/\s+/g,'') + '_' + Date.now();
  cart.push({ key, id:product.id, name:product.name, price:product.price, emoji:product.emoji, qty:qty, config:configLabel || null });
  saveCart();
  renderCart();
  bumpCartBadges();
  bumpAddStat(product.id);
  showToast(`${product.name} ajouté au panier`);
}

function updateCartQty(key, delta) {
  const item = cart.find(i => i.key === key);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.key !== key);
  saveCart();
  renderCart();
  bumpCartBadges();
}

function removeCartItem(key) {
  cart = cart.filter(i => i.key !== key);
  saveCart();
  renderCart();
  bumpCartBadges();
}

function flashAddButton(productId) {
  document.querySelectorAll(`[data-add-id="${productId}"]`).forEach(btn => {
    btn.classList.add('added');
    btn.textContent = '✓';
    setTimeout(() => { btn.classList.remove('added'); btn.textContent = '+'; }, 900);
  });
}

function bumpCartBadges() {
  const count = cartCount();
  const badge = document.getElementById('cartBadge');
  if (badge) badge.textContent = count;
  /* Barre panier en bas d'écran : visible dès le premier plat ajouté */
  document.body.classList.toggle('has-cart', count > 0);
  const barCount = document.getElementById('cartBarCount');
  const barTotal = document.getElementById('cartBarTotal');
  if (barCount) barCount.textContent = count;
  if (barTotal) barTotal.textContent = euro(cartTotal());
  const bar = document.getElementById('cartBar');
  if (bar && count > 0) { bar.classList.remove('bump'); void bar.offsetWidth; bar.classList.add('bump'); }
}

function renderCart() {
  const body = document.getElementById('cartBody');
  const footer = document.getElementById('cartFooter');
  if (cart.length === 0) {
    body.innerHTML = `<div class="cart-empty"><div class="cart-empty-icon"><svg class="icon"><use href="#i-cart" xlink:href="#i-cart"/></svg></div><div class="cart-empty-title">Panier vide</div><div class="cart-empty-sub">Ajoutez des plats depuis la carte pour commencer votre commande.</div></div>`;
    footer.style.display = 'none';
    bumpCartBadges();
    return;
  }
  footer.style.display = 'flex';
  body.innerHTML = `<div class="cart-items">${cart.map(item => `
    <div class="cart-item" data-key="${item.key}">
      ${thumbHTML(getProduct(item.id), 'cart-item-emoji')}
      <div class="cart-item-info">
        <div class="cart-item-name">${esc(item.name)}${item.config ? `<span class="cart-item-config">${esc(item.config)}</span>` : ''}</div>
        <div class="cart-item-price">${euro(item.price * item.qty)}</div>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn ${item.qty === 1 ? 'remove' : ''}" data-qty-key="${item.key}" data-delta="-1">${item.qty === 1 ? '<svg class="icon"><use href="#i-trash" xlink:href="#i-trash"/></svg>' : '−'}</button>
        <span class="qty-value">${item.qty}</span>
        <button class="qty-btn" data-qty-key="${item.key}" data-delta="1">+</button>
      </div>
    </div>`).join('')}</div>`;
  document.getElementById('cartTotalPrice').textContent = euro(cartTotal());
  bumpCartBadges();
}

function buildWhatsAppMessage() {
  const name = document.getElementById('custName').value.trim() || 'Client';
  const note = document.getElementById('custNote')?.value.trim() || '';
  let msg = `Bonjour ${RESTAURANT_NAME}\n\nJe souhaite passer commande (${name}) :\n\n`;
  cart.forEach(item => {
    msg += `• ${item.qty}x ${item.name}`;
    if (item.config) msg += ` (${item.config})`;
    msg += ` — ${euro(item.price * item.qty)}\n`;
  });
  msg += `\nTotal : ${euro(cartTotal())}\n`;
  if (note) msg += `\n⚠️ Remarque / allergie : ${note}\n`;
  msg += `\nMerci !`;
  return msg;
}

function sendWhatsAppOrder() {
  if (cart.length === 0) { showToast('Votre panier est vide'); return; }
  const msg = buildWhatsAppMessage();
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  saveLastOrder();
  window.open(url, '_blank');
}

function openCart() {
  document.getElementById('cartOverlay').classList.add('visible');
  document.getElementById('cartPanel').classList.add('open');
  document.body.classList.add('cart-open');
}
function closeCart() {
  document.getElementById('cartOverlay').classList.remove('visible');
  document.getElementById('cartPanel').classList.remove('open');
  document.body.classList.remove('cart-open');
}

/* ============ CONFIGURATOR ============ */
function openConfigurator(productId) {
  const p = getProduct(productId);
  if (!p || p.available === false) return;
  cfgCurrentProduct = p;
  cfgSelectedMeats = [];
  cfgSelectedSauces = [];
  cfgSelectedDrink = null;
  cfgSelectedBase = null;
  cfgQty = 1;

  document.getElementById('cfgEmoji').outerHTML = thumbHTML(p, 'cfg-header-emoji', 'cfgEmoji');
  document.getElementById('cfgName').textContent = p.name;
  document.getElementById('cfgPrice').textContent = euro(p.price);

  const rule = p.config ? CONFIG_RULES[p.config] : null;
  const meatList = (rule && rule.list) ? rule.list : VIANDES;
  let bodyHTML = '';

  if (p.base) {
    bodyHTML += `<div class="cfg-group">
      <div class="cfg-group-label"><span>Base au choix</span><span class="cfg-group-hint" id="baseHint">Non sélectionnée</span></div>
      <div class="cfg-options" id="baseOptions">
        ${BASES.map(b => `<button class="cfg-opt" data-base="${b}"><span class="cfg-opt-check"></span><span>${b}</span></button>`).join('')}
      </div>
    </div>`;
  }

  if (rule) {
    bodyHTML += `<div class="cfg-group">
      <div class="cfg-group-label"><span>${rule.label}</span><span class="cfg-group-hint" id="meatHint">0/${rule.viandes} sélectionnée${rule.viandes > 1 ? 's' : ''}</span></div>
      <div class="cfg-options" id="meatOptions">
        ${meatList.map(m => `<button class="cfg-opt" data-meat="${m}"><span class="cfg-opt-check"></span><span>${m}</span></button>`).join('')}
      </div>
    </div>`;
  }

  if (p.menu) {
    bodyHTML += `<div class="cfg-group">
      <div class="cfg-group-label"><span>Boisson incluse</span><span class="cfg-group-hint" id="drinkHint">Non sélectionnée</span></div>
      <div class="cfg-options" id="drinkOptions">
        ${BOISSONS.map(b => `<button class="cfg-opt" data-drink="${b}"><span class="cfg-opt-check"></span><span>${b}</span></button>`).join('')}
      </div>
    </div>`;
  }

  /* Sauces — offertes, 2 maximum. Proposées sur les plats configurables
     (sauf si la règle les exclut, ex. pizza 3 viandes). */
  if (rule && rule.sauces !== false) {
    bodyHTML += `<div class="cfg-group">
      <div class="cfg-group-label"><span>Sauces <em style="font-style:normal;color:var(--muted2);font-weight:600">(offertes)</em></span><span class="cfg-group-hint" id="sauceHint">0/2 sélectionnée</span></div>
      <div class="cfg-options" id="sauceOptions">
        ${SAUCES.map(s => `<button class="cfg-opt" data-sauce="${s}"><span class="cfg-opt-check"></span><span>${s}</span></button>`).join('')}
      </div>
    </div>`;
  }

  bodyHTML += `<div class="cfg-group">
    <div class="cfg-group-label"><span>Quantité</span></div>
    <div class="cfg-qty-row">
      <span class="cfg-qty-lbl">Nombre d'exemplaires</span>
      <div class="cfg-qty-controls">
        <button class="cfg-qty-btn" id="cfgQtyMinus">−</button>
        <span class="cfg-qty-val" id="cfgQtyVal">1</span>
        <button class="cfg-qty-btn" id="cfgQtyPlus">+</button>
      </div>
    </div>
  </div>`;

  document.getElementById('cfgBody').innerHTML = bodyHTML;
  updateCfgAddButton();
  bindConfiguratorEvents(rule);

  document.getElementById('cfgOverlay').classList.add('visible');
  document.getElementById('cfgSheet').classList.add('open');
  document.body.classList.add('cart-open');
}

function bindConfiguratorEvents(rule) {
  if (rule) {
    document.querySelectorAll('#meatOptions .cfg-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        const meat = btn.dataset.meat;
        const idx = cfgSelectedMeats.indexOf(meat);
        if (idx > -1) {
          cfgSelectedMeats.splice(idx, 1);
        } else {
          if (cfgSelectedMeats.length >= rule.viandes) cfgSelectedMeats.shift(); // remplace la plus ancienne (cap)
          cfgSelectedMeats.push(meat);
        }
        document.querySelectorAll('#meatOptions .cfg-opt').forEach(b => b.classList.toggle('selected', cfgSelectedMeats.includes(b.dataset.meat)));
        const hint = document.getElementById('meatHint');
        hint.textContent = `${cfgSelectedMeats.length}/${rule.viandes} sélectionnée${rule.viandes > 1 ? 's' : ''}`;
        hint.classList.toggle('ok', cfgSelectedMeats.length === rule.viandes);
        updateCfgAddButton();
      });
    });
  }
  const baseOpts = document.getElementById('baseOptions');
  if (baseOpts) {
    baseOpts.querySelectorAll('.cfg-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        cfgSelectedBase = btn.dataset.base;
        baseOpts.querySelectorAll('.cfg-opt').forEach(b => b.classList.toggle('selected', b.dataset.base === cfgSelectedBase));
        document.getElementById('baseHint').textContent = cfgSelectedBase;
        document.getElementById('baseHint').classList.add('ok');
        updateCfgAddButton();
      });
    });
  }
  const drinkOpts = document.getElementById('drinkOptions');
  if (drinkOpts) {
    drinkOpts.querySelectorAll('.cfg-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        cfgSelectedDrink = btn.dataset.drink;
        drinkOpts.querySelectorAll('.cfg-opt').forEach(b => b.classList.toggle('selected', b.dataset.drink === cfgSelectedDrink));
        document.getElementById('drinkHint').textContent = cfgSelectedDrink;
        document.getElementById('drinkHint').classList.add('ok');
        updateCfgAddButton();
      });
    });
  }
  /* Sauces — cap à 2 : au-delà, la plus ancienne est remplacée (même
     comportement que le cap des viandes ci-dessus). Les sauces sont
     facultatives : elles ne bloquent jamais l'ajout au panier. */
  const sauceOpts = document.getElementById('sauceOptions');
  if (sauceOpts) {
    sauceOpts.querySelectorAll('.cfg-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        const sauce = btn.dataset.sauce;
        const idx = cfgSelectedSauces.indexOf(sauce);
        if (idx > -1) {
          cfgSelectedSauces.splice(idx, 1);
        } else {
          if (cfgSelectedSauces.length >= 2) cfgSelectedSauces.shift();
          cfgSelectedSauces.push(sauce);
        }
        sauceOpts.querySelectorAll('.cfg-opt').forEach(b => b.classList.toggle('selected', cfgSelectedSauces.includes(b.dataset.sauce)));
        const sHint = document.getElementById('sauceHint');
        sHint.textContent = `${cfgSelectedSauces.length}/2 sélectionnée${cfgSelectedSauces.length > 1 ? 's' : ''}`;
        sHint.classList.toggle('ok', cfgSelectedSauces.length > 0);
      });
    });
  }
  document.getElementById('cfgQtyMinus').addEventListener('click', () => { if (cfgQty > 1) cfgQty--; document.getElementById('cfgQtyVal').textContent = cfgQty; updateCfgAddButton(); });
  document.getElementById('cfgQtyPlus').addEventListener('click', () => { if (cfgQty < 15) cfgQty++; document.getElementById('cfgQtyVal').textContent = cfgQty; updateCfgAddButton(); });
}

function isConfiguratorValid() {
  const p = cfgCurrentProduct;
  if (!p) return false;
  const rule = p.config ? CONFIG_RULES[p.config] : null;
  if (rule && cfgSelectedMeats.length !== rule.viandes) return false;
  if (p.menu && !cfgSelectedDrink) return false;
  if (p.base && !cfgSelectedBase) return false;
  return true;
}

function updateCfgAddButton() {
  const valid = isConfiguratorValid();
  const btn = document.getElementById('cfgAddBtn');
  btn.disabled = !valid;
  btn.style.opacity = valid ? '1' : '.5';
  btn.style.pointerEvents = valid ? 'auto' : 'none';
  const total = cfgCurrentProduct ? cfgCurrentProduct.price * cfgQty : 0;
  document.getElementById('cfgAddPrice').textContent = euro(total);
}

function closeConfigurator() {
  document.getElementById('cfgOverlay').classList.remove('visible');
  document.getElementById('cfgSheet').classList.remove('open');
  document.body.classList.remove('cart-open');
  cfgCurrentProduct = null;
}

function confirmConfiguratorAdd() {
  if (!isConfiguratorValid() || !cfgCurrentProduct) return;
  addToCartConfigured(cfgCurrentProduct, cfgSelectedMeats, cfgSelectedSauces, cfgSelectedDrink, cfgQty, cfgSelectedBase);
  closeConfigurator();
  openCart();
}

function handleProductClick(productId) {
  const p = getProduct(productId);
  if (!p || p.available === false) return;
  if (p.config || p.menu || p.base) { openConfigurator(productId); }
  else { addToCartSimple(productId); }
}

function shareProduct(productId) {
  const p = getProduct(productId);
  if (!p) return;
  const url = `${location.origin}${location.pathname}#produit-${p.id}`;
  const text = `${p.name} — ${euro(p.price)} chez ${SITE.name}`;
  if (navigator.share) {
    /* L'utilisateur peut annuler la feuille de partage native : ce n'est
       pas une erreur, juste un choix, donc on l'avale sans la logger. */
    navigator.share({ title: p.name, text, url }).catch(() => {});
    return;
  }
  /* Pas d'API de partage (desktop, navigateur ancien) : on copie le lien
     et on le confirme avec le toast déjà utilisé partout ailleurs. */
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url)
      .then(() => showToast('Lien du plat copié'))
      .catch(() => showToast('Impossible de copier le lien'));
  } else {
    showToast('Partage indisponible sur ce navigateur');
  }
}


/* ============ HEADER SCROLL ============ */
function initHeaderScroll() {
  const header = document.getElementById('header');
  const progress = document.getElementById('scrollProgress');
  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 40);
    /* Le bandeau d'annonce se replie au scroll : moins de hauteur figée en haut
       de l'écran, surtout sur mobile où la barre de recherche est collante. */
    document.documentElement.classList.toggle('is-scrolled', y > 40);
    if (progress) {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (docH > 0 ? (y / docH) * 100 : 0) + '%';
    }
    const toolbar = document.getElementById('menuToolbar');
    if (toolbar) {
      const rect = toolbar.getBoundingClientRect();
      toolbar.classList.toggle('stuck', rect.top <= header.offsetHeight + 40);
    }
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();
}

function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  function closeMobileNav() {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.classList.remove('menu-open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
  function openMobileNav() {
    hamburger.classList.add('open');
    mobileNav.classList.add('open');
    document.body.classList.add('menu-open');
    hamburger.setAttribute('aria-expanded', 'true');
  }
  hamburger.addEventListener('click', () => {
    if (mobileNav.classList.contains('open')) closeMobileNav(); else openMobileNav();
  });
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileNav));
  /* Fermeture au clic en dehors du panneau (point 40 du cahier des charges) */
  document.addEventListener('click', (e) => {
    if (!mobileNav.classList.contains('open')) return;
    if (mobileNav.contains(e.target) || hamburger.contains(e.target)) return;
    closeMobileNav();
  });
  /* Fermeture Escape, cohérente avec le panier/configurateur */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) closeMobileNav();
  });
}

function initAnnounceClose() {
  const btn = document.getElementById('announceClose');
  btn.addEventListener('click', () => document.documentElement.classList.add('no-announce'));
}

/* ============ REVEAL ON SCROLL ============ */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('visible')); return; }
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* Délai progressif par carte : les enfants directs consécutifs d'une même
     grille (produits, populaires, avis...) se révèlent en cascade plutôt
     que tous d'un coup. Calculé une fois par groupe de frères "reveal". */
  if (!reduced) {
    const seen = new Set();
    els.forEach(el => {
      const parent = el.parentElement;
      if (!parent || seen.has(parent)) return;
      seen.add(parent);
      const siblings = Array.from(parent.children).filter(c => c.classList.contains('reveal'));
      siblings.forEach((sib, i) => { sib.style.transitionDelay = Math.min(i * 60, 360) + 'ms'; });
    });
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold:0.12, rootMargin:'0px 0px -40px 0px' });
  els.forEach(el => observer.observe(el));
}



/* ============ FAQ TOGGLE ============ */
function initFAQ() {
  document.getElementById('faqList').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-faq-toggle]');
    if (!btn) return;
    const idx = btn.dataset.faqToggle;
    const item = btn.closest('.faq-item');
    const answer = document.getElementById('faqA' + idx);
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(other => {
      if (other !== item) {
        other.classList.remove('open');
        other.querySelector('.faq-a').style.maxHeight = null;
        other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      }
    });
    if (isOpen) {
      item.classList.remove('open'); answer.style.maxHeight = null;
      btn.setAttribute('aria-expanded', 'false');
    } else {
      item.classList.add('open'); answer.style.maxHeight = answer.scrollHeight + 'px';
      btn.setAttribute('aria-expanded', 'true');
    }
  });
}

/* ============ RETOUR AU TOUCHER (TACTILE) ============
   Sur écran tactile il n'y a pas de survol. Au lieu de simuler un curseur qui
   bouge pendant le scroll (source d'effets instables), on donne simplement un
   retour visuel bref sur l'élément touché : la classe .mobile-hover, déjà
   câblée à côté de chaque :hover dans le CSS, est posée puis retirée. */
function initMobileHover() {
  const isTouch = !window.matchMedia('(hover: hover)').matches || 'ontouchstart' in window;
  if (!isTouch) return;
  const HOVERABLE = '.btn, .pop-card, .pop-add, .cat-chip, .budget-chip, .product-card, .product-add, ' +
    '.classique-card, .faq-q, .review-platform, .qty-btn, .cfg-opt, .footer-links a, .fab-cart, .fab-uber';
  document.addEventListener('touchstart', (e) => {
    const target = e.target.closest(HOVERABLE);
    if (!target) return;
    target.classList.add('mobile-hover');
    setTimeout(() => target.classList.remove('mobile-hover'), 350);
  }, { passive:true });
}

/* ============ EVENT DELEGATION ============ */
function initDelegatedEvents() {
  document.body.addEventListener('click', (e) => {
    const addBtn = e.target.closest('[data-add-id]');
    if (addBtn) { handleProductClick(parseInt(addBtn.dataset.addId, 10)); return; }

    const shareBtn = e.target.closest('[data-share-id]');
    if (shareBtn) { shareProduct(parseInt(shareBtn.dataset.shareId, 10)); return; }

    const favBtn = e.target.closest('[data-fav-id]');
    if (favBtn) { toggleFavorite(parseInt(favBtn.dataset.favId, 10)); return; }

    const card = e.target.closest('.product-card, .pop-card, .classique-card');
    if (card && !e.target.closest('[data-add-id]') && !e.target.closest('[data-share-id]') && !e.target.closest('[data-fav-id]')) { handleProductClick(parseInt(card.dataset.id, 10)); return; }

    const catChip = e.target.closest('[data-cat]');
    if (catChip) {
      if (catChip.dataset.cat === 'favs') {
        showOnlyFavs = !showOnlyFavs;
        if (showOnlyFavs) activeCategory = 'all';
      } else {
        showOnlyFavs = false;
        activeCategory = catChip.dataset.cat;
      }
      renderCatFilters();
      renderMenuGrid();
      return;
    }

    const budgetChip = e.target.closest('[data-budget]');
    if (budgetChip) {
      activeBudget = budgetChip.dataset.budget;
      document.querySelectorAll('.budget-chip').forEach(b => b.classList.toggle('active', b.dataset.budget === activeBudget));
      renderMenuGrid();
      return;
    }

    if (e.target.closest('#resetFiltersBtn')) { resetFilters(); return; }

    const qtyBtn = e.target.closest('[data-qty-key]');
    if (qtyBtn) { updateCartQty(qtyBtn.dataset.qtyKey, parseInt(qtyBtn.dataset.delta, 10)); return; }
  });

  document.getElementById('cartBtn').addEventListener('click', (e) => { e.preventDefault(); openCart(); });
  document.getElementById('cartBar').addEventListener('click', openCart);
  /* Flèches du carrousel (desktop) */
  document.querySelectorAll('[data-pop-scroll]').forEach(btn => btn.addEventListener('click', () => {
    const sc = document.getElementById('popScroller');
    sc.scrollBy({ left: parseInt(btn.dataset.popScroll, 10) * Math.max(280, sc.clientWidth * .8), behavior: 'smooth' });
  }));
  document.getElementById('cartClose').addEventListener('click', closeCart);
  document.getElementById('cartOverlay').addEventListener('click', closeCart);
  document.getElementById('sendWaBtn').addEventListener('click', sendWhatsAppOrder);

  document.getElementById('cfgClose').addEventListener('click', closeConfigurator);
  document.getElementById('cfgOverlay').addEventListener('click', closeConfigurator);
  document.getElementById('cfgAddBtn').addEventListener('click', confirmConfiguratorAdd);

  const heroWaBtn = document.getElementById('heroWaBtn');
  if (heroWaBtn) heroWaBtn.addEventListener('click', (e) => { e.preventDefault(); if (cart.length > 0) sendWhatsAppOrder(); else openCart(); });
  const footerWaLink = document.getElementById('footerWaLink');
  if (footerWaLink) footerWaLink.addEventListener('click', (e) => { e.preventDefault(); if (cart.length > 0) sendWhatsAppOrder(); else openCart(); });

  const searchInput = document.getElementById('searchInput');
  const searchBox = document.getElementById('searchBox');
  const searchClear = document.getElementById('searchClear');
  const onSearch = debounce(() => {
    searchQuery = searchInput.value;
    searchBox.classList.toggle('has-val', searchQuery.length > 0);
    renderMenuGrid();
  }, 200);
  searchInput.addEventListener('input', onSearch);
  searchClear.addEventListener('click', () => { searchInput.value = ''; searchQuery = ''; searchBox.classList.remove('has-val'); renderMenuGrid(); });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeCart(); closeConfigurator(); }
    /* Cartes produit/populaires/classiques : de vrais <div role="button">, donc
       le navigateur n'active pas nativement Entrée/Espace dessus (contrairement
       à un <button>). On reproduit le même comportement que le clic. */
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('.product-card, .pop-card, .classique-card');
      if (card) { e.preventDefault(); handleProductClick(parseInt(card.dataset.id, 10)); }
    }
  });
}

/* ============ TOAST ============ */
function showToast(msg, duration = 2600) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), duration);
}






/* ============ APPLICATION DE LA CONFIG (SITE) ============ */
const esc = (t) => String(t == null ? '' : t).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const todo = (v) => /^\[.*\]$/.test(String(v || '').trim()) ? `<span class="legal-todo">${esc(v)}</span>` : esc(v);

function applySiteConfig() {
  const fullAddr = `${SITE.street}, ${SITE.postalCode} ${SITE.city}`;
  const mapsQuery = encodeURIComponent(`${SITE.street} ${SITE.postalCode} ${SITE.city}`).replace(/%20/g, '+');
  const mapsDir = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;
  const mapsSearch = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.name + ' ' + SITE.street + ' ' + SITE.postalCode + ' ' + SITE.city)}`;

  /* Titre & meta */
  document.title = `${SITE.name} | ${SITE.tagline} — ${SITE.city} (${SITE.postalCode})`;
  const setMeta = (sel, val) => { const m = document.querySelector(sel); if (m) m.setAttribute('content', val); };
  const desc = `${SITE.name} à ${SITE.city} : ${SITE.tagline}. Commandez à emporter via WhatsApp${SITE.uberEatsUrl ? ' ou faites-vous livrer avec Uber Eats' : ''}.`;
  setMeta('meta[name="description"]', desc);
  setMeta('meta[name="keywords"]', `${SITE.name} ${SITE.city},${SITE.cuisine.map(c => c.toLowerCase() + ' ' + SITE.city).join(',')}`);
  setMeta('meta[property="og:title"]', `${SITE.name} | ${SITE.tagline} — ${SITE.city}`);
  setMeta('meta[property="og:description"]', `Commandez via WhatsApp, on prépare. ${SITE.name}, ${SITE.city}.`);
  if (SITE.domain) {
    const root = SITE.domain.replace(/\/$/, '') + '/';
    let canon = document.querySelector('link[rel="canonical"]');
    if (!canon) { canon = document.createElement('link'); canon.rel = 'canonical'; document.head.appendChild(canon); }
    canon.href = root;
    const ensureMeta = (prop, val) => { let m = document.querySelector(`meta[property="${prop}"]`); if (!m) { m = document.createElement('meta'); m.setAttribute('property', prop); document.head.appendChild(m); } m.setAttribute('content', val); };
    ensureMeta('og:url', root);
    ensureMeta('og:image', root + 'og-image.jpg');
  }
  if (SITE.demoMode) setMeta('meta[name="robots"]', 'noindex,nofollow');   // pas d'indexation tant que c'est une démo

  /* Textes marqués data-site */
  document.querySelectorAll('[data-site="name"]').forEach(el => el.textContent = SITE.name);
  document.querySelectorAll('[data-site="city"]').forEach(el => el.textContent = SITE.city);

  /* Téléphone */
  document.querySelectorAll('a[href^="tel:"]:not([data-phone2])').forEach(a => {
    a.setAttribute('href', 'tel:' + SITE.phone);
    const t = a.querySelector('.btn-phone-txt'); if (t) t.textContent = SITE.phoneDisplay;
    else if (!a.querySelector('*:not(svg):not(use)') || a.classList.contains('mobile-phone-link')) {
      const svg = a.querySelector('svg'); a.textContent = ''; if (svg) a.appendChild(svg); a.append(' ' + SITE.phoneDisplay);
    } else if (a.children.length === 0) a.textContent = SITE.phoneDisplay;
  });

  /* Second numéro (fixe) — masqué si non renseigné */
  document.querySelectorAll('a[data-phone2]').forEach(a => {
    if (SITE.phone2) { a.setAttribute('href', 'tel:' + SITE.phone2); a.textContent = SITE.phone2Display; }
    else (a.closest('.loc-row-sub-line') || a).style.display = 'none';
  });

  /* Adresse & cartes */
  document.querySelectorAll('a[href*="google.com/maps/dir"]').forEach(a => a.href = mapsDir);
  document.querySelectorAll('a[href*="google.com/maps/search"]').forEach(a => a.href = mapsSearch);
  document.querySelectorAll('[data-loc="address"]').forEach(el => { el.innerHTML = `${esc(SITE.street)}<br/>${esc(SITE.postalCode)} ${esc(SITE.city)}`; });
  document.querySelectorAll('.section-eyebrow').forEach(el => { if (el.querySelector('use[href="#i-pin"]')) { const svg = el.querySelector('svg'); el.textContent = ''; el.appendChild(svg); el.append(' ' + SITE.street); } });
  document.querySelectorAll('.trust-title').forEach(el => { if (/Montereau/i.test(el.textContent)) { el.textContent = SITE.city; const sub = el.parentElement.querySelector('.trust-sub'); if (sub) sub.textContent = SITE.street; } });
  document.querySelectorAll('.hero-pill').forEach(el => { if (/Montereau/i.test(el.textContent)) { const svg = el.querySelector('svg'); el.textContent = ''; if (svg) el.appendChild(svg); el.append(' ' + SITE.city); } });
  const footerAddr = document.querySelector('.footer-links a[href*="google.com/maps"]'); if (footerAddr) footerAddr.textContent = `${SITE.street}, ${SITE.postalCode}`;

  /* Uber Eats */
  document.querySelectorAll('a[href*="ubereats.com"]').forEach(a => {
    if (SITE.uberEatsUrl) a.href = SITE.uberEatsUrl;
    else (a.closest('[data-uber-block], .review-platform, .btn, li, .trust-item') || a).style.display = 'none';
  });

  /* Note Google (hero, section avis) — masquée si non renseignée */
  const hasRating = !!(SITE.googleRating && SITE.googleRating.value);
  document.querySelectorAll('[data-rating-block]').forEach(el => { el.hidden = !hasRating; });
  if (hasRating) {
    document.querySelectorAll('[data-rating="value"]').forEach(el => el.textContent = String(SITE.googleRating.value).replace('.', ','));
    document.querySelectorAll('[data-rating="count"]').forEach(el => el.textContent = SITE.googleRating.count);
  }

  /* Prix affichés en dur dans la page : toujours lus depuis PRODUCTS */
  document.querySelectorAll('[data-price-of]').forEach(el => {
    const p = getProduct(parseInt(el.dataset.priceOf, 10));
    if (p) el.textContent = euro(p.price);
  });

  /* Logo (header, footer) */
  document.querySelectorAll('.logo-le').forEach(el => { el.textContent = SITE.logoLe; if (!SITE.logoLe) el.style.display = 'none'; });
  document.querySelectorAll('.logo-name').forEach(el => {
    el.innerHTML = esc(SITE.logoName) + (SITE.logoAccent ? `<em style="color:var(--flame);font-style:normal">${esc(SITE.logoAccent)}</em>` : '');
  });

  /* Compteurs dynamiques (nombre de plats / familles) */
  document.querySelectorAll('[data-n="products"]').forEach(el => el.textContent = PRODUCTS.length);
  document.querySelectorAll('[data-n="cats"]').forEach(el => el.textContent = CATEGORIES.length);

  /* Note Google — affichée uniquement si renseignée dans SITE.googleRating */
  const gr = document.getElementById('googleRatingBadge');
  if (gr && SITE.googleRating && SITE.googleRating.value) { gr.hidden = false; gr.textContent = `${String(SITE.googleRating.value).replace('.', ',')} ★ · ${SITE.googleRating.count}+ avis`; }
  const fdesc = document.querySelector('.footer-brand-desc'); if (fdesc) fdesc.textContent = `${SITE.tagline} à ${SITE.city}. Commande à emporter via WhatsApp${SITE.uberEatsUrl ? ', livraison via Uber Eats' : ''}.`;
  const iframe = document.querySelector('.map-embed iframe'); if (iframe) iframe.title = 'Localisation ' + SITE.name;

  /* Mode démo */
  const demo = document.getElementById('demoNotice'); if (demo) demo.hidden = !SITE.demoMode;

  /* Google Maps : chargé uniquement après consentement */
  window.__mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(fullAddr)}&output=embed`;
  updateMapConsent();

  /* Données structurées (JSON-LD) régénérées */
  const old = document.querySelector('script[type="application/ld+json"]'); 
  document.querySelectorAll('script[type="application/ld+json"]').forEach(x => x.remove());
  const dayMap = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const pad = n => { if (n >= 24) return '23:59'; const h = Math.floor(n), m = Math.round((n - h) * 60); return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0'); };
  const ld = {
    '@context':'https://schema.org', '@type':'FastFoodRestaurant', name:SITE.name, ...(SITE.domain ? { url:SITE.domain } : {}),
    address:{ '@type':'PostalAddress', streetAddress:SITE.street, addressLocality:SITE.city, postalCode:SITE.postalCode, addressCountry:'FR' },
    telephone:SITE.phone, servesCuisine:SITE.cuisine, priceRange:SITE.priceRange,
    openingHoursSpecification: HOURS_BY_DAY.map(h => ({ '@type':'OpeningHoursSpecification', dayOfWeek:dayMap[h.day], opens:pad(h.open), closes:pad(h.close) }))
  };
  /* La note Google n'est publiée que si elle est renseignée ET réelle */
  if (SITE.googleRating && SITE.googleRating.value && SITE.googleRating.count) {
    ld.aggregateRating = { '@type':'AggregateRating', ratingValue:SITE.googleRating.value, reviewCount:String(SITE.googleRating.count).replace(/\D/g, ''), bestRating:'5' };
  }
  const tag = document.createElement('script'); tag.type = 'application/ld+json'; tag.textContent = JSON.stringify(ld);
  document.head.appendChild(tag);
  /* FAQPage généré depuis la FAQ visible : les deux restent toujours identiques */
  if (typeof FAQ_ITEMS !== 'undefined') {
    const faqTag = document.createElement('script'); faqTag.type = 'application/ld+json';
    faqTag.textContent = JSON.stringify({ '@context':'https://schema.org', '@type':'FAQPage', mainEntity: FAQ_ITEMS.map(i => ({ '@type':'Question', name:i.q, acceptedAnswer:{ '@type':'Answer', text:i.a } })) });
    document.head.appendChild(faqTag);
  }
}

/* ============ COOKIES / CONSENTEMENT GOOGLE MAPS ============ */
const CONSENT_KEY = 'site_maps_consent';
function getConsent() { try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; } }
function setConsent(v) { try { localStorage.setItem(CONSENT_KEY, v); } catch (e) {} }

function updateMapConsent() {
  const box = document.querySelector('.map-embed'); if (!box) return;
  const consent = getConsent();
  if (consent === 'yes') {
    if (!box.querySelector('iframe[data-loaded]')) {
      box.innerHTML = `<iframe data-loaded="1" src="${window.__mapSrc}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Localisation ${esc(SITE.name)}"></iframe>`;
    }
  } else {
    box.innerHTML = `<div class="map-placeholder">
      <p>La carte Google Maps n'est chargée qu'avec votre accord.</p>
      <button class="btn btn-primary" data-map-accept>Afficher la carte</button>
      <a class="btn" href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(SITE.street + ' ' + SITE.postalCode + ' ' + SITE.city)}" target="_blank" rel="noopener" style="color:#f5efe4;text-decoration:underline">Ouvrir dans Google Maps</a>
    </div>`;
  }
}
function initCookies() {
  const banner = document.getElementById('cookieBanner');
  const hide = () => banner.classList.remove('show');
  if (getConsent() === null) setTimeout(() => banner.classList.add('show'), 900);
  document.getElementById('cookieAccept').addEventListener('click', () => { setConsent('yes'); hide(); updateMapConsent(); });
  document.getElementById('cookieRefuse').addEventListener('click', () => { setConsent('no'); hide(); updateMapConsent(); });
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-cookie-settings]')) { e.preventDefault(); banner.classList.add('show'); }
    if (e.target.closest('[data-map-accept]')) { setConsent('yes'); updateMapConsent(); }
  });
}

/* ============ PAGES LÉGALES ============ */
function legalContent(type) {
  const L = SITE.legal, fullAddr = `${SITE.street}, ${SITE.postalCode} ${SITE.city}`;
  if (type === 'mentions') return { title:'Mentions légales', html: `
    <h3>Éditeur du site</h3>
    <p><strong>${todo(L.companyName)}</strong>${L.legalForm ? ', ' + todo(L.legalForm) : ''}${L.capital ? ', au capital de ' + todo(L.capital) : ''}.<br/>
    Nom commercial : ${esc(SITE.name)}<br/>Siège / établissement : ${esc(fullAddr)}<br/>
    SIRET : ${todo(L.siret)}${L.rcs ? '<br/>' + todo(L.rcs) : ''}${L.tva ? '<br/>N° TVA intracommunautaire : ' + esc(L.tva) : ''}<br/>
    Téléphone : <a href="tel:${esc(SITE.phone)}">${esc(SITE.phoneDisplay)}</a><br/>E-mail : ${todo(L.contactEmail)}</p>
    <h3>Responsable de la publication</h3><p>${todo(L.publisher)}</p>
    <h3>Hébergement</h3><p>${todo(L.host)}<br/>${todo(L.hostAddress)}${L.hostUrl ? '<br/><a href="' + esc(L.hostUrl) + '" target="_blank" rel="noopener">' + esc(L.hostUrl) + '</a>' : ''}</p>
    <h3>Propriété intellectuelle</h3><p>Les textes, images, logos et éléments graphiques de ce site sont la propriété de ${esc(SITE.name)} ou de leurs auteurs respectifs. Toute reproduction sans autorisation est interdite.</p>
    <h3>Commandes et prix</h3><p>Les prix sont indiqués en euros, toutes taxes comprises. Une commande envoyée via WhatsApp n'est définitive qu'après confirmation du restaurant. Le règlement s'effectue sur place lors du retrait.</p>
    <h3>Médiation de la consommation</h3><p>Conformément à l'article L.612-1 du Code de la consommation, le client peut recourir gratuitement à un médiateur de la consommation en cas de litige non résolu. Médiateur : <span class="legal-todo">[à compléter — à désigner par le restaurant]</span></p>
    ${L.creditLine ? '<h3>Crédits</h3><p>' + esc(L.creditLine) + '</p>' : ''}` };

  if (type === 'confidentialite') return { title:'Confidentialité & cookies', html: `
    <h3>Responsable du traitement</h3><p>${todo(L.companyName)} — ${esc(SITE.name)}, ${esc(fullAddr)}. Contact : ${todo(L.contactEmail)}</p>
    <h3>Données collectées</h3>
    <ul><li><strong>Prénom</strong> : saisi dans le panier pour identifier votre commande. Il n'est pas enregistré sur un serveur : il est simplement transmis dans le message WhatsApp que vous envoyez.</li>
    <li><strong>Panier</strong> : conservé uniquement dans votre navigateur (stockage local) pour ne pas le perdre si vous rechargez la page. Aucune donnée n'est envoyée à un serveur.</li>
    <li><strong>WhatsApp</strong> : lorsque vous envoyez votre commande, votre numéro et votre message sont traités par WhatsApp (Meta) selon leur propre politique, puis reçus par le restaurant pour préparer la commande.</li></ul>
    <h3>Finalité et base légale</h3><p>Ces données servent uniquement à préparer et confirmer votre commande (exécution d'une demande de votre part). Elles ne sont ni vendues ni utilisées à des fins publicitaires.</p>
    <h3>Cookies et services tiers</h3>
    <p><strong>Google Maps</strong> : le plan d'accès n'est chargé qu'après votre accord. Google peut alors déposer des cookies et recevoir votre adresse IP. Vous pouvez retirer votre choix à tout moment via « Cookies » en bas de page.</p>
    <p>Ce site n'utilise aucun cookie publicitaire ni outil de mesure d'audience.</p>
    <h3>Durée de conservation</h3><p>Panier et choix de consentement : conservés dans votre navigateur jusqu'à suppression par vos soins. Messages WhatsApp : conservés par le restaurant le temps nécessaire au traitement de la commande.</p>
    <h3>Vos droits</h3><p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition et de limitation. Pour l'exercer : ${todo(L.contactEmail)}. Vous pouvez aussi introduire une réclamation auprès de la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener">cnil.fr</a>).</p>` };

  if (type === 'allergenes') return { title:'Allergènes', html: `
    <p>La réglementation européenne impose d'informer sur la présence des <strong>14 allergènes à déclaration obligatoire</strong> :</p>
    <ul><li>Céréales contenant du gluten (blé, seigle, orge, avoine…)</li><li>Crustacés</li><li>Œufs</li><li>Poissons</li><li>Arachides</li><li>Soja</li><li>Lait (y compris lactose)</li><li>Fruits à coque (amandes, noisettes, noix…)</li><li>Céleri</li><li>Moutarde</li><li>Graines de sésame</li><li>Anhydride sulfureux et sulfites</li><li>Lupin</li><li>Mollusques</li></ul>
    <p>Nos plats sont préparés dans une cuisine où plusieurs de ces allergènes sont manipulés : des <strong>traces</strong> sont possibles, même si un plat ne les contient pas dans sa recette.</p>
    <h3>Vous êtes allergique ?</h3>
    <p>Avant de commander, <strong>dites-le-nous</strong> : appelez le <a href="tel:${esc(SITE.phone)}">${esc(SITE.phoneDisplay)}</a> ou précisez-le dans votre message WhatsApp. Nous vous indiquerons les allergènes présents dans chaque plat.</p>` };
  return { title:'', html:'' };
}
function openLegal(type) {
  const c = legalContent(type);
  document.getElementById('legalTitle').textContent = c.title;
  document.getElementById('legalBody').innerHTML = c.html;
  document.getElementById('legalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('legalBody').scrollTop = 0;
}
function closeLegal() {
  document.getElementById('legalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}
function initLegal() {
  document.addEventListener('click', (e) => {
    const l = e.target.closest('[data-legal]');
    if (l) { e.preventDefault(); openLegal(l.dataset.legal); }
  });
  document.getElementById('legalClose').addEventListener('click', closeLegal);
  document.getElementById('legalOverlay').addEventListener('click', (e) => { if (e.target.id === 'legalOverlay') closeLegal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLegal(); });
}

/* ============ PANNEAU ÉQUIPE — gestion des ruptures du jour ============
   Petit code PIN pour éviter qu'un client ne bascule les plats par erreur
   en tombant sur le lien. Le code n'est jamais stocké ni transmis en clair :
   seul son empreinte SHA-256 (SITE.vendorPinHash) vit dans ce fichier, donc
   personne ne peut lire le PIN réel en ouvrant le code source. Attention
   cependant : ce n'est pas une sécurité forte pour autant — tout tourne
   côté navigateur dans un site 100% statique, donc quelqu'un qui saurait
   manipuler la console du navigateur pourrait toujours contourner cette
   vérification. C'est un garde-fou pratique contre les erreurs et les
   curieux, pas un coffre-fort. Pour changer le code, voir l'instruction
   juste au-dessus de vendorPinHash dans SITE. */
async function hashPin(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('');
}
function renderVendorPanelList() {
  const list = document.getElementById('vendorList');
  if (!list) return;
  const stats = loadAddStats();
  const sorted = [...PRODUCTS].sort((a, b) => (stats[b.id] || 0) - (stats[a.id] || 0));
  list.innerHTML = sorted.map(p => {
    const catLabel = CATEGORIES.find(c => c.id === p.cat)?.label || '';
    const out = isOutOfStock(p.id);
    const count = stats[p.id] || 0;
    return `<button type="button" class="vendor-item${out ? ' is-out' : ''}" data-vendor-toggle="${p.id}">
      <span><span class="vendor-item-name">${esc(p.name)}</span><br><span class="vendor-item-cat">${esc(catLabel)}${count ? ` · ${count} ajout${count > 1 ? 's' : ''} au panier aujourd'hui` : ''}</span></span>
      <span class="vendor-toggle" aria-hidden="true"></span>
    </button>`;
  }).join('');
}
function openVendorPanel() {
  const unlocked = sessionStorage.getItem('touareg_vendor_unlocked') === '1';
  document.getElementById('vendorGate').hidden = unlocked;
  document.getElementById('vendorContent').hidden = !unlocked;
  if (unlocked) renderVendorPanelList();
  document.getElementById('vendorOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeVendorPanel() {
  document.getElementById('vendorOverlay').classList.remove('open');
  document.body.style.overflow = '';
}
function initVendorPanel() {
  const link = document.getElementById('vendorPanelLink');
  if (link) link.addEventListener('click', (e) => { e.preventDefault(); openVendorPanel(); });
  const closeBtn = document.getElementById('vendorClose');
  if (closeBtn) closeBtn.addEventListener('click', closeVendorPanel);
  const overlay = document.getElementById('vendorOverlay');
  if (overlay) overlay.addEventListener('click', (e) => { if (e.target.id === 'vendorOverlay') closeVendorPanel(); });

  const form = document.getElementById('vendorPinForm');
  if (form) form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.getElementById('vendorPinInput');
    const err = document.getElementById('vendorPinError');
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;
    const enteredHash = await hashPin(input.value.trim());
    if (submitBtn) submitBtn.disabled = false;
    if (enteredHash === SITE.vendorPinHash) {
      sessionStorage.setItem('touareg_vendor_unlocked', '1');
      err.hidden = true;
      document.getElementById('vendorGate').hidden = true;
      document.getElementById('vendorContent').hidden = false;
      renderVendorPanelList();
    } else {
      err.hidden = false;
      input.value = '';
      input.focus();
    }
  });

  const list = document.getElementById('vendorList');
  if (list) list.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-vendor-toggle]');
    if (btn) toggleStock(parseInt(btn.dataset.vendorToggle, 10));
  });

  const resetBtn = document.getElementById('vendorResetAll');
  if (resetBtn) resetBtn.addEventListener('click', () => {
    stockOverrides = {};
    saveStockOverrides();
    renderMenuGrid();
    renderPopulaires();
    renderVendorPanelList();
    showToast('Tous les plats sont de nouveau disponibles');
  });
}

/* ============ REPRENDRE LA DERNIÈRE COMMANDE ============ */
function initReorderButton() {
  const btn = document.getElementById('reorderBtn');
  if (!btn) return;
  const last = loadLastOrder();
  if (last && last.length) {
    btn.hidden = false;
    btn.addEventListener('click', reorderLast);
  }
}

/* ============ LIEN PARTAGÉ — #produit-12 ============
   Le bouton « Partager » génère un lien vers un plat précis : à l'ouverture,
   on fait défiler jusqu'au plat et on le met en évidence. */
function openSharedProduct() {
  const m = /^#produit-(\d+)$/.exec(location.hash);
  if (!m) return;
  const card = document.getElementById('produit-' + m[1]);
  if (!card) return;
  setTimeout(() => {
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    card.classList.add('is-target');
    setTimeout(() => card.classList.remove('is-target'), 2600);
  }, 350);
}

/* ============ FOOTER — ANNÉE DYNAMIQUE ============ */
function initYear() {
  const el = document.getElementById('currentYear');
  if (el) el.textContent = new Date().getFullYear();
}

/* ============ INIT ============
   safeInit isole chaque module : si l'un échoue, il logge l'erreur en
   console et les autres continuent normalement (point 50 du cahier des
   charges). Ordre calqué sur le brief (point 51), adapté aux fonctions
   réellement présentes dans ce fichier. */
function safeInit(fn, label) {
  try { fn(); } catch (e) { console.error('[' + SITE.name + ']', label || fn.name, 'error:', e); }
}

function initApp() {
  safeInit(applySiteConfig, 'Site config');
  safeInit(initLegal, 'Legal');
  safeInit(initCookies, 'Cookies');
  safeInit(initYear, 'Year');
  safeInit(initAnnounceClose, 'Announcement');
  safeInit(initHeaderScroll, 'Header scroll');
  safeInit(updateOpenStatus, 'Open status');
  safeInit(loadCart, 'Cart load');
  safeInit(loadFavorites, 'Favorites load');
  safeInit(loadStockOverrides, 'Stock overrides load');
  safeInit(renderPopulaires, 'Populaires render');
  safeInit(renderCatFilters, 'Filters render');
  safeInit(renderMenuGrid, 'Menu grid render');
  safeInit(renderReviews, 'Reviews render');
  safeInit(renderHoursTable, 'Hours render');
  safeInit(renderFAQ, 'FAQ render');
  safeInit(renderCart, 'Cart render');
  safeInit(initReveal, 'Reveal');
  safeInit(initMobileNav, 'Mobile nav');
  safeInit(initFAQ, 'FAQ toggle');
  safeInit(initMobileHover, 'Mobile hover');
  safeInit(initDelegatedEvents, 'Delegated events');
  safeInit(initVendorPanel, 'Vendor panel');
  safeInit(initReorderButton, 'Reorder button');
  safeInit(openSharedProduct, 'Shared product');
  requestAnimationFrame(() => document.querySelector('.hero').classList.add('hero-loaded'));
}

document.addEventListener('DOMContentLoaded', initApp);
