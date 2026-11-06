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

[À compléter]

## Difficultés rencontrées

[À compléter]

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

## Dépôt Git

[À compléter]