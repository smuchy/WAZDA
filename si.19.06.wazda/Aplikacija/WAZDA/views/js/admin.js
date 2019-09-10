crtajGodine();
crtajGodineSudjenja();
crtajGodineDelegata();
crtajGodineSekretara();

function crtajGodine() {
  const selekt = document.getElementById("godinaRod");

  for (let i = 1920; i < 2020; i++) {
    let opcija = document.createElement("option");
    opcija.value = i;
    opcija.innerHTML = i;
    selekt.appendChild(opcija);
  }
}

function crtajGodineSudjenja() {
  const selekt = document.getElementById("godinaSud");

  for (let i = 1920; i < 2020; i++) {
    let opcija = document.createElement("option");
    opcija.value = i;
    opcija.innerHTML = i;
    selekt.appendChild(opcija);
  }
}

function crtajGodineDelegata() {
  const selekt = document.getElementById("godinaRodDelegata");

  for (let i = 1920; i < 2020; i++) {
    let opcija = document.createElement("option");
    opcija.value = i;
    opcija.innerHTML = i;
    selekt.appendChild(opcija);
  }
}

function crtajGodineSekretara() {
  const selekt = document.getElementById("godinaRodSekretara");

  for (let i = 1920; i < 2020; i++) {
    let opcija = document.createElement("option");
    opcija.value = i;
    opcija.innerHTML = i;
    selekt.appendChild(opcija);
  }
}
