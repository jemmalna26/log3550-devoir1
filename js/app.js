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

afficherLivres(livresDeDepart);