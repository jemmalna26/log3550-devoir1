# Catalogue de bibliothèque

Devoir 1 du cours LOG3550 Développement web (ISTEAH), travail individuel.

## Description

Frontend d'une application web de catalogue de bibliothèque, écrit en HTML, CSS et JavaScript pur, sans framework. On peut consulter des livres, les rechercher, les filtrer, les trier, en ajouter et en supprimer.

## Mode d'emploi

1. Ouvrir le fichier `index.html` dans un navigateur récent.
2. Utiliser la barre de recherche pour chercher par titre ou par auteur (les accents et les majuscules sont ignorés).
3. Filtrer par catégorie, ou cocher « Disponibles seulement ». Les trois critères fonctionnent ensemble.
4. Choisir un tri par titre ou par année, croissant ou décroissant.
5. Ajouter un livre avec le formulaire du bas : tous les champs sont vérifiés avant l'ajout.
6. Supprimer un livre avec le bouton « Supprimer » de sa carte, après confirmation.
7. Le bouton « Réinitialiser » remet les 8 livres de départ.

Les ajouts et suppressions sont conservés dans le navigateur (`localStorage`).

## Choix de conception

- **HTML sémantique** : j'ai structuré la page avec `header`, `nav`, `main`, `section` et `footer`, et relié chaque champ du formulaire à son `label`.
- **Variables CSS** : les couleurs et les espacements sont définis une seule fois dans `:root`, ce qui permet de changer l'apparence en modifiant une seule ligne.
- **Mobile d'abord** : le style de base est celui du téléphone (une colonne), puis deux points de rupture (600px et 960px) passent à deux, puis trois colonnes avec CSS Grid.
- **Cartes créées en JavaScript** : chaque carte est fabriquée avec `createElement`, à partir du tableau de livres, et non écrite à la main dans le HTML.
- **Une fonction centrale** : `mettreAJourAffichage` applique la recherche, les filtres et le tri ensemble, ce qui évite de répéter du code.
- **Copie des données de départ** : je travaille sur une copie (`livres`) du tableau `livresDeDepart`, ce qui permet au bouton « Réinitialiser » de revenir à l'état initial.
- **Accessibilité** : les messages d'erreur sont annoncés avec `aria-live`, l'état « Disponible » ou « Emprunté » est écrit en toutes lettres (pas seulement en couleur), et les éléments ont un contour visible au clavier.
- **Sauvegarde** : la liste est enregistrée dans `localStorage` au format JSON, avec une protection si les données sont abîmées.

## Difficultés rencontrées

- **Captures d'écran adaptatives** : j'ai d'abord changé la hauteur au lieu de la largeur dans le mode appareil du navigateur, donc la page restait sur trois colonnes. J'ai compris que le premier nombre est la largeur et j'ai refait la capture.
- **Ordre des lignes dans `app.js`** : j'utilisais la variable `formulaire` avant de la créer, ce qui bloquait le programme et rechargeait la page au clic sur « Ajouter ». J'ai déplacé les déclarations en haut du fichier.
- **Commits vides** : mon README a été commité vide parce que le fichier n'était pas enregistré (`Ctrl + S`). Je vérifie maintenant qu'il n'y a plus de point blanc sur l'onglet avant chaque `git add`.
- **Commandes Git** : j'avais oublié les deux tirets de `--global` dans la configuration, ce qui donnait une erreur.

## Réponses aux questions d'explication

### Pourquoi les balises sémantiques plutôt qu'une suite de div ?

Les balises sémantiques (`header`, `nav`, `main`, `footer`) disent ce que contient chaque partie de la page, alors qu'un `div` ne dit rien.

- **Accessibilité** : un lecteur d'écran annonce « navigation » ou « contenu principal », et l'utilisateur peut aller directement à la partie qui l'intéresse.
- **Référencement** : les moteurs de recherche comprennent mieux la structure de la page et repèrent le contenu important grâce à `main` et `h1`.
- **Maintenance** : le code se lit plus facilement, car le nom de la balise indique son rôle sans qu'il faille deviner.

Dans mon projet, j'ai utilisé `header`, `nav`, `main`, `section` et `footer` pour ces trois raisons.

### Différence entre map, filter et forEach

- `forEach` parcourt un tableau et exécute une action pour chaque élément, mais elle ne renvoie rien.
- `filter` renvoie un nouveau tableau qui contient seulement les éléments qui passent un test.
- `map` renvoie un nouveau tableau de même taille, où chaque élément a été transformé.

J'ai utilisé `filter` pour la recherche et le filtrage, car il faut garder seulement les livres qui correspondent aux critères. J'ai utilisé `forEach` pour afficher les cartes et `map` pour calculer le prochain identifiant.

## Sources et outils utilisés

- **Éditeur et versionnement** : Visual Studio Code, Git.
- **Validation** : validateur HTML du W3C (validator.w3.org).
- **Navigateur** : Microsoft Edge, avec ses outils de développement pour les captures d'écran adaptatives.
- **Outil d'assistance (IA)** : j'ai utilisé Claude (Anthropic) comme guide. Il m'a expliqué les notions et proposé des exemples de code que j'ai tapés, testés dans le navigateur et corrigés en cas d'erreur. Je m'engage à pouvoir expliquer chaque partie du code.
- **Images et polices** : aucune image ni bibliothèque externe n'a été utilisée.
