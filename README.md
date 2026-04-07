# Hors du Gouffre

Roman-jeu dont vous etes le detectives. Lyon, 2025.
Univers : Cthulhu / Hellblazer / Histoire locale.

## Lancement

Ouvrir `index.html` dans un navigateur moderne.
Aucune dependance externe, aucun serveur requis.
Les polices sont chargees depuis Google Fonts (connexion internet recommandee).

## Structure des fichiers

```
index.html          -- Structure HTML, ecrans (titre / creation / jeu)
style.css           -- Feuille de styles complete
engine.js           -- Moteur de jeu : etat, navigation, UI
data/
  scenes.js         -- Toutes les scenes et l'arborescence des choix
```

## Mecaniques

- Sante mentale (0-100) : baisse a chaque decouverte perturbante. Les sceptiques subissent des penalites x1.5.
- Argent (EUR) : certains choix coutent ou rapportent de l'argent.
- Suspicion (0-100) : monte si le personnage attire l'attention des autorites.
- Connaissance occulte (0-100) : monte avec les decouvertes et les choix d'investigation.

## Personnalisation du personnage

- Prenom / Nom libres
- Genre (homme / femme / autre) : influence les pronoms et les dialogues
- Age (debut / fin trentaine / quarantaine)
- Apparence : use / discret / imposant
- Passe : ex-flic / journaliste / militaire (modifie les stats de depart)
- Rapport a l'inexplique : sceptique / ouvert / initie (modifie les penalites mentales)

## Ajouter des scenes

Dans `data/scenes.js`, ajouter un objet scene :

```js
ma_scene: {
  location: 'Lieu visible dans le header',
  chapter: 'Chapitre X -- Nom',
  title: 'Titre de la scene',
  paragraphs: [
    'Paragraphe 1. Peut contenir du <em>texte en italique</em>.',
    'Paragraphe 2.'
  ],
  // ou paragraphsFn: (char) => [...] pour texte dynamique selon le personnage
  addItems: ['Nom de l\'objet'],  // optionnel, ajoute automatiquement
  choices: [
    {
      label: 'Texte du choix',
      tag: 'action',         // action | enquete | prudence | risque | refus | repos | fin
      next: 'id_scene_suivante',
      mentalDelta: -5,       // optionnel
      moneyDelta: 50,        // optionnel
      suspicionDelta: 5,     // optionnel
      occulteBonus: 10,      // optionnel
      addItem: 'Objet',      // optionnel
      log: 'Entree journal', // optionnel
      disabled: false        // optionnel, desactive le bouton
    }
  ]
}
```

## Chapitre II (prevu)

- Personnage de Romain Viguier (etat de conscience altere)
- L'Atelier des Passages : structure, hierarchie, secrets
- Les archives de la Confrerie des Canuts
- Premier contact avec "ce qui attend"
- Choix : signaler aux autorites / garder le secret / chercher la formule de la page 47
