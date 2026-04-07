/* ============================================================
   data/scenes.js
   Toutes les scenes du Chapitre 1 -- Les Traboules
   ============================================================ */

const SCENES = {

  /* ----------------------------------------------------------
     ACTE 0 : L'APPEL
  ---------------------------------------------------------- */

  start: {
    location: 'Lyon, Croix-Rousse',
    chapter: 'Chapitre I -- L\'appel',
    title: 'Mardi, 23h47. Bureau, rue Dumenge.',
    paragraphs: [
      'La pluie frappe la fenetre en rafales irregulieres. Vous avez passe la journee sur une affaire d\'adultere banale -- photos floues, mari gras, hotel de la Part-Dieu. Le genre de truc qui paie le loyer.',
      'Votre telephone vibre sur le bureau. Numero inconnu. Vous hesitez. A cette heure, c\'est rarement une bonne nouvelle.'
    ],
    choices: [
      { label: 'Repondre', tag: 'action', next: 'phone_answer' },
      { label: 'Ignorer. Finir votre verre de Cotes du Rhone.', tag: 'repos', next: 'ignore_call', mentalDelta: 3 }
    ]
  },

  phone_answer: {
    location: 'Lyon, Croix-Rousse',
    chapter: 'Chapitre I -- L\'appel',
    title: '"Monsieur... ou Madame... Delacroix ?"',
    paragraphsFn: (char) => {
      const titre = char.genre === 'femme' ? 'Madame' : (char.genre === 'homme' ? 'Monsieur' : 'Monsieur');
      const pronom = char.genre === 'femme' ? 'elle' : 'il';
      return [
        `La voix est feminine, jeune, tendue. "${titre} Delacroix ?" Elle parle vite. <em>Son frere a disparu depuis cinq jours. La police n'a rien fait. Elle a trouve votre nom sur un forum. Elle peut payer.</em>`,
        'Un frere. Vingt-trois ans. Etudiant en histoire medievale a Lyon 2. La derniere fois qu\'elle l\'a vu, il rentrait d\'une visite aux traboules du Vieux-Lyon avec un groupe de recherche. Il avait l\'air agite. Il lui avait dit une phrase bizarre : <em>"Ils sont toujours la, Marie. Ils ont jamais vraiment fini."</em>',
        'Vous notez sur votre carnet. Vous demandez son adresse.'
      ];
    },
    choices: [
      { label: 'Accepter le cas -- 200 euros d\'avance', tag: 'contrat', next: 'accept_case', moneyDelta: 200, log: 'Accepte le cas de Marie Fontaine. +200 EUR.' },
      { label: 'Demander plus d\'informations avant de vous engager', tag: 'prudence', next: 'ask_more' },
      { label: 'Refuser -- trop vague, trop tard', tag: 'refus', next: 'refuse_case', mentalDelta: 3 }
    ]
  },

  ignore_call: {
    location: 'Lyon, Croix-Rousse',
    chapter: 'Chapitre I -- L\'appel',
    title: 'Le silence apres le verre.',
    paragraphs: [
      'Vous laissez le telephone vibrer. La pluie continue. Le vin est correct. Vous vous endormez dans votre fauteuil peu apres minuit.',
      'Le lendemain matin, vous rappelez le numero. Personne ne repond. Un message dans votre boite mail vous attend, envoye a 00h03 : <em>"Tant pis. J\'espere que vous dormiez bien."</em>',
      'Vous fermez le mail. Vous ouvrez votre agenda. Il est vide.'
    ],
    choices: [
      { label: 'Chercher qui a essaye d\'appeler', tag: 'enquete', next: 'phone_answer', mentalDelta: -5, log: 'Remords. Rappelle le numero inconnu.' }
    ]
  },

  ask_more: {
    location: 'Lyon, Croix-Rousse',
    chapter: 'Chapitre I -- L\'appel',
    title: 'Questions avant engagement.',
    paragraphs: [
      'Vous posez trois questions : son nom, celui de son frere, le nom du groupe de recherche.',
      'Elle repond sans hesiter. Elle s\'appelle Marie Fontaine. Son frere : Thomas, 23 ans. Le groupe : <em>l\'Atelier des Passages</em>. Une association independante, pas officielle. Des etudiants et des amateurs d\'histoire locale.',
      'Vous connaissez les traboules. Vous y avez fait une intervention il y a plusieurs annees, dans votre vie d\'avant. Une personne avait perdu les pedales la-dedans. Elle repetait les memes mots en boucle. L\'affaire avait ete classee rapidement. Trop rapidement.',
      '<em>Ce souvenir-la, vous ne l\'aviez pas sorti depuis longtemps.</em>'
    ],
    choices: [
      { label: 'Accepter le cas -- 200 euros d\'avance', tag: 'contrat', next: 'accept_case', moneyDelta: 200, log: 'Accepte le cas de Marie Fontaine. +200 EUR.' },
      { label: 'Refuser -- mauvais pressentiment', tag: 'refus', next: 'refuse_case' }
    ]
  },

  refuse_case: {
    location: 'Lyon, Croix-Rousse',
    chapter: 'Chapitre I -- L\'appel',
    title: 'Non.',
    paragraphs: [
      'Vous raccrochez poliment. Votre verre est vide. Vous en remplissez un autre.',
      'Trois jours plus tard, vous tombez sur un entrefilet dans Le Progres : <em>un etudiant de Lyon 2 retrouve inconscient dans les traboules du Vieux-Lyon. Etat neurologique preoccupant. Les medecins ne s\'expliquent pas le tableau clinique.</em>',
      'Le nom : Thomas Fontaine.',
      'Vous posez le journal. Vous fixez le mur blanc de votre bureau pendant un long moment.'
    ],
    choices: [
      { label: 'Appeler Marie Fontaine', tag: 'action', next: 'phone_answer', mentalDelta: -8, log: 'Lu le journal. Rappelle Marie Fontaine. Mental fragilise.' }
    ]
  },

  /* ----------------------------------------------------------
     ACTE 1 : LA CLIENTE
  ---------------------------------------------------------- */

  accept_case: {
    location: 'Lyon, Vieux-Lyon',
    chapter: 'Chapitre I -- La cliente',
    title: 'Mercredi, 10h15. Rue Saint-Jean.',
    paragraphsFn: (char) => {
      return [
        'Marie Fontaine a vingt-six ans, les yeux rouges, un manteau trop grand pour elle. Elle vous a donne une enveloppe avec deux cents euros en cash et une photo de Thomas -- souriant, devant le Palais de Justice.',
        'Les traboules sont des passages interieurs qui traversent les immeubles -- des tunnels de pierre reliant les rues entre elles, heritage des canuts, des tisserands qui transportaient leurs soieries a l\'abri de la pluie. Certaines sont ouvertes aux touristes. D\'autres ne le sont pas officiellement.',
        '<em>La derniere traboule que Thomas a visitee n\'est sur aucune carte officielle.</em> Marie vous montre un message sur son telephone -- une photo envoyee par Thomas la nuit de sa disparition. Un couloir etroit, de la pierre noire, une lumiere blanche au fond. Et sur le mur, quelque chose de grave dans la pierre, en latin : <em>Porta somniis non clauditur.</em>',
        'Vous ne lisez pas couramment le latin.'
      ];
    },
    addItems: ['Photo de Thomas', 'Adresse de la traboule'],
    choices: [
      { label: 'Chercher la traduction de l\'inscription latine', tag: 'enquete', next: 'latin_search', addItem: 'Note: inscription latine' },
      { label: 'Se rendre directement a l\'adresse de la traboule', tag: 'action', next: 'traboule_entrance' },
      { label: 'Contacter l\'Atelier des Passages d\'abord', tag: 'prudence', next: 'contact_atelier' }
    ]
  },

  latin_search: {
    location: 'Lyon, Presqu\'ile',
    chapter: 'Chapitre I -- La cliente',
    title: 'Traduction.',
    paragraphs: [
      'Vous appelez une ancienne connaissance -- historienne, ou proche. Elle traduit en trente secondes.',
      '"<em>La porte des reves ne se ferme pas.</em>" Elle vous demande d\'ou ca vient. Vous lui dites que c\'est pour un client. Elle insiste : elle a deja vu cette formule, dans des archives concernant des rites de la Canuse -- les pratiques semi-secretes des tisserands lyonnais du XIXe siecle. Certains croyaient que les traboules n\'etaient pas seulement des passages physiques.',
      'Vous raccrochez. Vous restez assis une minute avec cette information.',
      'Puis vous enfilez votre veste.'
    ],
    choices: [
      { label: 'Se rendre a la traboule', tag: 'action', next: 'traboule_entrance', log: 'Inscription traduite: "La porte des reves ne se ferme pas." Rites de la Canuse.' },
      { label: 'Fouiller les archives de la mairie d\'abord', tag: 'enquete', next: 'archives', moneyDelta: -20, occulteBonus: 10, log: 'Archives mairie. -20 EUR. Occulte +10.' }
    ]
  },

  archives: {
    location: 'Lyon, Hotel de Ville -- Archives municipales',
    chapter: 'Chapitre I -- La cliente',
    title: 'Mercredi apres-midi. Salle de lecture.',
    paragraphs: [
      'Les archives municipales conservent des registres de la Canuse datant de 1820 a 1905. Vous demandez acces aux fonds non-catalogues. La documentaliste vous regarde comme si vous lui aviez demande quelque chose d\'obscene.',
      'Vous insistez. Vous attendez quarante minutes. Elle revient avec trois boites.',
      'Dans la troisieme : un cahier manuscrit intitule <em>"Compte-rendu des incidents des passages interieurs, 1887-1893."</em> Redige en ecriture serree. Plusieurs entrees mentionnent des "etats de sommeil eveille" chez des tisserands qui s\'etaient aventures dans un reseau particulier -- non repertorie, dit le cahier, "par decision de la Confrerie."',
      'Une entree du 14 mars 1891 : <em>"Le frere Achille est revenu. Il ne reconnait plus personne. Il repete les mots de la Porte. On l\'a confie aux soeurs de Saint-Charles. Il ne s\'est pas reveille."</em>',
      'Vous photographiez les pages. Vous sortez dans la lumiere du jour. Elle vous fait mal aux yeux.'
    ],
    addItems: ['Photos archives (1891)'],
    choices: [
      { label: 'Se rendre a la traboule maintenant', tag: 'action', next: 'traboule_entrance', log: 'Archives: incidents 1887-1893. Cas similaires.' }
    ]
  },

  contact_atelier: {
    location: 'Lyon, Croix-Rousse',
    chapter: 'Chapitre I -- La cliente',
    title: 'L\'Atelier des Passages.',
    paragraphs: [
      'L\'Atelier des Passages a un site web basique et un numero de contact. Une voix d\'homme decroche, mefiante. Vous vous presentez comme un proche de Thomas Fontaine.',
      'Un silence. Puis : <em>"On ne parle pas aux gens qu\'on connait pas. Surtout pas maintenant."</em>',
      'Il raccroche.',
      '<em>Maintenant.</em> C\'est une information. Quelqu\'un dans ce groupe sait quelque chose. Et cette personne a peur.'
    ],
    choices: [
      { label: 'Se rendre a la traboule', tag: 'action', next: 'traboule_entrance', suspicionDelta: 5, log: 'Contact Atelier: mefiants. Suspicion +5.' }
    ]
  },

  /* ----------------------------------------------------------
     ACTE 2 : LA TRABOULE
  ---------------------------------------------------------- */

  traboule_entrance: {
    location: 'Lyon, Vieux-Lyon -- Rue du Boeuf',
    chapter: 'Chapitre I -- La descente',
    title: '14h40. Une porte grise entre deux boutiques.',
    paragraphs: [
      'L\'adresse de Thomas correspond a une porte grise sans numero ni sonnette. Le cadenas est recent mais pas pose par la ville -- trop propre, trop discret.',
      'Vous examinez la porte. Quelqu\'un l\'a forcee recemment et recondamnee ensuite. Les traces sur le bois sont nettes. Vous sortez votre set de crochetage.',
      'A l\'interieur : un couloir de pierre etroite, une odeur d\'humidite ancienne et autre chose -- quelque chose que vous n\'arrivez pas a nommer. Pas une odeur de decomposition. Plutot... l\'odeur d\'une piece fermee depuis trop longtemps et rouverte d\'un coup.',
      'Votre lampe de telephone eclaire les murs. Et vous le voyez : le meme texte latin. Et en dessous, en francais, griffonne au marqueur noir : <em>NE PAS DESCENDRE.</em>'
    ],
    choices: [
      { label: 'Descendre quand meme', tag: 'risque', next: 'descent', mentalDelta: -5, log: 'Ignore l\'avertissement. Descend.' },
      { label: 'Photographier et repartir -- chercher du renfort', tag: 'prudence', next: 'find_help', addItem: 'Photos traboule', log: 'Photographie l\'entree. Repart chercher du renfort.' },
      { label: 'Inspecter les environs -- qui a ecrit ca ?', tag: 'enquete', next: 'inspect_warning' }
    ]
  },

  inspect_warning: {
    location: 'Lyon, Vieux-Lyon -- Traboule sans nom',
    chapter: 'Chapitre I -- La descente',
    title: 'L\'avertissement.',
    paragraphs: [
      'Le marqueur est recent. Moins de 48 heures, vous diriez -- l\'encre n\'est pas encore totalement seche au toucher.',
      'Vous regardez mieux le sol. Des traces de pas multiples dans la poussiere. Au moins quatre personnes, peut-etre cinq. Deux sont parties en courant -- vous reconnaissez le pattern du pied qui glisse sur la pierre mouilee.',
      'Et dans un coin, partiellement cache sous une pierre descelllee : un carnet a spirales. Couverture rouge. Vous l\'ouvrez. La premiere page porte un nom : <em>Thomas Fontaine, M2 Histoire medievale, 2024-2025.</em>',
      'Votre coeur bat un peu plus vite.'
    ],
    addItems: ['Carnet de Thomas (couv. rouge)'],
    choices: [
      { label: 'Lire le carnet ici, maintenant', tag: 'enquete', next: 'read_notebook', mentalDelta: -8, log: 'Trouve et lit le carnet de Thomas.' },
      { label: 'Mettre le carnet en securite et descendre', tag: 'action', next: 'descent', mentalDelta: -3, log: 'Recupère le carnet. Descend quand meme.' }
    ]
  },

  read_notebook: {
    location: 'Lyon, Vieux-Lyon -- Traboule sans nom',
    chapter: 'Chapitre I -- La descente',
    title: 'Notes de Thomas.',
    paragraphs: [
      'L\'ecriture est serree, enthousiaste au debut, puis de plus en plus desordonnee vers les dernieres pages. Thomas etait en train de cartographier un reseau de traboules non repertoriees -- une these sur les usages clandestins au XIXe siecle.',
      'Mais quelques pages avant la fin, le ton change. <em>"Hier soir, j\'ai entendu quelque chose dans le passage du niveau -2. Pas un rat. Pas le vent. Quelque chose qui attendait. Qui ecoute. L\'Atelier dit que c\'est normal, que les traboules ont une acoustique bizarre. Mais Romain n\'est pas revenu de sa visite du 12."</em>',
      'La derniere entree date de la nuit de la disparition : <em>"Je descends voir. Seul. Si je ne reviens pas, la formule est dans le carnet rouge -- page 47."</em>',
      'Vous cherchez la page 47. Elle a ete arrachee.'
    ],
    choices: [
      { label: 'Descendre chercher Thomas', tag: 'risque', next: 'descent', mentalDelta: -5 },
      { label: 'Trouver d\'abord ce "Romain" qui a disparu avant Thomas', tag: 'enquete', next: 'find_romain', log: 'Priorite: retrouver Romain de l\'Atelier.' }
    ]
  },

  find_help: {
    location: 'Lyon, Vieux-Lyon',
    chapter: 'Chapitre I -- La descente',
    title: 'Renfort.',
    paragraphs: [
      'Vous appelez Marie. Elle decroche a la premiere sonnerie. Vous lui dites ce que vous avez trouve.',
      'Un silence. Puis : <em>"Il y a quelqu\'un que vous devriez rencontrer. Un des membres de l\'Atelier. Il veut parler. Mais pas au telephone."</em>',
      'Rendez-vous fixe dans une heure, cafe de la Croix-Rousse.'
    ],
    choices: [
      { label: 'Aller au rendez-vous', tag: 'action', next: 'meet_atelier_member', log: 'Rendez-vous avec un membre de l\'Atelier.' }
    ]
  },

  find_romain: {
    location: 'Lyon, Croix-Rousse',
    chapter: 'Chapitre I -- La descente',
    title: 'Romain.',
    paragraphs: [
      'Marie Fontaine connait le nom de Romain : Romain Viguier, 25 ans, etudiant en anthropologie. Elle vous donne son adresse -- une chambre de bonne rue Leynaud.',
      'Vous sonnez. Personne. La voisine de palier vous explique, defiante, que Romain n\'est pas la depuis plusieurs jours. Mais il n\'a pas l\'air parti -- ses affaires sont encore la, elle a entendu sa musique le matin du 12.',
      'Le 12. La date mentionnee dans le carnet de Thomas.',
      'Romain a disparu deux jours avant Thomas. <em>Il y a un troisieme absent, au moins.</em>'
    ],
    choices: [
      { label: 'Inspecter la chambre de Romain', tag: 'enquete', next: 'romain_room', log: 'Romain Viguier : disparu le 12. Avant Thomas.' },
      { label: 'Aller directement a la traboule', tag: 'action', next: 'descent', mentalDelta: -3 }
    ]
  },

  romain_room: {
    location: 'Lyon, Croix-Rousse -- Rue Leynaud',
    chapter: 'Chapitre I -- La descente',
    title: 'La chambre de Romain.',
    paragraphs: [
      'La voisine vous ouvre avec un passe. La chambre est en ordre -- mais avec cette qualite particuliere de l\'ordre force, comme si quelqu\'un avait voulu que tout ait l\'air normal.',
      'Sur le bureau : un ordinateur eteint, des livres d\'anthropologie, une tasse de cafe a moitie pleine depuis plusieurs jours. Et une carte -- une carte manuscrite du Vieux-Lyon, avec des passages annotes en rouge. Certains ont des croix. D\'autres ont des points d\'interrogation.',
      'Au bas de la carte, une note : <em>"Ne pas utiliser l\'entree principale. L\'acces par la cour Dumont evite le niveau -2. Le niveau -2 n\'est pas sur."</em>',
      'Vous prenez la carte.'
    ],
    addItems: ['Carte de Romain (traboules)'],
    choices: [
      { label: 'Se rendre a la traboule en utilisant la carte', tag: 'action', next: 'descent_safe', log: 'Carte de Romain recuperee. Entree alternative identifiee.' },
      { label: 'Signaler la disparition de Romain a la police', tag: 'prudence', next: 'police_report', suspicionDelta: 8 }
    ]
  },

  police_report: {
    location: 'Lyon, Commissariat du 1er',
    chapter: 'Chapitre I -- La descente',
    title: 'Commissariat.',
    paragraphs: [
      'L\'accueil vous remercie de votre signalement. On vous dit que l\'affaire Thomas Fontaine est "en cours de traitement". On prend note du nom de Romain Viguier.',
      'Un inspecteur sort de son bureau -- la quarantaine, les yeux du type qui dort pas assez. Il vous reconnait, ou il croit vous reconnaitre. Il vous demande en quoi vous etes concerne.',
      'Vous lui dites : detective prive, mission en cours. Il hoche la tete avec l\'expression de quelqu\'un qui prefererait que vous n\'existiez pas.',
      '"Ne descendez pas dans ces traboules. On a retrouve quelqu\'un dans un etat... difficile. Ce n\'est pas une scene de crime ordinaire."',
      'Il ne vous dit pas autre chose. Mais il vous surveille sortir.'
    ],
    choices: [
      { label: 'Se rendre quand meme a la traboule', tag: 'action', next: 'descent', suspicionDelta: 5, log: 'Commissariat: avertissement de l\'inspecteur. Descend quand meme.' },
      { label: 'Utiliser la carte de Romain pour eviter les niveaux surveilles', tag: 'prudence', next: 'descent_safe', log: 'Utilise la carte de Romain. Entree alternative.' }
    ]
  },

  meet_atelier_member: {
    location: 'Lyon, Croix-Rousse -- Cafe Thiaffait',
    chapter: 'Chapitre I -- La descente',
    title: 'Le membre de l\'Atelier.',
    paragraphs: [
      'Il s\'appelle Julien. Trente ans, doctorat en cours, l\'air de quelqu\'un qui n\'a pas dormi depuis plusieurs nuits. Il boit son cafe froid sans s\'en apercevoir.',
      '"Thomas n\'etait pas suppose descendre seul. Personne ne descend seul. C\'est la regle numero un de l\'Atelier, depuis que Romain..."',
      'Il s\'arrete. Il reprend. <em>"Depuis que Romain est alle au niveau -2 et qu\'il n\'est pas revenu. On l\'a retrouve deux jours apres. Il respirait. Il ouvrait les yeux. Mais il ne... il n\'etait plus la."</em>',
      '"Vous voulez savoir ce qu\'il y a en bas ? Je ne sais pas. Mais les anciens textes -- les registres que Thomas avait trouves -- ils parlent de quelque chose qui <em>attend</em>. Quelque chose qui utilise les reves comme entree."',
      'Vous payez les cafes.'
    ],
    addItems: ['Notes: temoignage de Julien'],
    choices: [
      { label: 'Descendre maintenant, avec les informations de Julien', tag: 'action', next: 'descent_safe', occulteBonus: 5, log: 'Temoignage de Julien. Connaissance occulte +5.' },
      { label: 'Demander a Julien de vous accompagner', tag: 'action', next: 'descent_with_julien', log: 'Julien accepte de vous accompagner.' }
    ]
  },

  /* ----------------------------------------------------------
     ACTE 3 : LES PROFONDEURS
  ---------------------------------------------------------- */

  descent: {
    location: 'Lyon, Vieux-Lyon -- Niveau -1',
    chapter: 'Chapitre I -- Les profondeurs',
    title: 'Sous la rue.',
    paragraphs: [
      'Les marches descendent plus bas que vous ne l\'auriez cru. La pierre change de texture -- plus ancienne, plus irreguliere. Pas XIXe siecle. Peut-etre medieval. Peut-etre avant.',
      'La temperature baisse. Votre lampe commence a trembler. Pas a cause de la batterie -- elle est pleine. Elle tremble parce que votre main tremble.',
      'Et puis vous le voyez sur le sol : un telephone. Ecran fele, mais allume. Fond d\'ecran : une photo de Marie et Thomas, souriants devant le Vieux-Lyon.',
      '<em>Thomas est ici. Ou il y etait.</em>'
    ],
    addItems: ['Tel. de Thomas (brise)'],
    choices: [
      { label: 'Continuer plus loin dans le couloir', tag: 'risque', next: 'corridor', mentalDelta: -10 },
      { label: 'Appeler Marie -- vous avez trouve le telephone de Thomas', tag: 'action', next: 'corridor', mentalDelta: -5, log: 'Informe Marie. Telephone de Thomas retrouve.' }
    ]
  },

  descent_safe: {
    location: 'Lyon, Vieux-Lyon -- Cour Dumont',
    chapter: 'Chapitre I -- Les profondeurs',
    title: 'Entree alternative.',
    paragraphs: [
      'La carte de Romain vous mene a travers une cour interieure, puis dans un passage non balise qui contourne les premiers niveaux. Vous arrivez directement au niveau -1 sans croiser personne.',
      'La pierre ici est differente. Plus ancienne. L\'air a gout de craie et de quelque chose d\'autre -- presque metallique.',
      'A votre droite : un telephone sur le sol. Ecran fele, fond d\'ecran : Marie et Thomas souriants. A votre gauche : le couloir s\'enfonce dans l\'obscurite.'
    ],
    addItems: ['Tel. de Thomas (brise)'],
    choices: [
      { label: 'Avancer dans le couloir', tag: 'action', next: 'corridor' },
      { label: 'Examiner le telephone de Thomas', tag: 'enquete', next: 'examine_phone', log: 'Examine le telephone de Thomas.' }
    ]
  },

  descent_with_julien: {
    location: 'Lyon, Vieux-Lyon -- Niveau -1',
    chapter: 'Chapitre I -- Les profondeurs',
    title: 'Sous la rue, a deux.',
    paragraphs: [
      'Julien s\'arrete deux fois dans les escaliers. Il respire fort. Vous attendez.',
      '"La derniere fois que je suis descendu ici, j\'avais Thomas a cote de moi. Il prenait des notes. Il trouvait ca beau."',
      'Vous trouvez le telephone de Thomas sur le sol. Julien le voit et ferme les yeux pendant plusieurs secondes.',
      '"Il est en bas. Je le sais. La meme chose qui a pris Romain l\'a pris aussi. Elle..." Il s\'arrete. <em>"Elle choisit les gens qui ecoutent."</em>'
    ],
    addItems: ['Tel. de Thomas (brise)'],
    choices: [
      { label: 'Avancer avec Julien', tag: 'action', next: 'corridor', mentalDelta: 5, log: 'Julien presente. Soutien moral. Mental +5.' }
    ]
  },

  examine_phone: {
    location: 'Lyon, Vieux-Lyon -- Niveau -1',
    chapter: 'Chapitre I -- Les profondeurs',
    title: 'Le telephone de Thomas.',
    paragraphs: [
      'L\'ecran est fele mais le telephone fonctionne encore -- il est en mode avion. La batterie est a 8%.',
      'Dans la galerie photo : la derniere image, prise six minutes avant minuit. Un couloir plus profond que celui ou vous etes. Une silhouette de dos, eclairee par une lumiere froide.',
      'Ce n\'est pas Thomas -- la silhouette est trop grande, trop droite. Et elle ne projette pas d\'ombre.',
      'Vous eteignez l\'ecran. Vous remettez le telephone dans votre poche. Vous avancez.'
    ],
    choices: [
      { label: 'Avancer vers le niveau -2', tag: 'action', next: 'corridor', mentalDelta: -8, log: 'Photo sur le tel. de Thomas: silhouette sans ombre. Mental -8.' }
    ]
  },

  corridor: {
    location: 'Lyon, Vieux-Lyon -- Niveau -1, couloir principal',
    chapter: 'Chapitre I -- Les profondeurs',
    title: 'Ce qui attend dans le noir.',
    paragraphs: [
      'Au bout du couloir, votre lampe s\'eteint completement.',
      'Pas une panne. Pas une batterie vide. Vous avez appuye sur le bouton. Rien.',
      'Dans le noir total, vous entendez -- tres clairement, tres pres -- quelqu\'un qui respire.',
      'Et une voix, basse, qui murmure quelque chose en latin.',
      '<em>La meme formule que sur le mur.</em>',
      'Vous n\'etes plus sceptique du tout.'
    ],
    choices: [
      { label: '[ Fin du Chapitre I -- La suite bientot ]', tag: 'fin', next: null, disabled: true }
    ]
  }

};
