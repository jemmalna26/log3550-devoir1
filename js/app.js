const champRecherche = document.getElementById("recherche");
const compteur = document.getElementById("compteur");
const filtreCategorie = document.getElementById("filtre-categorie");
const filtreDispo = document.getElementById("filtre-dispo");
const choixTri = document.getElementById("tri");
const formulaire = document.getElementById("formulaire-ajout");

let livres = [...livresDeDepart];
const listeLivres = document.getElementById("liste-livres");

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

  carte.append(titre, auteur, etiquette);
  return carte;
}

function afficherLivres(livres) {
  listeLivres.innerHTML = "";
  livres.forEach(function (livre) {
    listeLivres.appendChild(creerCarte(livre));
  });
}

function normaliser(texte) {
  return texte.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function livreCorrespond(livre, recherche) {
  const texte = normaliser(livre.titre + " " + livre.auteur);
  return texte.includes(normaliser(recherche));
}

function livrePasseLesFiltres(livre) {
  const categorieOk = filtreCategorie.value === "" || livre.categorie === filtreCategorie.value;
  const dispoOk = !filtreDispo.checked || livre.disponible;
  return categorieOk && dispoOk && livreCorrespond(livre, champRecherche.value);
}

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

function ajouterLivre(evenement) {
  evenement.preventDefault();

  const nouveauLivre = {
    id: prochainId(),
    titre: document.getElementById("titre").value.trim(),
    auteur: document.getElementById("auteur").value.trim(),
    annee: Number(document.getElementById("annee").value),
    categorie: document.getElementById("categorie").value,
    disponible: document.getElementById("disponible").checked
  };

  livres.push(nouveauLivre);
  formulaire.reset();
  mettreAJourAffichage();
}

champRecherche.addEventListener("input", mettreAJourAffichage);
filtreCategorie.addEventListener("change", mettreAJourAffichage);
filtreDispo.addEventListener("change", mettreAJourAffichage);
choixTri.addEventListener("change", mettreAJourAffichage);
formulaire.addEventListener("submit", ajouterLivre);

mettreAJourAffichage();