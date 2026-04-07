/* ============================================================
   engine.js
   Moteur de jeu - gestion de l'etat, navigation, UI
   ============================================================ */

/* ----------------------------------------------------------
   ETAT GLOBAL
---------------------------------------------------------- */

const STATE = {
  char: {
    prenom: 'Edouard',
    nom: 'Lacroix',
    genre: 'homme',
    age: 38,
    apparence: 'fatigue',
    passe: 'ex-flic',
    occulte: 'sceptique'
  },
  mental: 80,
  money: 340,
  suspicion: 0,
  occulteScore: 0,
  inventory: ['Carnet', 'Telephone', 'Cle du bureau'],
  flags: {},
  sceneId: 'start',
  selections: {
    genre: 'homme',
    age: '38',
    apparence: 'fatigue',
    passe: 'ex-flic',
    occulte: 'sceptique'
  }
};

/* ----------------------------------------------------------
   CREATION - gestion des options
---------------------------------------------------------- */

function selectOption(btn, group) {
  const row = btn.closest('[id$="-options"]');
  if (!row) return;
  row.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  STATE.selections[group] = btn.dataset.value;
  updatePreview();
}

function updatePreview() {
  const prenom = document.getElementById('char-prenom').value.trim() || 'Marc';
  const nom = document.getElementById('char-nom').value.trim() || 'Delacroix';
  document.getElementById('preview-name').textContent = prenom + ' ' + nom;

  const genreLabels = { homme: 'Homme', femme: 'Femme', autre: 'Autre' };
  const ageLabels = { '30': 'debut trentaine', '38': 'fin trentaine', '48': 'quarantaine' };
  const passeLabels = { 'ex-flic': 'Ex-flic', 'journaliste': 'Journaliste reconverti', 'militaire': 'Ancien militaire' };
  const occulteLabels = { 'sceptique': 'sceptique', 'ouvert': 'curieux ouvert', 'initie': 'initie' };

  const s = STATE.selections;
  document.getElementById('preview-sub').textContent =
    `${genreLabels[s.genre] || 'Homme'}, ${ageLabels[s.age] || 'fin trentaine'} - ${passeLabels[s.passe] || 'Ex-flic'}, ${occulteLabels[s.occulte] || 'sceptique'}`;
}

document.getElementById('char-prenom').addEventListener('input', updatePreview);
document.getElementById('char-nom').addEventListener('input', updatePreview);

/* ----------------------------------------------------------
   DEMARRAGE DU JEU
---------------------------------------------------------- */

function startGame() {
  const prenom = document.getElementById('char-prenom').value.trim() || 'Marc';
  const nom = document.getElementById('char-nom').value.trim() || 'Delacroix';
  const s = STATE.selections;

  STATE.char = {
    prenom,
    nom,
    genre: s.genre || 'homme',
    age: parseInt(s.age) || 38,
    apparence: s.apparence || 'fatigue',
    passe: s.passe || 'ex-flic',
    occulte: s.occulte || 'sceptique'
  };

  // Bonus de depart selon le passe
  if (s.passe === 'ex-flic') {
    STATE.mental = 90;
    STATE.money = 340;
    STATE.suspicion = 0;
  } else if (s.passe === 'journaliste') {
    STATE.mental = 75;
    STATE.money = 390;
    STATE.suspicion = 0;
  } else if (s.passe === 'militaire') {
    STATE.mental = 95;
    STATE.money = 280;
    STATE.suspicion = 10;
  }

  // Bonus occulte
  if (s.occulte === 'initie') {
    STATE.mental -= 15;
    STATE.occulteScore = 15;
  } else if (s.occulte === 'ouvert') {
    STATE.occulteScore = 5;
  }

  // Inventaire de depart
  STATE.inventory = ['Carnet', 'Telephone', 'Cle du bureau'];

  // Mise a jour du header
  document.getElementById('hdr-name').textContent = prenom + ' ' + nom;

  showScreen('screen-game');
  renderScene('start');
  
  // Scroll directement au contenu sans animation au premier chargement
  setTimeout(() => {
    const gameContent = document.getElementById('game-content');
    if (gameContent) {
      const header = document.querySelector('.game-header');
      const headerHeight = header ? header.offsetHeight : 0;
      const yOffset = gameContent.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;
      window.scrollTo({ top: yOffset, behavior: 'instant' });
    }
  }, 50);
}

