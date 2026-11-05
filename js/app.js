const champRecherche = document.getElementById("recherche");
const compteur = document.getElementById("compteur");
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

function mettreAJourAffichage() {
  const resultats = livresDeDepart.filter(function (livre) {
    return livreCorrespond(livre, champRecherche.value);
  });

  afficherLivres(resultats);

  if (resultats.length === 0) {
    compteur.textContent = "Aucun livre ne correspond à votre recherche.";
  } else {
    compteur.textContent = resultats.length + (resultats.length === 1 ? " livre trouvé" : " livres trouvés");
  }
}

champRecherche.addEventListener("input", mettreAJourAffichage);

mettreAJourAffichage();