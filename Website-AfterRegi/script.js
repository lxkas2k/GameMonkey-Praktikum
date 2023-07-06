const tabTitle = document.getElementById("tab-title");
let counter = 1;

function animateTabTitle() {
  const titles = ["Spieleseite", "2023", "Login"]; // Array mit animierten Titeln
  tabTitle.innerText = titles[counter % titles.length];
  counter++;
}

setInterval(animateTabTitle, 1000); // Aktualisiere den Titel alle 1 Sekunde

