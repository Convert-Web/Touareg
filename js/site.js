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
  function detour(cle, { grand = false, alt = '', lazy = true, cls = '' } = {}) {
    const c = detourDe(cle);
    return `<img class="${cls}" src="assets/img/cut/${c}-${grand ? 840 : 420}.webp" alt="${echap(alt)}"${lazy ? ' loading="lazy" decoding="async"' : ''}>`;
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
          ${detour(detourPlat(p), { grand: true, alt: p.nom, lazy: i > 0 })}
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
    const demarrer = () => { if (mouvementReduit || diapos.length < 2) return; arreter(); minuteur = setInterval(() => aller(courant + 1), 6000); };
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

  /* ---------- Rayons + carte ---------- */
  let rayonActif = T.categories[0].id;

  function rendreRayons() {
    $('[data-rayons]').innerHTML = T.categories.map(c =>
      `<button class="rayon" type="button" role="tab" data-rayon="${c.id}" aria-selected="${c.id === rayonActif}">${detour(c.photo, { alt: '' })}<span>${c.nom}</span></button>`).join('');
    $$('[data-defiler]').forEach(b => b.addEventListener('click', () => {
      const l = $('[data-rayons]'); l.scrollBy({ left: Number(b.dataset.defiler) * l.clientWidth * .7, behavior: 'smooth' });
    }));
  }

  function blocPrix(p) {
    return `<strong class="prix">${euros(prixDe(p))}</strong>${p.menu ? `<small class="prix">Menu <b>${euros(prixDe(p, 'menu'))}</b></small>` : ''}`;
  }

  function rendreCarte() {
    $('[data-carte]').innerHTML = T.categories.map(c => {
      const plats = T.produits.filter(p => p.cat === c.id);
      return `<section class="rayon-bloc" id="cat-${c.id}" data-categorie="${c.id}" aria-labelledby="t-${c.id}">
        <div class="rayon-tete">
          <div class="rayon-tete-texte">
            <span class="compte">${plats.length} choix${c.menu ? ' · existe en menu' : ''}</span>
            <h3 id="t-${c.id}">${c.nom}</h3>
            <p>${echap(c.accroche)}</p>
          </div>
          ${detour(c.photo, { grand: true, alt: '' })}
        </div>
        <div class="plats">
          ${plats.map(p => `<article class="plat" data-plat-ligne="${p.id}" data-texte="${echap(norm(p.nom + ' ' + p.desc + ' ' + c.nom))}">
            <div class="plat-badges">${badges(p)}</div>
            <h4>${echap(p.nom)}</h4>
            ${p.desc ? `<p>${echap(p.desc)}</p>` : ''}
            <div class="plat-bas">
              <div class="plat-prix">${blocPrix(p)}</div>
              <button class="btn-ajout etire" type="button" data-plat="${p.id}" aria-label="Ajouter ${echap(p.nom)}">${icone('plus')}</button>
            </div>
          </article>`).join('')}
        </div>
        ${c.note ? `<p class="note-rayon">${echap(c.note)}</p>` : ''}
      </section>`;
    }).join('');
    $('[data-pied-carte]').innerHTML = T.categories.slice(0, 7).map(c => `<li><a href="#carte" data-aller-rayon="${c.id}">${c.nom}</a></li>`).join('');
    afficherRayon(rayonActif, false);
  }

  function afficherRayon(id, defiler = true) {
    rayonActif = id;
    const champ = $('[data-recherche]');
    if (champ.value) { champ.value = ''; }
    $$('[data-categorie]').forEach(s => { s.hidden = s.dataset.categorie !== id; $$('[data-plat-ligne]', s).forEach(l => { l.hidden = false; }); });
    $('[data-vide]').hidden = true;
    $$('[data-rayon]').forEach(b => b.setAttribute('aria-selected', String(b.dataset.rayon === id)));
    const b = $(`[data-rayon="${id}"]`);
    const liste = $('[data-rayons]');
    if (b) liste.scrollTo({ left: b.offsetLeft - liste.clientWidth / 2 + b.clientWidth / 2, behavior: 'smooth' });
    if (defiler) $('#carte').scrollIntoView({ behavior: mouvementReduit ? 'auto' : 'smooth', block: 'start' });
  }

  function brancherRecherche() {
    const champ = $('[data-recherche]');
    let minuteur;
    champ.addEventListener('input', () => {
      clearTimeout(minuteur);
      minuteur = setTimeout(() => {
        const q = norm(champ.value.trim());
        if (!q) return afficherRayon(rayonActif, false);
        let total = 0;
        $$('[data-categorie]').forEach(sec => {
          let n = 0;
          $$('[data-plat-ligne]', sec).forEach(l => { const ok = l.dataset.texte.includes(q); l.hidden = !ok; if (ok) n++; });
          sec.hidden = n === 0; total += n;
        });
        $('[data-vide]').hidden = total > 0;
      }, 120);
    });
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
        ${detour(detourPlat(p), { grand: true, alt: p.nom, lazy: false })}
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
            <label class="option"><input type="radio" name="formule" value="menu"${enMenu ? ' checked' : ''}><span><b>En menu</b><small>+ frites + boisson</small><span class="prix">${euros(prixDe(p, 'menu'))}</span></span></label>
          </div>
        </fieldset>
        <fieldset class="champ" data-bloc-boisson hidden>
          <legend>Boisson du menu</legend>
          <div class="pastilles-choix">${T.boissonsMenu.map((b, i) => `<label class="option"><input type="radio" name="boisson" value="${echap(b)}"${i === 0 ? ' checked' : ''}><span>${echap(b)}</span></label>`).join('')}</div>
        </fieldset>` : ''}
        ${p.base ? `<div class="champ"><label for="f-base">Base de la pizza <small>(au choix)</small></label><input class="saisie" id="f-base" name="base" placeholder="Ex. tomate ou crème fraîche" maxlength="60"></div>` : ''}
        ${p.choix ? `<div class="champ"><label for="f-viandes">${p.choix > 1 ? `Vos ${p.choix} viandes` : 'Votre viande'} <small>(au choix)</small></label><input class="saisie" id="f-viandes" name="viandes" placeholder="${p.choix > 1 ? 'Ex. kebab et poulet' : 'Ex. kebab'}" maxlength="90"></div>` : ''}
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
  ficheForm.addEventListener('submit', e => {
    e.preventDefault();
    const o = lireFiche();
    ajouterAuPanier(ficheProduit.id, o);
    fermerDialog(fiche);
    toast(`${o.qte > 1 ? o.qte + ' × ' : ''}${ficheProduit.nom}${o.formule === 'menu' ? ' en menu' : ''} ajouté`);
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
    });
    $$('[data-total]').forEach(el => { el.textContent = euros(totalPanier()); });
    const barre = $('[data-barre-panier]');
    barre.classList.toggle('visible', n > 0);
    barre.setAttribute('aria-hidden', n > 0 ? 'false' : 'true');
    $('button', barre).tabIndex = n > 0 ? 0 : -1;
    document.body.style.paddingBottom = n > 0 && window.matchMedia('(max-width: 860px)').matches ? '84px' : '';
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
      corps.innerHTML = `<div class="panier-vide"><img src="assets/img/cut/burger-420.webp" alt=""><strong>Votre panier est vide</strong><p>Ajoutez un plat depuis la carte pour commencer votre commande.</p><a class="btn" href="#carte" data-fermer-panier>Voir la carte</a></div>`;
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
          <span class="ligne-img">${detour(detourPlat(p), { alt: '' })}</span>
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
      <form class="commande" data-commande novalidate>
        <h3>Retrait au comptoir</h3>
        ${options.differe ? `<p class="alerte">${s.ouvert ? 'Il est trop tard pour un retrait ce soir.' : 'Nous sommes fermés pour le moment.'} Votre commande sera préparée pour l’heure choisie.</p>` : ''}
        <div class="champ"><label for="c-nom">Votre prénom</label><input class="saisie" id="c-nom" name="nom" autocomplete="given-name" required maxlength="40" value="${echap(brouillon.nom)}" placeholder="Pour vous appeler au comptoir"></div>
        <div class="champ"><label for="c-retrait">Heure de retrait</label>
          <select class="saisie" id="c-retrait" name="retrait">${options.map(o => `<option${o === retraitChoisi ? ' selected' : ''}>${echap(o)}</option>`).join('')}</select>
        </div>
        <div class="champ"><label for="c-remarque">Un mot pour la cuisine ? <small>(facultatif)</small></label><input class="saisie" id="c-remarque" name="remarque" maxlength="140" value="${echap(brouillon.remarque)}" placeholder="Ex. couverts, sauces à part"></div>
      </form>`;
    pied.innerHTML = `
      <div class="total"><span>Total</span><strong class="prix">${euros(totalPanier())}</strong></div>
      <button class="btn btn-whatsapp btn-plein" type="button" data-envoyer>${icone('whatsapp')}Envoyer ma commande</button>
      <p class="petit-texte">Paiement au comptoir : espèces, carte ou titres-restaurant.<br>Livraison ? <a href="${R.uberEats}" target="_blank" rel="noopener">Commandez sur Uber Eats</a></p>`;
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
    const s = e.target.closest('[data-ligne-suppr]');
    if (s) { panier.splice(Number(s.dataset.ligneSuppr), 1); return sauver(); }
    if (e.target.closest('[data-fermer-panier]')) return fermerDialog(panierDlg);
    if (e.target.closest('[data-vider]')) { panier = []; commandeEnvoyee = false; sauver(); fermerDialog(panierDlg); return toast('Merci, à tout de suite !'); }
    if (e.target.closest('[data-retour]')) { commandeEnvoyee = false; return rendrePanier(); }
    if (e.target.closest('[data-envoyer]')) {
      const form = $('[data-commande]', panierDlg);
      const nom = form.nom.value.trim();
      if (!nom) { form.nom.focus(); form.nom.setAttribute('aria-invalid', 'true'); form.nom.placeholder = 'Indiquez votre prénom pour continuer'; return; }
      const f = { nom, retrait: form.retrait.value, remarque: form.remarque.value.trim() };
      window.open(`https://wa.me/${R.whatsapp}?text=${encodeURIComponent(messageWhatsApp(f))}`, '_blank', 'noopener');
      commandeEnvoyee = true;
      rendrePanier();
    }
  });
  panierDlg.addEventListener('input', e => {
    const form = e.target.closest('[data-commande]'); if (!form) return;
    brouillon.nom = form.nom.value; brouillon.retrait = form.retrait.value; brouillon.remarque = form.remarque.value;
    if (e.target.name === 'nom') e.target.removeAttribute('aria-invalid');
    ecrire('touareg.client.v1', brouillon);
  });
  panierDlg.addEventListener('change', e => { if (e.target.name === 'retrait') { brouillon.retrait = e.target.value; ecrire('touareg.client.v1', brouillon); } });

  /* ---------- Toast ---------- */
  let minuteurToast;
  function toast(txt) {
    const t = $('[data-toast]');
    t.innerHTML = `${icone('check')}<span>${echap(txt)}</span>`;
    t.classList.add('visible');
    clearTimeout(minuteurToast);
    minuteurToast = setTimeout(() => t.classList.remove('visible'), 2400);
  }

  /* ---------- Navigation mobile ---------- */
  const navMobile = $('#nav-mobile');
  const btnNav = $('[data-ouvrir-nav]');
  function basculerNav(ouvrir) {
    navMobile.hidden = !ouvrir;
    btnNav.setAttribute('aria-expanded', String(ouvrir));
    document.body.classList.toggle('verrou', ouvrir);
    if (ouvrir) $('[data-fermer-nav]').focus(); else btnNav.focus({ preventScroll: true });
  }
  btnNav.addEventListener('click', () => basculerNav(true));
  navMobile.addEventListener('click', e => { if (e.target.closest('[data-fermer-nav]') || e.target.closest('nav a')) basculerNav(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !navMobile.hidden) basculerNav(false); });

  /* ---------- Délégation globale ---------- */
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-plat]');
    if (b) { e.preventDefault(); return ouvrirFiche(b.dataset.plat, b.dataset.formule); }
    const o = e.target.closest('[data-ouvrir-plat]');
    if (o) { e.preventDefault(); return ouvrirFiche(o.dataset.ouvrirPlat, o.dataset.formule); }
    const r = e.target.closest('[data-rayon], [data-aller-rayon]');
    if (r) { e.preventDefault(); return afficherRayon(r.dataset.rayon || r.dataset.allerRayon); }
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
  brancherRecherche();
  surDefilement();
  $$('[data-annee]').forEach(el => { el.textContent = new Date().getFullYear(); });
  setInterval(majStatut, 60 * 1000);

  /* Pour les tests */
  window.__touareg = { statut, creneauxRetrait, messageWhatsApp, panier: () => panier };
})();
