# Le Touareg : à valider avec le gérant avant la mise en ligne

1. **Prix comptoir.** Sur Uber Eats, tous les prix sont des multiples de 0,65 €, soit le prix comptoir × 1,3. Le site affiche donc les prix comptoir (ex. sandwich kebab 6,00 € au lieu de 7,80 €). À faire confirmer. Les prix se modifient dans `app.js`, tableau `PRODUCTS`.
2. **Descriptions en double.** Sandwich Cordon Bleu et Sandwich Boursin (et leurs menus) ont la même description que le Chicken Curry : « Poulet mariné, sauce curry et fromage ». C'est probablement une erreur de recopie.
3. **Liste des viandes au choix** : Kebab, Poulet mariné, Steak haché, Cordon bleu, Brochette d'agneau, Merguez, Chicken pané. Elle a été déduite de la carte.
4. **Liste des sauces** (7) et **bases pizza** (Tomate, Crème fraîche) : à confirmer.
5. **Note Google 4,2 / 180 avis** : à vérifier sur la fiche Google. Sinon, mettre `googleRating: null`, et le bloc disparaît.
6. **Plats mis en avant** (« Sélection ») : Sandwich Kebab, Menu Big Burger, Menu Tacos XL, Pizza Orientale, Tenders, Assiette Mixte. Demander au gérant ses vrais best-sellers (`popular:true` dans `app.js`).
7. **Mentions légales.** Ces infos ont été trouvées sur le registre officiel : SARL L'ATLAS, SIRET 511 649 568 00017, gérant Kalam Dewan. Restent à compléter : capital social, greffe RCS (Melun ?) et médiateur de la consommation.
8. **Photos.** Ce sont des photos d'illustration. Les vraies photos du restaurant feront encore monter la valeur perçue. Paninis, croques, assiettes, salades et desserts n'ont pas encore de photo.
9. **Code équipe** (ruptures du jour) : 2026.