/* ----------------------------------------------------------
   NAVIGATION
---------------------------------------------------------- */

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

function togglePanel(id) {
  const panel = document.getElementById(id);
  const btn = document.getElementById('btn-stats');
  if (panel.style.display === 'none') {
    panel.style.display = 'block';
    btn.classList.add('active');
  } else {
    panel.style.display = 'none';
    btn.classList.remove('active');
  }
}

/* ----------------------------------------------------------
   RENDU DE SCENE
---------------------------------------------------------- */

function renderScene(sceneId) {
  const scene = SCENES[sceneId];
  if (!scene) return;

  STATE.sceneId = sceneId;

  // Header
  document.getElementById('hdr-location').textContent = scene.location;
  document.getElementById('chapter-tag').textContent = scene.chapter;
  document.getElementById('scene-title').textContent = scene.title;

  // Paragraphes
  const body = document.getElementById('scene-body');
  body.innerHTML = '';

  const paragraphs = scene.paragraphsFn
    ? scene.paragraphsFn(STATE.char)
    : (scene.paragraphs || []);

  paragraphs.forEach((p, i) => {
    const el = document.createElement('p');
    el.className = 'scene-para reveal';
    el.innerHTML = p;
    el.style.animationDelay = `${i * 80}ms`;
    body.appendChild(el);
  });

  // Ajout automatique d'items
  if (scene.addItems) {
    scene.addItems.forEach(item => addItem(item, false));
  }

  // Choix
  const wrap = document.getElementById('choices-wrap');
  wrap.innerHTML = '';

  (scene.choices || []).forEach((choice, i) => {
    const btn = document.createElement('button');
    const classes = ['choice-btn'];
    if (choice.tag === 'risque') classes.push('danger');
    if (choice.disabled) classes.push('disabled');
    btn.className = classes.join(' ');
    btn.style.animationDelay = `${(paragraphs.length * 80) + (i * 80)}ms`;

    btn.innerHTML = `<span class="choice-tag">${choice.tag}</span>${choice.label}`;
    if (!choice.disabled) btn.addEventListener('click', () => handleChoice(choice));
    wrap.appendChild(btn);
  });

  updateStatsUI();
  updateInventoryUI();
  
  // Scroll en douceur vers le contenu sans remonter trop haut
  const gameContent = document.getElementById('game-content');
  if (gameContent) {
    const header = document.querySelector('.game-header');
    const headerHeight = header ? header.offsetHeight : 0;
    const yOffset = gameContent.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;
    window.scrollTo({ top: yOffset, behavior: 'smooth' });
  }
}

/* ----------------------------------------------------------
   GESTION DES CHOIX
---------------------------------------------------------- */

function handleChoice(choice) {
  // Appliquer les deltas
  if (choice.mentalDelta) {
    const delta = choice.mentalDelta;
    // Les sceptiques subissent des penalites mentales plus fortes
    const multiplier = (STATE.char.occulte === 'sceptique' && delta < 0) ? 1.5 : 1;
    STATE.mental = Math.round(Math.max(0, Math.min(100, STATE.mental + delta * multiplier)));
    if (delta < 0) notify(`Sante mentale ${Math.round(delta * multiplier)}`, 'loss');
    else notify(`Sante mentale +${delta}`, 'gain');
  }

  if (choice.moneyDelta) {
    STATE.money += choice.moneyDelta;
    if (choice.moneyDelta > 0) notify(`+${choice.moneyDelta} EUR`, 'gain');
    else notify(`${choice.moneyDelta} EUR`, 'loss');
  }

  if (choice.suspicionDelta) {
    STATE.suspicion = Math.max(0, Math.min(100, STATE.suspicion + choice.suspicionDelta));
    notify(`Suspicion +${choice.suspicionDelta}`, 'warn');
  }

  if (choice.occulteBonus) {
    STATE.occulteScore = Math.min(100, STATE.occulteScore + choice.occulteBonus);
    notify(`Connaissance occulte +${choice.occulteBonus}`, 'info');
  }

  if (choice.addItem) addItem(choice.addItem, true);
  if (choice.log) addJournalEntry(choice.log);

  updateStatsUI();
  updateInventoryUI();

  if (choice.next) {
    setTimeout(() => renderScene(choice.next), 150);
  }
}

