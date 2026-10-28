/* =====================================================================
   LE TOUAREG · Moteur du site
   Diaporama, rayons, carte, fiche produit, panier, commande WhatsApp,
   horaires. Aucune dépendance, aucun cookie : le panier reste dans le
   navigateur.
   ===================================================================== */
(function () {
  'use strict';

  const T = window.TOUAREG;
  const R = T.reglages;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const parId = Object.fromEntries(T.produits.map(p => [p.id, p]));
  const catParId = Object.fromEntries(T.categories.map(c => [c.id, c]));
  const CLE_PANIER = 'touareg.panier.v1';
  const JOURS = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const mouvementReduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Utilitaires ---------- */
  const fmt = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });
  const euros = n => fmt.format(n);
  const arrondi = n => Math.round(n * 100) / 100;
  const prixDe = (p, formule) => arrondi(((formule === 'menu' ? p.menu : p.prix) || 0) / (R.diviseurPrix || 1));
  const echap = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const icone = (id, cls = '') => `<svg class="${cls}" aria-hidden="true"><use href="#i-${id}"/></svg>`;
  const lire = (cle, defaut) => { try { const v = localStorage.getItem(cle); return v ? JSON.parse(v) : defaut; } catch (e) { return defaut; } };
  const ecrire = (cle, v) => { try { localStorage.setItem(cle, JSON.stringify(v)); } catch (e) { /* navigation privée */ } };

  /* Plats détourés (fond transparent) : assets/img/cut/<cle>-420.webp et -840.webp */
  const DETOUR = { sandwich: 'kebab', hero: 'kebab', 'burger-dark': 'burger-double', margherita: 'pizza' };
  const detourDe = cle => DETOUR[cle] || cle;
  const detourPlat = p => detourDe(p.photo || catParId[p.cat].photo);
  /* Dimensions (version 420 px) de chaque plat détouré, pour réserver la place avant le chargement */
  const DIMS = {"americain":[420,119],"assiette":[420,171],"boisson":[352,420],"bucket":[420,311],"burger-2":[420,233],"burger":[420,347],"burger-double":[320,420],"cheese":[283,235],"croque":[420,287],"dessert":[420,236],"frites":[414,420],"kebab":[420,225],"panini":[420,244],"pide":[420,420],"pizza-2":[345,420],"pizza":[420,252],"salade":[420,388],"tacos":[420,366],"texmex":[420,360]};
  function detour(cle, { alt = '', lazy = true, cls = '', sizes = '(min-width: 768px) 240px, 45vw' } = {}) {
    const c = detourDe(cle), base = `assets/img/cut/${c}`;
    const [w, h] = DIMS[c] || [420, 420];
    return `<img class="${cls}" src="${base}-420.webp" srcset="${base}-160.webp 160w, ${base}-420.webp 420w, ${base}-600.webp 600w, ${base}-840.webp 840w" sizes="${sizes}" width="${w}" height="${h}" alt="${echap(alt)}"${lazy ? ' loading="lazy" decoding="async"' : ''}>`;
  }

  const BADGES = { n1: ['badge-n1', 'N°1 des ventes'], populaire: ['badge-populaire', 'Populaire'], maison: ['badge-maison', 'Signature'], vege: ['badge-vege', 'Végétarien'] };
  const badges = p => (p.tags || []).map(t => BADGES[t] ? `<span class="badge ${BADGES[t][0]}">${BADGES[t][1]}</span>` : '').join('');

  /* ---------- Horaires (heure de Paris) ---------- */
  function maintenantParis() {
    const d = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Paris' }));
    return { date: d, jour: d.getDay(), minutes: d.getHours() * 60 + d.getMinutes() };
  }
  const enMinutes = hhmm => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; };
  const enHeure = min => { const h = Math.floor(min / 60) % 24, m = min % 60; return `${h}h${String(m).padStart(2, '0')}`; };
  const creneaux = jour => (R.horaires[jour] || []).map(([a, b]) => [enMinutes(a), enMinutes(b)]);

  function statut() {
    const { jour, minutes } = maintenantParis();
    for (const [a, b] of creneaux(jour)) if (minutes >= a && minutes < b) return { ouvert: true, fermeA: b };
    for (let i = 0; i < 8; i++) {
      const j = (jour + i) % 7;
      for (const [a] of creneaux(j)) if (i > 0 || a > minutes) return { ouvert: false, jourOffset: i, jour: j, ouvreA: a };
    }
    return { ouvert: false };
  }
  function texteStatut(s) {
    if (s.ouvert) return `Ouvert · jusqu’à ${enHeure(s.fermeA)}`;
    if (s.ouvreA == null) return 'Fermé';
    const quand = s.jourOffset === 0 ? '' : s.jourOffset === 1 ? 'demain ' : JOURS[s.jour].toLowerCase() + ' ';
    return `Fermé · ouvre ${quand}à ${enHeure(s.ouvreA)}`;
  }
  function majStatut() {
    const s = statut();
    $$('[data-statut]').forEach(el => { el.textContent = texteStatut(s); el.classList.toggle('ouvert', s.ouvert); el.classList.toggle('ferme', !s.ouvert); });
    return s;
  }

  /* Créneaux de retrait proposés */
  function creneauxRetrait() {
    const s = statut();
    const { jour, minutes } = maintenantParis();
    const pas = 15, delai = R.delaiPreparation || 20;
    const liste = [];
    const ajouterJour = (offset, j, depuis) => {
      for (const [a, b] of creneaux(j)) {
        let t = Math.max(a + delai, depuis + delai);
        t = Math.ceil(t / pas) * pas;
        for (; t <= b; t += pas) {
          const prefixe = offset === 0 ? '' : offset === 1 ? 'Demain ' : JOURS[j] + ' ';
          liste.push(prefixe + enHeure(t));
        }
      }
    };
    // Retrait immédiat possible seulement si la commande est prête avant la fermeture
    const immediat = s.ouvert && minutes + delai <= s.fermeA;
    if (immediat) {
      liste.push(`Dès que possible (vers ${enHeure(Math.ceil((minutes + delai) / 5) * 5)})`);
      ajouterJour(0, jour, minutes + 10);
    } else {
      for (let i = 0; i < 8 && !liste.length; i++) ajouterJour(i, (jour + i) % 7, i === 0 ? minutes : 0);
    }
    const resultat = liste.slice(0, 40);
    resultat.differe = !immediat;
    return resultat;
  }

  /* ---------- Diaporama du haut ---------- */
  function prixBadge(n) {
    const [e, c] = euros(n).replace(/\s?€/, '').split(',');
    return `${e}<sup>,${c} €</sup>`;
  }
  function rendreDiapos() {
    const diapos = T.diaporama.filter(d => parId[d.id]);
    $('[data-diapos]').innerHTML = diapos.map((d, i) => {
      const p = parId[d.id];
      const Titre = i === 0 ? 'h1' : 'h2';
      return `<div class="diapo${i === 0 ? ' active' : ''}" id="diapo-${i}" role="tabpanel" aria-roledescription="diapositive" aria-label="${i + 1} sur ${diapos.length}"${i ? ' aria-hidden="true"' : ''}>
        <div class="diapo-texte">
          <span class="diapo-sur">${echap(d.surtitre)}</span>
          <${Titre}>${echap(d.titre)}</${Titre}>
          <p>${echap(d.texte)}</p>
          <button class="btn btn-contour" type="button" data-plat="${p.id}" data-formule="${d.formule}"${i ? ' tabindex="-1"' : ''}>Commander</button>
        </div>
        <div class="diapo-visuel">
          ${detour(detourPlat(p), { alt: p.nom, lazy: i > 0, sizes: '(min-width: 768px) 560px, 300px' })}
          <div class="badge-prix"><small>${d.formule === 'menu' ? 'Le menu' : 'Seulement'}</small><strong>${prixBadge(prixDe(p, d.formule))}</strong></div>
          <svg class="fleche-deco f1" aria-hidden="true"><use href="#i-fleche-courbe"/></svg>
          <svg class="fleche-deco f2" aria-hidden="true"><use href="#i-fleche-courbe"/></svg>
        </div>
      </div>`;
    }).join('');
    $('[data-points]').innerHTML = diapos.map((d, i) =>
      `<button type="button" role="tab" aria-controls="diapo-${i}" aria-selected="${i === 0}" aria-label="${echap(d.titre)}" data-point="${i}"></button>`).join('');

    let courant = 0, minuteur = null;
    const aller = i => {
      courant = (i + diapos.length) % diapos.length;
      $$('.diapo').forEach((el, k) => {
        const actif = k === courant;
        el.classList.toggle('active', actif);
        el.setAttribute('aria-hidden', String(!actif));
        $$('button', el).forEach(b => { b.tabIndex = actif ? 0 : -1; });
      });
      $$('[data-point]').forEach((b, k) => b.setAttribute('aria-selected', String(k === courant)));
    };
    const demarrer = () => { if (mouvementReduit || diapos.length < 2) return; arreter(); minuteur = setInterval(() => aller(courant + 1), 7000); };
    const arreter = () => { clearInterval(minuteur); minuteur = null; };
    $('[data-points]').addEventListener('click', e => { const b = e.target.closest('[data-point]'); if (b) { aller(Number(b.dataset.point)); demarrer(); } });
    const hero = $('.hero');
    hero.addEventListener('mouseenter', arreter);
    hero.addEventListener('mouseleave', demarrer);
    hero.addEventListener('focusin', arreter);
    // glisser du doigt
    let x0 = null;
    hero.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener('touchend', e => {
      if (x0 == null) return;
      const dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 50) { aller(courant + (dx < 0 ? 1 : -1)); demarrer(); }
    });
    document.addEventListener('visibilitychange', () => (document.hidden ? arreter() : demarrer()));
    demarrer();
  }

  /* ---------- Rayons, filtres et grille de plats ---------- */
  const PAR_PAGE = 12;
  let filtre = 'tout', limite = PAR_PAGE, recherche = '';
  let favoris = new Set(lire('touareg.favoris.v1', []).filter(id => parId[id]));

  function rendreRayons() {
    $('[data-rayons]').innerHTML = T.categories.map(c =>
      `<button class="rayon" type="button" role="tab" data-rayon="${c.id}" aria-selected="false">${detour(c.photo, { alt: '', sizes: '(min-width: 768px) 74px, 60px' })}<span>${c.nom}</span></button>`).join('');
    $$('[data-defiler]').forEach(b => b.addEventListener('click', () => {
      const l = $('[data-rayons]'); l.scrollBy({ left: Number(b.dataset.defiler) * l.clientWidth * .7, behavior: 'smooth' });
    }));
  }

  function rendreFiltres() {
    const pilules = [['tout', 'Tout'], ...T.categories.map(c => [c.id, c.nom])];
    if (favoris.size) pilules.push(['favoris', `<svg class="coeur-mini" aria-hidden="true"><use href="#i-coeur"/></svg>Mes favoris (${favoris.size})`]);
    $('[data-filtres]').innerHTML = pilules.map(([id, nom]) =>
      `<button class="filtre" type="button" role="tab" data-filtre="${id}" aria-selected="${id === filtre && !recherche}">${nom}</button>`).join('');
  }

  // Vue « Tout » : un plat de chaque rayon à tour de rôle, pour une grille variée
  const melange = (() => {
    const files = T.categories.map(c => T.produits.filter(p => p.cat === c.id));
    const out = [];
    for (let i = 0; out.length < T.produits.length; i++) files.forEach(f => { if (f[i]) out.push(f[i]); });
    return out;
  })();

  // Plat sans option à choisir : il part directement au panier
  const ajoutDirect = p => !p.menu && !p.choix && !p.base;

  function cartePlat(p) {
    const fav = favoris.has(p.id);
    const note = p.avis
      ? `<span class="etoiles">${icone('etoile')}</span><span title="% de clients Uber Eats qui recommandent ce plat">${p.avis[0]} % · ${p.avis[1]} avis</span>`
      : badges({ tags: (p.tags || []).slice(0, 1) });
    return `<article class="plat" data-plat-ligne="${p.id}">
      <button class="coeur" type="button" data-favori="${p.id}" aria-pressed="${fav}" aria-label="${fav ? 'Retirer des favoris' : 'Ajouter aux favoris'} : ${echap(p.nom)}">${icone('coeur')}</button>
      <button class="plat-image" type="button" data-plat="${p.id}" tabindex="-1" aria-hidden="true">${detour(detourPlat(p), { alt: p.nom, sizes: '(min-width: 1100px) 230px, (min-width: 768px) 210px, 150px' })}</button>
      <div class="plat-note">${note}</div>
      <h3>${echap(p.nom)}</h3>
      <p>${echap(p.desc || catParId[p.cat].accroche)}</p>
      <div class="plat-prix"><strong class="prix">${euros(prixDe(p))}</strong>${p.menu ? `<small class="prix">ou ${euros(prixDe(p, 'menu'))} en menu</small>` : ''}</div>
      <div class="plat-actions">
        <button class="btn-oeil" type="button" data-plat="${p.id}" aria-label="Voir le détail : ${echap(p.nom)}">${icone('oeil')}</button>
        <button class="btn-ajouter" type="button" ${ajoutDirect(p) ? `data-ajout-direct="${p.id}"` : `data-plat="${p.id}"`} aria-label="Ajouter au panier : ${echap(p.nom)}">${icone('sac')}Ajouter</button>
      </div>
    </article>`;
  }

  function platsVisibles() {
    if (recherche) return T.produits.filter(p => norm(p.nom + ' ' + p.desc + ' ' + catParId[p.cat].nom).includes(recherche));
    if (filtre === 'favoris') return T.produits.filter(p => favoris.has(p.id));
    if (filtre === 'tout') return melange;
    return T.produits.filter(p => p.cat === filtre);
  }

  function rendreCarte() {
    const liste = platsVisibles();
    $('[data-carte]').innerHTML = liste.slice(0, limite).map(cartePlat).join('');
    $('[data-vide]').hidden = liste.length > 0;
    const plus = $('[data-voir-plus]');
    plus.hidden = liste.length <= limite;
    plus.textContent = `Voir plus (${liste.length - Math.min(limite, liste.length)})`;
    rendreFiltres();
    $$('[data-rayon]').forEach(b => b.setAttribute('aria-selected', String(b.dataset.rayon === filtre && !recherche)));
  }

  function choisirFiltre(id, defiler = true) {
    if (id !== 'favoris' && id !== 'tout' && !catParId[id]) return;
    filtre = id; limite = PAR_PAGE; recherche = '';
    $('[data-recherche]').value = '';
    rendreCarte();
    const b = $(`[data-rayon="${id}"]`), rail = $('[data-rayons]');
    if (b) rail.scrollTo({ left: b.offsetLeft - rail.clientWidth / 2 + b.clientWidth / 2, behavior: 'smooth' });
    if (defiler) $('#carte').scrollIntoView({ behavior: mouvementReduit ? 'auto' : 'smooth', block: 'start' });
  }

  function brancherCarte() {
    const champ = $('[data-recherche]');
    let minuteur;
    champ.addEventListener('input', () => {
      clearTimeout(minuteur);
      minuteur = setTimeout(() => { recherche = norm(champ.value.trim()); limite = PAR_PAGE; rendreCarte(); }, 120);
    });
    $('[data-voir-plus]').addEventListener('click', () => { limite += PAR_PAGE; rendreCarte(); });
    $('[data-filtres]').addEventListener('click', e => { const f = e.target.closest('[data-filtre]'); if (f) choisirFiltre(f.dataset.filtre, false); });
    $('[data-carte]').addEventListener('click', e => {
      const c = e.target.closest('[data-favori]');
      if (c) {
        const id = c.dataset.favori;
        if (favoris.has(id)) favoris.delete(id); else favoris.add(id);
        ecrire('touareg.favoris.v1', [...favoris]);
        if (filtre === 'favoris' && !favoris.size) filtre = 'tout';
        rendreCarte();
        return toast(favoris.has(id) ? `${parId[id].nom} ajouté aux favoris` : 'Retiré des favoris');
      }
      const d = e.target.closest('[data-ajout-direct]');
      if (d) {
        const p = parId[d.dataset.ajoutDirect];
        ajouterAuPanier(p.id, { formule: 'seul', boisson: '', base: '', viandes: '', note: '', qte: 1 });
        toast(`${p.nom} ajouté au panier`, { panier: true });
      }
    });
    $('[data-pied-carte]').innerHTML = T.categories.slice(0, 7).map(c => `<li><a href="#carte" data-aller-rayon="${c.id}">${c.nom}</a></li>`).join('');
  }

  /* ---------- Avis, horaires, prix affichés ---------- */
  function rendrePalmares() {
    const liste = T.produits.filter(p => p.avis && p.avis[1] >= 4)
      .sort((a, b) => b.avis[0] - a.avis[0] || b.avis[1] - a.avis[1]).slice(0, 6);
    $('[data-palmares]').innerHTML = liste.map(p => `<div class="avis-carte">
      <span class="score">${p.avis[0]} %</span>
      <span class="nom">${echap(p.nom)}</span>
      <small>${p.avis[1]} avis</small>
      <span class="jauge" aria-hidden="true"><i style="width:${p.avis[0]}%"></i></span>
    </div>`).join('');
  }

  function rendreHoraires() {
    const auj = maintenantParis().jour;
    $('[data-horaires] tbody').innerHTML = [1, 2, 3, 4, 5, 6, 0].map(j => {
      const c = creneaux(j);
      const txt = c.length ? c.map(([a, b]) => `${enHeure(a)} – ${enHeure(b)}`).join(' · ') : 'Fermé';
      return `<tr class="${j === auj ? 'aujourdhui' : ''}"><td>${JOURS[j]}${j === auj ? ' (aujourd’hui)' : ''}</td><td>${txt}</td></tr>`;
    }).join('');
    $$('[data-titres]').forEach(el => { el.textContent = R.titresRestaurant.join(', '); });
  }

  function majPrixAffiches() {
    $$('[data-prix-de]').forEach(el => { const p = parId[el.dataset.prixDe]; if (p) el.textContent = euros(prixDe(p, el.dataset.formulePrix)); });
  }

  /* ---------- Fiche produit ---------- */
  const fiche = $('#fiche');
  const ficheForm = $('[data-fiche-form]');
  let ficheProduit = null;

  function ouvrirFiche(id, formule) {
    const p = parId[id]; if (!p) return;
    ficheProduit = p;
    const enMenu = !!p.menu && formule === 'menu';
    ficheForm.innerHTML = `
      <div class="fiche-visuel">
        ${detour(detourPlat(p), { alt: p.nom, lazy: false, sizes: '(min-width: 640px) 390px, 280px' })}
        <button class="rond" type="button" data-fermer-fiche aria-label="Fermer">${icone('fermer')}</button>
      </div>
      <div class="fiche-corps">
        <div>
          <div class="plat-badges">${badges(p)}</div>
          <h2 id="fiche-titre">${echap(p.nom)}</h2>
          ${p.desc ? `<p class="desc">${echap(p.desc)}</p>` : ''}
        </div>
        ${p.menu ? `<fieldset class="champ">
          <legend>Formule</legend>
          <div class="choix-formule">
            <label class="option"><input type="radio" name="formule" value="seul"${enMenu ? '' : ' checked'}><span><b>Seul</b><small>Le plat uniquement</small><span class="prix">${euros(prixDe(p))}</span></span></label>
            <label class="option"><input type="radio" name="formule" value="menu"${enMenu ? ' checked' : ''}><span><b>En menu</b><small>+ ${euros(arrondi(prixDe(p, 'menu') - prixDe(p)))} : frites + boisson</small><span class="prix">${euros(prixDe(p, 'menu'))}</span></span></label>
          </div>
        </fieldset>
        <fieldset class="champ" data-bloc-boisson hidden>
          <legend>Boisson du menu</legend>
          <div class="pastilles-choix">${T.boissonsMenu.map((b, i) => `<label class="option"><input type="radio" name="boisson" value="${echap(b)}"${i === 0 ? ' checked' : ''}><span>${echap(b)}</span></label>`).join('')}</div>
        </fieldset>` : ''}
        ${p.base ? `<div class="champ"><label for="f-base">Base de la pizza <small>(obligatoire)</small></label><input class="saisie" id="f-base" name="base" placeholder="Ex. tomate ou crème fraîche" maxlength="60" required aria-describedby="err-base"><p class="erreur" id="err-base" hidden>Indiquez la base de votre pizza.</p></div>` : ''}
        ${p.choix ? `<div class="champ"><label for="f-viandes">${p.choix > 1 ? `Vos ${p.choix} viandes` : 'Votre viande'} <small>(obligatoire)</small></label><input class="saisie" id="f-viandes" name="viandes" placeholder="${p.choix > 1 ? 'Ex. kebab et poulet' : 'Ex. kebab'}" maxlength="90" required aria-describedby="err-viandes"><p class="erreur" id="err-viandes" hidden>${p.choix > 1 ? `Indiquez vos ${p.choix} viandes.` : 'Indiquez votre viande.'}</p></div>` : ''}
        <div class="champ"><label for="f-note">Une précision ? <small>(sauce, sans oignons…)</small></label><textarea class="zone" id="f-note" name="note" maxlength="160" placeholder="Ex. sauce blanche, sans tomates"></textarea></div>
      </div>
      <div class="fiche-pied">
        <div class="quantite" role="group" aria-label="Quantité">
          <button type="button" data-qte="-1" aria-label="Retirer un">−</button>
          <output name="qte" aria-live="polite">1</output>
          <button type="button" data-qte="1" aria-label="Ajouter un">+</button>
        </div>
        <button class="btn" type="submit"><span>Ajouter</span><span class="prix" data-fiche-total></span></button>
      </div>`;
    majFiche();
    ouvrirDialog(fiche);
  }

  function lireFiche() {
    const f = ficheForm;
    const formule = (f.querySelector('input[name="formule"]:checked') || {}).value || 'seul';
    const val = n => ((f.querySelector(`[name="${n}"]`) || {}).value || '').trim();
    return {
      formule,
      boisson: formule === 'menu' ? (f.querySelector('input[name="boisson"]:checked') || {}).value || '' : '',
      base: val('base'), viandes: val('viandes'), note: val('note'),
      qte: Number(f.querySelector('output[name="qte"]').textContent) || 1,
    };
  }

  function majFiche() {
    const o = lireFiche();
    const bloc = $('[data-bloc-boisson]', ficheForm);
    if (bloc) bloc.hidden = o.formule !== 'menu';
    $('[data-fiche-total]', ficheForm).textContent = euros(prixDe(ficheProduit, o.formule) * o.qte);
    $('[data-qte="-1"]', ficheForm).disabled = o.qte <= 1;
  }

  ficheForm.addEventListener('change', majFiche);
  ficheForm.addEventListener('click', e => {
    const b = e.target.closest('[data-qte]');
    if (b) {
      const out = $('output[name="qte"]', ficheForm);
      out.textContent = Math.min(20, Math.max(1, Number(out.textContent) + Number(b.dataset.qte)));
      majFiche();
    }
    if (e.target.closest('[data-fermer-fiche]')) fermerDialog(fiche);
  });
  /* Affiche ou efface l'erreur d'un champ ; renvoie true si le champ est valide */
  function verifierChamp(champ, valide) {
    if (!champ) return true;
    const msg = document.getElementById(champ.getAttribute('aria-describedby'));
    champ.toggleAttribute('aria-invalid', !valide);
    if (!valide) champ.setAttribute('aria-invalid', 'true');
    if (msg) msg.hidden = valide;
    return valide;
  }
  ficheForm.addEventListener('input', e => {
    if (e.target.matches('[required]') && e.target.value.trim()) verifierChamp(e.target, true);
  });

  ficheForm.addEventListener('submit', e => {
    e.preventDefault();
    const obligatoires = $$('[required]', ficheForm);
    const invalides = obligatoires.filter(c => !verifierChamp(c, c.value.trim().length > 0));
    if (invalides.length) { invalides[0].focus(); return; }
    const o = lireFiche();
    ajouterAuPanier(ficheProduit.id, o);
    fermerDialog(fiche);
    toast(`${o.qte > 1 ? o.qte + ' × ' : ''}${ficheProduit.nom}${o.formule === 'menu' ? ' en menu' : ''} ajouté`, { panier: true });
  });

  /* ---------- Fenêtres ---------- */
  let dernierFocus = null;
  function ouvrirDialog(d) {
    dernierFocus = document.activeElement;
    if (typeof d.showModal === 'function') d.showModal(); else d.setAttribute('open', '');
    document.body.classList.add('verrou');
  }
  function fermerDialog(d) {
    if (typeof d.close === 'function' && d.open) d.close(); else d.removeAttribute('open');
  }
  const panierDlg = $('#panier');
  [fiche, panierDlg].forEach(d => {
    d.addEventListener('close', () => {
      if (!fiche.open && !panierDlg.open) document.body.classList.remove('verrou');
      if (dernierFocus && document.contains(dernierFocus)) dernierFocus.focus({ preventScroll: true });
    });
    d.addEventListener('click', e => { if (e.target === d) fermerDialog(d); });
  });

  /* ---------- Panier ---------- */
  let panier = lire(CLE_PANIER, []).filter(l => parId[l.id]);
  let commandeEnvoyee = false;
  let panierOuvertA = Date.now();

  const cleLigne = (id, o) => [id, o.formule, o.boisson, o.base, o.viandes, o.note].join('|');
  function ajouterAuPanier(id, o) {
    const k = cleLigne(id, o);
    const existante = panier.find(l => l.k === k);
    if (existante) existante.qte = Math.min(20, existante.qte + o.qte);
    else panier.push({ k, id, formule: o.formule, boisson: o.boisson, base: o.base, viandes: o.viandes, note: o.note, qte: o.qte });
    commandeEnvoyee = false;
    sauver();
  }
  const prixLigne = l => prixDe(parId[l.id], l.formule) * l.qte;
  const totalPanier = () => arrondi(panier.reduce((s, l) => s + prixLigne(l), 0));
  const nbArticles = () => panier.reduce((s, l) => s + l.qte, 0);

  function sauver() { ecrire(CLE_PANIER, panier); majCompteurs(); rendrePanier(); }

  function majCompteurs() {
    const n = nbArticles();
    $$('[data-compteur]').forEach(el => {
      if (el.textContent !== String(n)) { el.classList.remove('saut'); void el.offsetWidth; el.classList.add('saut'); }
      el.textContent = n;
      el.classList.toggle('zero', n === 0);
    });
    $$('[data-total-nav]').forEach(el => { el.textContent = n > 0 ? euros(totalPanier()) : 'Panier'; });
    $$('.nav-panier').forEach(b => b.classList.toggle('plein', n > 0));
  }

  function detailLigne(l) {
    const d = [];
    if (l.formule === 'menu') d.push(`Menu${l.boisson ? ' · ' + l.boisson : ''}`);
    if (l.base) d.push('Base : ' + l.base);
    if (l.viandes) d.push('Viande : ' + l.viandes);
    if (l.note) d.push('« ' + l.note + ' »');
    return d;
  }

  const brouillon = lire('touareg.client.v1', { nom: '', retrait: '', remarque: '' });

  function rendrePanier() {
    const corps = $('[data-panier-corps]'), pied = $('[data-panier-pied]');
    if (commandeEnvoyee) {
      corps.innerHTML = `<div class="envoye">
        <div class="envoye-icone">${icone('whatsapp')}</div>
        <strong>Plus qu’une étape</strong>
        <p>WhatsApp s’est ouvert avec votre commande déjà écrite. Appuyez sur <b>Envoyer</b> dans WhatsApp pour nous la transmettre.</p>
        <p>WhatsApp ne s’est pas ouvert ? Appelez-nous au <a href="tel:+33673827821"><b>${R.telephone}</b></a>.</p>
      </div>`;
      pied.innerHTML = `<button class="btn btn-plein" type="button" data-vider>${icone('check')}C’est envoyé, vider le panier</button>
        <button class="lien-discret" type="button" data-retour style="justify-self:center">Revenir à ma commande</button>`;
      return;
    }
    if (!panier.length) {
      corps.innerHTML = `<div class="panier-vide"><img src="assets/img/cut/burger-420.webp" width="420" height="347" alt="" loading="lazy"><strong>Votre panier est vide</strong><p>Ajoutez un plat depuis la carte pour commencer votre commande.</p><a class="btn" href="#carte" data-fermer-panier>Voir la carte</a></div>`;
      pied.innerHTML = `<p class="petit-texte">Envie d’être livré ? <a href="${R.uberEats}" target="_blank" rel="noopener">Commandez sur Uber Eats</a></p>`;
      return;
    }
    const s = statut();
    const options = creneauxRetrait();
    const retraitChoisi = options.includes(brouillon.retrait) ? brouillon.retrait : options[0];
    corps.innerHTML = `
      <ul class="lignes">${panier.map((l, i) => {
        const p = parId[l.id];
        return `<li class="ligne">
          <span class="ligne-img">${detour(detourPlat(p), { alt: '', sizes: '62px' })}</span>
          <div><div class="ligne-nom">${echap(p.nom)}</div>${detailLigne(l).map(t => `<div class="ligne-detail">${echap(t)}</div>`).join('')}</div>
          <div class="ligne-prix prix">${euros(prixLigne(l))}</div>
          <div class="ligne-actions">
            <div class="quantite petite" role="group" aria-label="Quantité de ${echap(p.nom)}">
              <button type="button" data-ligne-qte="${i}" data-delta="-1" aria-label="Retirer un">−</button>
              <output>${l.qte}</output>
              <button type="button" data-ligne-qte="${i}" data-delta="1" aria-label="Ajouter un">+</button>
            </div>
            <button class="lien-discret" type="button" data-ligne-suppr="${i}">Supprimer</button>
          </div>
        </li>`;
      }).join('')}</ul>
      ${suggestions()}
      <form class="commande" data-commande novalidate>
        <h3>Retrait au comptoir</h3>
        ${options.differe ? `<p class="alerte">${s.ouvert ? 'Il est trop tard pour un retrait ce soir.' : 'Nous sommes fermés pour le moment.'} Votre commande sera préparée pour l’heure choisie.</p>` : ''}
        <div class="champ"><label for="c-nom">Votre prénom <small>(obligatoire)</small></label><input class="saisie" id="c-nom" name="nom" autocomplete="given-name" required minlength="2" maxlength="40" value="${echap(brouillon.nom)}" placeholder="Pour vous appeler au comptoir" aria-describedby="err-nom"><p class="erreur" id="err-nom" hidden>Indiquez votre prénom (2 lettres minimum).</p></div>
        <div class="piege" aria-hidden="true"><label for="c-site">Ne pas remplir</label><input id="c-site" name="site" tabindex="-1" autocomplete="off"></div>
        <div class="champ"><label for="c-retrait">Heure de retrait</label>
          <select class="saisie" id="c-retrait" name="retrait">${options.map(o => `<option${o === retraitChoisi ? ' selected' : ''}>${echap(o)}</option>`).join('')}</select>
        </div>
        <div class="champ"><label for="c-remarque">Un mot pour la cuisine ? <small>(facultatif)</small></label><input class="saisie" id="c-remarque" name="remarque" maxlength="140" value="${echap(brouillon.remarque)}" placeholder="Ex. couverts, sauces à part"></div>
        <p class="erreur" id="err-envoi" role="alert" hidden></p>
      </form>`;
    panierOuvertA = Date.now();
    pied.innerHTML = `
      <div class="total"><span>Total</span><strong class="prix">${euros(totalPanier())}</strong></div>
      <button class="btn btn-whatsapp btn-plein" type="button" data-envoyer>${icone('whatsapp')}Envoyer ma commande</button>
      <p class="petit-texte">WhatsApp s’ouvre avec votre commande déjà écrite : il suffit d’appuyer sur <b>Envoyer</b>. Vous payez au comptoir.</p>
      <p class="petit-texte">Pas de WhatsApp ? Appelez le <a href="tel:+33673827821">${R.telephone}</a></p>`;
  }

  /* Suggestions dans le panier : boisson, dessert, accompagnement, ajoutés en un clic */
  const SUGGESTIONS = ['coca', 'tiramisu', 'bucket-frites', 'tarte-daim', 'camembert', 'lipton'];
  function suggestions() {
    const dans = new Set(panier.map(l => l.id));
    const liste = SUGGESTIONS.filter(id => parId[id] && !dans.has(id)).slice(0, 3);
    if (!liste.length) return '';
    return `<div class="suggestions"><h3>Un petit plus ?</h3><div class="suggestions-liste">${liste.map(id => {
      const p = parId[id];
      return `<button class="suggestion" type="button" data-suggestion="${id}" aria-label="Ajouter ${echap(p.nom)}, ${euros(prixDe(p))}">
        ${detour(detourPlat(p), { alt: '', sizes: '48px' })}<span>${echap(p.nom)}</span><b class="prix">+ ${euros(prixDe(p))}</b></button>`;
    }).join('')}</div></div>`;
  }

  function messageWhatsApp(f) {
    const lignes = panier.map(l => {
      const p = parId[l.id];
      const d = detailLigne(l);
      return `• ${l.qte} × ${p.nom} — ${euros(prixLigne(l))}${d.length ? '\n   ' + d.join('\n   ') : ''}`;
    });
    return [
      'Bonjour Le Touareg, je souhaite commander à emporter :',
      '',
      ...lignes,
      '',
      `Total : ${euros(totalPanier())}`,
      `Retrait : ${f.retrait}`,
      `Prénom : ${f.nom}`,
      f.remarque ? `Remarque : ${f.remarque}` : '',
      '',
      'Paiement au comptoir. Merci !',
    ].filter((l, i, a) => !(l === '' && a[i - 1] === '')).join('\n').replace(/\n{3,}/g, '\n\n');
  }

  panierDlg.addEventListener('click', e => {
    const q = e.target.closest('[data-ligne-qte]');
    if (q) {
      const i = Number(q.dataset.ligneQte), l = panier[i];
      l.qte += Number(q.dataset.delta);
      if (l.qte <= 0) panier.splice(i, 1);
      return sauver();
    }
    const sug = e.target.closest('[data-suggestion]');
    if (sug) { const p = parId[sug.dataset.suggestion]; ajouterAuPanier(p.id, { formule: 'seul', boisson: '', base: '', viandes: '', note: '', qte: 1 }); return toast(`${p.nom} ajouté`); }
    const s = e.target.closest('[data-ligne-suppr]');
    if (s) { panier.splice(Number(s.dataset.ligneSuppr), 1); return sauver(); }
    if (e.target.closest('[data-fermer-panier]')) return fermerDialog(panierDlg);
    if (e.target.closest('[data-vider]')) { panier = []; commandeEnvoyee = false; sauver(); fermerDialog(panierDlg); return toast('Merci, à tout de suite !'); }
    if (e.target.closest('[data-retour]')) { commandeEnvoyee = false; return rendrePanier(); }
    if (e.target.closest('[data-envoyer]')) {
      const form = $('[data-commande]', panierDlg);
      const errEnvoi = $('#err-envoi', panierDlg);
      errEnvoi.hidden = true;
      // Anti-robot : le champ piège doit rester vide et un humain met au moins 3 s à remplir
      if (form.site.value || Date.now() - panierOuvertA < 3000) {
        errEnvoi.textContent = 'Vérifiez votre commande puis appuyez à nouveau sur « Envoyer ».';
        errEnvoi.hidden = false;
        return;
      }
      const nom = form.nom.value.trim().replace(/\s+/g, ' ');
      if (!verifierChamp(form.nom, /^[\p{L}][\p{L}' -]{1,39}$/u.test(nom))) { form.nom.focus(); return; }
      // Une commande par minute au maximum
      const derniere = Number(lire('touareg.dernier-envoi.v1', 0));
      const attente = Math.ceil((60000 - (Date.now() - derniere)) / 1000);
      if (attente > 0) {
        errEnvoi.textContent = `Une commande vient d’être envoyée. Patientez ${attente} s avant d’en envoyer une autre, ou appelez-nous.`;
        errEnvoi.hidden = false;
        return;
      }
      const f = { nom, retrait: form.retrait.value, remarque: form.remarque.value.trim() };
      ecrire('touareg.dernier-envoi.v1', Date.now());
      window.open(`https://wa.me/${R.whatsapp}?text=${encodeURIComponent(messageWhatsApp(f))}`, '_blank', 'noopener');
      if (window.mesure) window.mesure('commande-whatsapp');
      commandeEnvoyee = true;
      rendrePanier();
    }
  });
  panierDlg.addEventListener('input', e => {
    const form = e.target.closest('[data-commande]'); if (!form) return;
    brouillon.nom = form.nom.value; brouillon.retrait = form.retrait.value; brouillon.remarque = form.remarque.value;
    if (e.target.name === 'nom' && e.target.value.trim().length >= 2) verifierChamp(e.target, true);
    ecrire('touareg.client.v1', brouillon);
  });
  panierDlg.addEventListener('change', e => { if (e.target.name === 'retrait') { brouillon.retrait = e.target.value; ecrire('touareg.client.v1', brouillon); } });

  /* ---------- Toast ---------- */
  let minuteurToast;
  function toast(txt, { panier = false } = {}) {
    const t = $('[data-toast]');
    t.innerHTML = `${icone('check')}<span>${echap(txt)}</span>${panier ? '<button class="toast-action" type="button" data-ouvrir-panier>Voir le panier</button>' : ''}`;
    t.classList.toggle('avec-action', panier);
    t.classList.add('visible');
    clearTimeout(minuteurToast);
    minuteurToast = setTimeout(() => t.classList.remove('visible'), panier ? 4500 : 2400);
  }

  /* ---------- Barre de navigation basse : rubrique active ---------- */
  function brancherNavBasse() {
    const liens = $$('[data-nav-basse]');
    if (!liens.length || !('IntersectionObserver' in window)) return;
    const cibles = { haut: $('.hero'), carte: $('#carte'), infos: $('.duo') };
    const visibles = new Map();
    const obs = new IntersectionObserver(entrees => {
      entrees.forEach(e => visibles.set(e.target, e.intersectionRatio));
      let meilleur = 'haut', ratio = 0;
      Object.entries(cibles).forEach(([cle, el]) => { const r = visibles.get(el) || 0; if (r > ratio) { ratio = r; meilleur = cle; } });
      liens.forEach(l => l.classList.toggle('actif', l.dataset.navBasse === meilleur));
    }, { threshold: [0, .15, .3, .5, .7] });
    Object.values(cibles).forEach(el => el && obs.observe(el));
  }

  /* ---------- Délégation globale ---------- */
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-plat]');
    if (b) { e.preventDefault(); return ouvrirFiche(b.dataset.plat, b.dataset.formule); }
    const o = e.target.closest('[data-ouvrir-plat]');
    if (o) { e.preventDefault(); return ouvrirFiche(o.dataset.ouvrirPlat, o.dataset.formule); }
    const r = e.target.closest('[data-rayon], [data-aller-rayon]');
    if (r) { e.preventDefault(); return choisirFiltre(r.dataset.rayon || r.dataset.allerRayon); }
    if (e.target.closest('[data-ouvrir-panier]')) { rendrePanier(); return ouvrirDialog(panierDlg); }
  });

  /* En-tête : fond rouge plein dès qu'on quitte le haut de page */
  const entete = $('#entete');
  const surDefilement = () => entete.classList.toggle('plein', window.scrollY > 10);
  window.addEventListener('scroll', surDefilement, { passive: true });

  /* ---------- Démarrage ---------- */
  rendreDiapos();
  rendreRayons();
  rendreCarte();
  rendrePalmares();
  rendreHoraires();
  majPrixAffiches();
  majStatut();
  majCompteurs();
  rendrePanier();
  brancherCarte();
  brancherNavBasse();
  surDefilement();
  setInterval(majStatut, 60 * 1000);

  /* Pour les tests */
  window.__touareg = { statut, creneauxRetrait, messageWhatsApp, panier: () => panier };
})();
