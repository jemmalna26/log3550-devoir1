// Éléments de la page utilisés par le script
const champRecherche = document.getElementById("recherche");
const compteur = document.getElementById("compteur");
const filtreCategorie = document.getElementById("filtre-categorie");
const filtreDispo = document.getElementById("filtre-dispo");
const choixTri = document.getElementById("tri");
const formulaire = document.getElementById("formulaire-ajout");
const boutonReinitialiser = document.getElementById("btn-reinitialiser");

const CLE_STOCKAGE = "catalogue-livres";

// Lit la liste sauvegardée dans le navigateur, ou renvoie les livres de départ si elle n'existe pas ou est illisible.
function chargerLivres() {
  const sauvegarde = localStorage.getItem(CLE_STOCKAGE);
  if (sauvegarde === null) {
    return [...livresDeDepart];
  }
  try {
    return JSON.parse(sauvegarde);
  } catch (erreur) {
    return [...livresDeDepart];
  }
}

// Enregistre la liste actuelle dans le navigateur (localStorage), au format texte JSON.
function sauvegarderLivres() {
  localStorage.setItem(CLE_STOCKAGE, JSON.stringify(livres));
}

let livres = chargerLivres();
const listeLivres = document.getElementById("liste-livres");

// Crée la carte d'un livre : titre, auteur, étiquette d'état et bouton Supprimer.
function creerCarte(livre) {
  const carte = document.createElement("article");
  carte.className = "carte";

  const titre = document.createElement("h3");
  titre.textContent = livre.titre;

  const auteur = document.createElement("p");
  auteur.textContent = livre.auteur + " (" + livre.annee + ")";

    const etiquette = document.createElement("span");
  etiquette.className = livre.disponible ? "etiquette etiquette-dispo" : "etiquette etiquette-emprunte";
  etiquette.textContent = livre.disponible ? "Disponible" : "Emprunté";

    const boutonSupprimer = document.createElement("button");
  boutonSupprimer.type = "button";
  boutonSupprimer.className = "bouton-supprimer";
  boutonSupprimer.textContent = "Supprimer";
  boutonSupprimer.setAttribute("aria-label", "Supprimer le livre " + livre.titre);
  boutonSupprimer.addEventListener("click", function () {
    supprimerLivre(livre);
  });

  carte.append(titre, auteur, etiquette, boutonSupprimer);
  return carte;
}

// Vide la liste affichée, puis ajoute une carte par livre.
function afficherLivres(livres) {
  listeLivres.innerHTML = "";
  livres.forEach(function (livre) {
    listeLivres.appendChild(creerCarte(livre));
  });
}

// Met un texte en minuscules et retire les accents, pour comparer sans tenir compte de la casse ni des accents.
function normaliser(texte) {
  return texte.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// Vrai si le texte cherché se trouve dans le titre ou dans l'auteur.
function livreCorrespond(livre, recherche) {
  const texte = normaliser(livre.titre + " " + livre.auteur);
  return texte.includes(normaliser(recherche));
}

// Vrai si le livre respecte les trois critères à la fois : recherche, catégorie et disponibilité.
function livrePasseLesFiltres(livre) {
  const categorieOk = filtreCategorie.value === "" || livre.categorie === filtreCategorie.value;
  const dispoOk = !filtreDispo.checked || livre.disponible;
  return categorieOk && dispoOk && livreCorrespond(livre, champRecherche.value);
}

// Trie les livres selon le choix de l'utilisateur : titre ou année, croissant ou décroissant.
function trierLivres(livres) {
  const morceaux = choixTri.value.split("-");
  const champ = morceaux[0];
  const sens = morceaux[1] === "asc" ? 1 : -1;

  return livres.sort(function (a, b) {
    if (champ === "titre") {
      return a.titre.localeCompare(b.titre, "fr") * sens;
    }
    return (a.annee - b.annee) * sens;
  });
}

// Applique les filtres et le tri, puis réaffiche la liste et met à jour le compteur. Appelée à chaque changement.
function mettreAJourAffichage() {
        const resultats = trierLivres(livres.filter(livrePasseLesFiltres));

  afficherLivres(resultats);

  if (resultats.length === 0) {
    compteur.textContent = "Aucun livre ne correspond à votre recherche.";
  } else {
    compteur.textContent = resultats.length + (resultats.length === 1 ? " livre trouvé" : " livres trouvés");
  }
}

function prochainId() {
  const ids = livres.map(function (livre) {
    return livre.id;
  });
  return Math.max(...ids) + 1;
}
function afficherErreur(idChamp, message) {
  document.getElementById("erreur-" + idChamp).textContent = message;
  document.getElementById(idChamp).setAttribute("aria-invalid", message === "" ? "false" : "true");
}

// Vérifie les champs, affiche les messages d'erreur et renvoie vrai si tout est valide.
function validerFormulaire() {
  const anneeCourante = new Date().getFullYear();
  const titre = document.getElementById("titre").value.trim();
  const auteur = document.getElementById("auteur").value.trim();
  const annee = Number(document.getElementById("annee").value);
  const categorie = document.getElementById("categorie").value;

  const erreurs = {
    titre: titre.length < 2 ? "Le titre est obligatoire (au moins 2 caractères)." : "",
    auteur: auteur.length < 2 ? "L'auteur est obligatoire (au moins 2 caractères)." : "",
    annee: annee < 1450 || annee > anneeCourante ? "L'année doit être comprise entre 1450 et " + anneeCourante + "." : "",
    categorie: categorie === "" ? "Veuillez choisir une catégorie." : ""
  };

  Object.keys(erreurs).forEach(function (champ) {
    afficherErreur(champ, erreurs[champ]);
  });

  return Object.values(erreurs).every(function (message) {
    return message === "";
  });
}

// Ajoute un livre si le formulaire est valide, puis sauvegarde et réaffiche la liste.
function ajouterLivre(evenement) {
  evenement.preventDefault();
    if (!validerFormulaire()) {
    return;
  }

  const nouveauLivre = {
    id: prochainId(),
    titre: document.getElementById("titre").value.trim(),
    auteur: document.getElementById("auteur").value.trim(),
    annee: Number(document.getElementById("annee").value),
    categorie: document.getElementById("categorie").value,
    disponible: document.getElementById("disponible").checked
  };

  livres.push(nouveauLivre);
    sauvegarderLivres();
  formulaire.reset();
  mettreAJourAffichage();
}

// Supprime un livre après confirmation de l'utilisateur.
function supprimerLivre(livre) {
  if (!confirm("Supprimer le livre « " + livre.titre + " » ?")) {
    return;
  }

  livres = livres.filter(function (autreLivre) {
    return autreLivre.id !== livre.id;
  });
    sauvegarderLivres();
  mettreAJourAffichage();
}

// Remet les livres de départ après confirmation.
function reinitialiserLivres() {
  if (!confirm("Remettre les livres de départ ? Vos ajouts et suppressions seront perdus.")) {
    return;
  }

  livres = [...livresDeDepart];
  sauvegarderLivres();
  mettreAJourAffichage();
}

// Chaque action de l'utilisateur met à jour l'affichage.
champRecherche.addEventListener("input", mettreAJourAffichage);
filtreCategorie.addEventListener("change", mettreAJourAffichage);
filtreDispo.addEventListener("change", mettreAJourAffichage);
choixTri.addEventListener("change", mettreAJourAffichage);
formulaire.addEventListener("submit", ajouterLivre);
boutonReinitialiser.addEventListener("click", reinitialiserLivres);

mettreAJourAffichage();