# Le Touareg · site internet

Site statique (HTML, CSS et JavaScript, sans outil de build), prêt pour GitHub Pages.

## Structure

```
index.html                        page principale
mentions-legales.html             mentions légales
politique-de-confidentialite.html RGPD : données, durées, droits, cookies
cgu.html                          conditions d'utilisation et de commande
404.html                          page « introuvable » personnalisée
sitemap.xml, robots.txt           référencement
js/consentement.js                bannière cookies, mesure d'audience, e-mail protégé
js/donnees.js           ⟵ LE fichier à modifier : réglages, horaires, carte, prix
js/site.js              moteur (panier, fiche plat, commande WhatsApp, horaires)
assets/css/site.css     design
assets/fonts/           polices hébergées sur le site (pas d'appel à Google)
assets/img/cut/         plats détourés (fond transparent), 2 tailles : -420 et -840
assets/img/             photo de la section horaires, icônes, image de partage
```

## Conception « mobile first »

La feuille de style part du téléphone, puis ajoute la tablette (768 px) et l'ordinateur (1024 px). Sur mobile et tablette, une barre de navigation en bas de l'écran (Accueil, Carte, Panier, Appeler, Infos) remplace le menu du haut. Les filtres de la carte restent collés sous l'en-tête, et tous les boutons font au moins 44 px pour le doigt. Le téléphone charge les images en version légère (420 px).

## Modifier le site

- **Un prix, un plat, une description** : `js/donnees.js`, tableau `produits`.
- **Le grand bandeau rouge (diaporama)** : `diaporama` en bas de `js/donnees.js` (plat, titre, texte, prix seul ou menu).
- **Les horaires** : `reglages.horaires`. Plusieurs créneaux par jour sont possibles. Le statut « Ouvert / Fermé » et les heures de retrait se calculent seuls, à l'heure de Paris.
  Les horaires sont aussi écrits en dur dans les données Google en haut de `index.html` : pense à les changer aussi.
- **Afficher les prix comptoir** : `reglages.diviseurPrix: 1.3` (voir le point 1 ci-dessous).
- **Remplacer une photo** : déposer `nom-420.webp` et `nom-840.webp` (fond transparent) dans `assets/img/cut/`, avec le même nom que l'existante.

## Après chaque modification du style ou des scripts

Changer le numéro de version `?v=...` dans les balises qui chargent `site.css` et les fichiers `js/` (dans toutes les pages `.html`). Sans ça, certains téléphones gardent l'ancien style en mémoire jusqu'à 10 minutes.

## Mise en ligne (GitHub Pages)

1. Déposer tout le contenu de ce dossier à la racine d'un dépôt.
2. Settings → Pages → Branch `main`, dossier `/ (root)`.
3. Si un nom de domaine est acheté, remplacer `https://convert-web.github.io/Touareg/` dans `index.html` (balises og, canonical, données Google).

## Points à faire valider par le gérant avant la mise en ligne

1. **Prix.** Les prix fournis sont ceux d'Uber Eats. Ils valent tous exactement le prix comptoir × 1,3 (7,80 € = 6,00 × 1,3). Le site affiche aujourd'hui les prix Uber Eats. Si le gérant veut afficher ses prix comptoir, il suffit de mettre `diviseurPrix: 1.3`.
2. **Menu = frites + boisson** et **boissons du menu** (Coca-Cola, Pepsi, Lipton Ice Tea) : à confirmer.
3. **Descriptions en double** : les sandwichs Cordon Bleu et Boursin reprennent la description du Chicken Curry (« Poulet mariné, sauce curry et fromage »). C'est sans doute une erreur de recopie sur Uber Eats.
4. **« Borcha »** (Sandwich Spécial) : mot inconnu, laissé tel quel. **« GPT »** a été expliqué « galette de pomme de terre » : à confirmer.
5. **« Façon KFC »** a été remplacé par « poulet pané croustillant » (Zinger Burger, Zinger Rolo), pour ne pas utiliser une marque déposée.
6. **Corrections de saisie** : « Assiette classiue » → « Assiette Classique », « Pizza combine » → « Pizza Combiné ».
7. **WhatsApp** : les commandes partent vers le 06 73 82 78 21. Vérifier que ce numéro a bien WhatsApp et que quelqu'un le surveille pendant le service.
8. **Titres-restaurant** : la liste vient d'Uber Eats. Vérifier qu'ils sont aussi acceptés au comptoir.
9. **Horaires** 7j/7 de 11h à 22h45 : repris d'Uber Eats, à confirmer pour le comptoir.
10. **Mentions légales** : société L'ATLAS (SARL), SIREN 511 649 568, gérant Kalam Dewan, d'après le registre officiel (recherche-entreprises.api.gouv.fr). Restent à compléter : capital social, greffe RCS, n° de TVA, médiateur de la consommation.
11. **Allergènes** : le site indique « liste disponible au comptoir ». Le restaurant doit pouvoir la fournir par écrit (obligation légale).
12. **Photos** : ce sont des photos d'illustration libres de droits (Unsplash), détourées. De vraies photos des plats du Touareg, prises sur fond uni, rendront le site encore plus fort.
13. **Maquette WhatsApp** (bandeau jaune) : la réponse « C'est noté, à 19h45 ! » montre au client qu'on lui répond. Conseiller au gérant de confirmer chaque commande reçue.

