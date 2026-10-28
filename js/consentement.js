/* =====================================================================
   LE TOUAREG · Consentement, mesure d'audience, e-mail protégé
   Chargé sur toutes les pages.
   - Bannière : « Accepter » et « Refuser » ont le même poids (recommandation
     CNIL). Le choix est gardé 6 mois dans le navigateur (pas de cookie).
   - Mesure d'audience : GoatCounter (sans cookie), chargé UNIQUEMENT après
     accord et seulement si un code est renseigné dans js/donnees.js.
   - E-mail : écrit en morceaux dans le HTML, recomposé ici, pour ne pas être
     aspiré par les robots de spam.
   ===================================================================== */
(function () {
  'use strict';

  const R = (window.TOUAREG && window.TOUAREG.reglages) || {};
  const CLE = 'touareg.consentement.v1';
  const SIX_MOIS = 1000 * 60 * 60 * 24 * 182;

  const lire = () => { try { const v = JSON.parse(localStorage.getItem(CLE)); return v && Date.now() - v.date < SIX_MOIS ? v : null; } catch (e) { return null; } };
  const ecrire = choix => { try { localStorage.setItem(CLE, JSON.stringify({ choix, date: Date.now() })); } catch (e) { /* navigation privée */ } };

  /* ---------- Mesure d'audience (GoatCounter, sans cookie) ---------- */
  let chargee = false;
  function chargerMesure() {
    const code = R.analytics && R.analytics.goatcounter;
    if (chargee || !code) return;
    chargee = true;
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://gc.zgo.at/count.js';
    s.dataset.goatcounter = `https://${code}.goatcounter.com/count`;
    document.head.appendChild(s);
  }
  /* Compte un événement (ex. commande envoyée), seulement si l'audience est acceptée */
  window.mesure = function (nom) {
    const c = lire();
    if (!c || c.choix !== 'oui' || !window.goatcounter || !window.goatcounter.count) return;
    window.goatcounter.count({ path: nom, title: nom, event: true });
  };

  /* ---------- Bannière ---------- */
  function afficherBanniere() {
    if (document.getElementById('banniere-cookies')) return;
    const b = document.createElement('section');
    b.id = 'banniere-cookies';
    b.className = 'banniere';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-labelledby', 'banniere-titre');
    b.setAttribute('aria-describedby', 'banniere-texte');
    b.innerHTML = `
      <h2 id="banniere-titre">Votre vie privée</h2>
      <p id="banniere-texte">Ce site ne dépose aucun cookie publicitaire. Avec votre accord, nous mesurons l’audience de façon anonyme (sans cookie) pour améliorer le site. <a href="politique-de-confidentialite.html">En savoir plus</a></p>
      <div class="banniere-boutons">
        <button class="btn btn-gris" type="button" data-consentement="non">Refuser</button>
        <button class="btn btn-gris" type="button" data-consentement="oui">Accepter</button>
      </div>`;
    document.body.appendChild(b);
    b.addEventListener('click', e => {
      const btn = e.target.closest('[data-consentement]');
      if (!btn) return;
      ecrire(btn.dataset.consentement);
      if (btn.dataset.consentement === 'oui') chargerMesure();
      b.remove();
    });
  }

  document.addEventListener('click', e => {
    if (e.target.closest('[data-gerer-cookies]')) { e.preventDefault(); afficherBanniere(); }
  });

  /* ---------- E-mail protégé ---------- */
  function recomposerEmails() {
    document.querySelectorAll('[data-email]').forEach(el => {
      const [nom, domaine] = el.dataset.email.split('|');
      const adresse = `${nom}@${domaine}`;
      if (el.tagName === 'A') el.href = `mailto:${adresse}`;
      if (!el.textContent.trim() || el.dataset.emailTexte !== undefined) el.textContent = adresse;
    });
  }

  function demarrer() {
    recomposerEmails();
    document.querySelectorAll('[data-annee]').forEach(el => { el.textContent = new Date().getFullYear(); });
    const c = lire();
    // Pas de mesure configurée = aucun traceur = rien à demander au visiteur
    if (!c && R.analytics && R.analytics.goatcounter) afficherBanniere();
    else if (c && c.choix === 'oui') chargerMesure();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', demarrer);
  else demarrer();
})();
