# Photos des plats (outil interne)

- `suivi.json` : plats déjà photographiés (identifiant de l'image dans Canva) et plats restants. Design Canva de travail : « Touareg – photos carte ».
- `prompts-restants.json` : description envoyée à l'IA de Canva pour chaque plat restant (format 4:3, fond blanc).
- `detourer.py` : détoure les PNG HD exportés de Canva et produit les WebP 160/420/600/840.
- `integrer.py` : copie les WebP dans `assets/img/plats/` et met à jour la liste `PLATS` de `js/site.js`.
