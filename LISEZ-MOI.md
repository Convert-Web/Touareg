# Le Touareg · site internet

Site statique (HTML, CSS et JavaScript, sans outil de build), prêt pour GitHub Pages.

## Structure

```
index.html              page principale
mentions-legales.html   mentions légales et données personnelles
js/donnees.js           ⟵ LE fichier à modifier : réglages, horaires, carte, prix
js/site.js              moteur (panier, fiche plat, commande WhatsApp, horaires)
assets/css/site.css     design
assets/fonts/           polices hébergées sur le site (pas d'appel à Google)
assets/img/cut/         plats détourés (fond transparent), 2 tailles : -420 et -840
assets/img/             photo de la section horaires, icônes, image de partage
```

## Modifier le site

- **Un prix, un plat, une description** : `js/donnees.js`, tableau `produits`.
- **Le grand bandeau rouge (diaporama)** : `diaporama` en bas de `js/donnees.js` (plat, titre, texte, prix seul ou menu).
- **Les horaires** : `reglages.horaires`. Plusieurs créneaux par jour sont possibles. Le statut « Ouvert / Fermé » et les heures de retrait se calculent seuls, à l'heure de Paris.
  Les horaires sont aussi écrits en dur dans les données Google en haut de `index.html` : pense à les changer aussi.
- **Afficher les prix comptoir** : `reglages.diviseurPrix: 1.3` (voir le point 1 ci-dessous).
- **Remplacer une photo** : déposer `nom-420.webp` et `nom-840.webp` (fond transparent) dans `assets/img/cut/`, avec le même nom que l'existante.

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
