const listeLivres = document.getElementById("liste-livres");

function creerCarte(livre) {
  const carte = document.createElement("article");
  carte.className = "carte";

  const titre = document.createElement("h3");
  titre.textContent = livre.titre;

  const auteur = document.createElement("p");
  auteur.textContent = livre.auteur + " (" + livre.annee + ")";

  carte.append(titre, auteur);
  return carte;
}

function afficherLivres(livres) {
  listeLivres.innerHTML = "";
  livres.forEach(function (livre) {
    listeLivres.appendChild(creerCarte(livre));
  });
}

afficherLivres(livresDeDepart);