/* ----------------------------------------------------------
   INVENTAIRE
---------------------------------------------------------- */

function addItem(item, notify_user) {
  if (!STATE.inventory.includes(item)) {
    STATE.inventory.push(item);
    if (notify_user) notify(`+ ${item}`, 'info');
    updateInventoryUI();
  }
}

// Categorie de chaque item
const ITEM_CATEGORIES = {
  'Carnet':                        'Objets',
  'Telephone':                     'Objets',
  'Cle du bureau':                 'Objets',
  'Photo de Thomas':               'Indices',
  'Adresse de la traboule':        'Indices',
  'Note: inscription latine':      'Documents',
  'Photos archives (1891)':        'Documents',
  'Carnet de Thomas (couv. rouge)':'Documents',
  'Notes: temoignage de Julien':   'Documents',
  'Carte de Romain (traboules)':   'Documents',
  'Tel. de Thomas (brise)':        'Indices',
  'Photos traboule':               'Indices',
};

function getItemCategory(item) {
  return ITEM_CATEGORIES[item] || 'Objets';
}

function updateInventoryUI() {
  const row = document.getElementById('inventory-row');
  if (!row) return;

  const categories = {};
  STATE.inventory.forEach(item => {
    const cat = getItemCategory(item);
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(item);
  });

  const order = ['Indices', 'Documents', 'Objets'];
  let html = '';
  order.forEach(cat => {
    if (!categories[cat] || categories[cat].length === 0) return;
    html += `<div class="inv-category">`;
    html += `<div class="inv-cat-label">${cat}</div>`;
    html += `<div class="inv-cat-items">`;
    categories[cat].forEach(item => {
      html += `<div class="item-pill">${item}</div>`;
    });
    html += `</div></div>`;
  });
  row.innerHTML = html;
}

/* ----------------------------------------------------------
   STATS UI
---------------------------------------------------------- */

function updateStatsUI() {
  document.getElementById('stat-mental').textContent = STATE.mental;
  document.getElementById('stat-money').textContent = STATE.money + ' EUR';
  document.getElementById('stat-suspicion').textContent = STATE.suspicion;
  document.getElementById('stat-occulte').textContent = STATE.occulteScore;

  document.getElementById('bar-mental').style.width = STATE.mental + '%';
  document.getElementById('bar-money').style.width = Math.min(STATE.money / 10, 100) + '%';
  document.getElementById('bar-suspicion').style.width = STATE.suspicion + '%';
  document.getElementById('bar-occulte').style.width = STATE.occulteScore + '%';
}

/* ----------------------------------------------------------
   NOTIFICATIONS
---------------------------------------------------------- */

function notify(msg, type) {
  const zone = document.getElementById('notification-zone');
  const el = document.createElement('div');
  el.className = `notif ${type}`;
  el.textContent = msg;
  zone.appendChild(el);
  setTimeout(() => {
    el.style.transition = 'opacity 0.3s';
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 300);
  }, 2800);
}

/* ----------------------------------------------------------
   JOURNAL
---------------------------------------------------------- */

function addJournalEntry(msg) {
  const list = document.getElementById('journal-list');
  const el = document.createElement('div');
  el.className = 'journal-line';
  const now = new Date();
  const hh = now.getHours().toString().padStart(2, '0');
  const mm = now.getMinutes().toString().padStart(2, '0');
  el.textContent = `${hh}:${mm} - ${msg}`;
  list.prepend(el);
}