## Qualité, sécurité, conformité

- **HTTPS** : forcé par GitHub Pages (redirection 301 de http vers https, en-tête HSTS d'un an). Chaque page ajoute aussi `upgrade-insecure-requests` et une politique de sécurité (CSP) qui n'autorise que les fichiers du site et GoatCounter.
- **Aucune clé d'API ni secret** dans le code : le site est 100 % statique, sans base de données ni appel d'API.
- **Bannière cookies** : « Accepter » et « Refuser » au même niveau, choix gardé 6 mois, lien « Gérer les cookies » en pied de page. Le site ne dépose aucun cookie.
- **Formulaires** : champs obligatoires vérifiés avec message d'erreur sous le champ (prénom, viandes, base de pizza).
- **Anti-spam** : champ piège invisible, délai minimum de 3 s avant l'envoi, une commande par minute au maximum, adresse e-mail jamais écrite en clair dans le code.
- **Images** : WebP compressées en 4 tailles (160, 420, 600, 840 px), dimensions déclarées, texte alternatif sur chaque image utile.

### Activer la mesure d'audience (5 minutes, gratuit)
1. Créer un compte sur https://www.goatcounter.com (choisir un code, par ex. `letouareg`).
2. Dans `js/donnees.js`, mettre ce code : `analytics: { goatcounter: 'letouareg' }`.
3. Les statistiques apparaissent sur https://letouareg.goatcounter.com, dont l'événement `commande-whatsapp` à chaque commande envoyée.

### Limite de l'adresse github.io
Les moteurs de recherche ne lisent le `robots.txt` qu'à la racine d'un domaine. Sur `convert-web.github.io/Touareg/`, il n'est donc pas lu. Il le sera dès qu'un nom de domaine (ex. `le-touareg.fr`) sera relié au site. En attendant, déclarer `sitemap.xml` dans Google Search Console.

## Fonctions qui font vendre

- **Passer en menu en un geste** : dans le panier, chaque plat pris seul propose le menu (frites + boisson) avec le supplément exact.
- **Suggestions selon la commande** : boisson s'il n'y en a pas, puis dessert, puis accompagnement.
- **« Comme la dernière fois ? »** : la dernière commande envoyée est gardée dans le navigateur du client et se recommande en un geste (en haut de la carte et dans le panier vide).
- **Prix comptoir** : les prix de `js/donnees.js` sont ceux d'Uber Eats (prix comptoir × 1,3). Mettre `diviseurPrix: 1.3` affiche les prix comptoir partout, et le panier montre alors « Vous économisez X € par rapport à la livraison Uber Eats ». À activer seulement après accord du gérant sur ses prix comptoir.
- **Mesure des ventes** (si GoatCounter est activé) : ajout-panier, ouverture-panier, passage-menu, recommander, commande-whatsapp, appel, uber-eats, itineraire, avis-google.
- **Questions fréquentes** : section visible et données structurées FAQ pour Google (à tenir à jour avec le texte affiché).

## Photos des plats

- `assets/img/plats/<id>-160|420|600|840.webp` : une photo détourée par plat (l'`id` est celui de `js/donnees.js`). Un plat qui a sa photo ici l'utilise automatiquement ; sinon il prend la photo de son rayon (`assets/img/cut/`).
- Pour ajouter ou remplacer une photo : déposer les 4 tailles avec le même nom, puis ajouter ou mettre à jour ses dimensions (version 420) dans `PLATS`, en haut de `js/site.js`.
- Les photos actuelles sont générées par IA (photos d'illustration). Les remplacer par de vraies photos du restaurant reste le mieux pour vendre.
