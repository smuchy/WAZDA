vratiSve();
document.getElementById("pretraga").onkeyup = ev => pretraga();
document.getElementById("dugmePrve").onclick = ev => sortiranje(ev);
document.getElementById("dugmeDruge").onclick = ev => sortiranje(ev);
document.getElementById("dugmeMladjih").onclick = ev => sortiranje(ev);
document.getElementById("dugmeCicibani").onclick = ev => sortiranje(ev);

function vratiSve() {
  fetch("http://localhost:3000/vratiSudije")
    .then(response => {
      if (!response.ok)
        throw new Error("Greska u povezivanju sa bazom " + response.statusText);
      else {
        return response.json();
      }
    })
    .then(data => crtajKarticu(data))
    .catch(error => console.log("Greska u povlacenju podataka " + error));
}

//funkcija koja iscrtava karticu jednog sudije
function crtajKarticu(data) {
  data.data.forEach(el => {
    const kontejner = document.getElementById("grid-container");

    const card = document.createElement("div");
    card.className = "card";
    card.id = el.username;
    kontejner.appendChild(card);

    const slika = document.createElement("img");
    slika.className = "slika";
    slika.src = el.slika;
    slika.alt = "Avatar";
    slika.style.width = "80%";
    slika.style.margin = "20px";

    card.appendChild(slika);

    const info = document.createElement("div");
    info.className = "sudijaInfo";
    card.appendChild(info);

    const ime = document.createElement("h6");
    ime.className = "imeSudije";
    ime.innerHTML = el.ime + " " + el.prezime;
    ime.style.margin = "0px 0px 0px 10px";
    info.appendChild(ime);

    const job = document.createElement("p");
    job.innerHTML = el.ime_lige;
    job.className = "imeLige";
    job.id = el.ime_lige;
    job.style.margin = "0px 0px 0px 10px";
    info.appendChild(job);

    document.getElementById(el.username).onclick = ev => myInfo(el, kontejner);
  });
}

function myInfo(el, kontejner) {
  const modal = document.createElement("div");
  modal.className = "pop";
  modal.id = "myPop" + el.username;
  kontejner.appendChild(modal);
  modal.onclick = ev => {
    modal.style.display = "none";
  };

  const kont = document.createElement("div");
  kont.className = "pop-content";
  modal.appendChild(kont);

  const span = document.createElement("span");
  span.className = "close";
  span.innerHTML = "x";
  kont.appendChild(span);
  span.onclick = ev => {
    modal.style.display = "none";
  };

  const head = document.createElement("div");
  head.className = "pricing-heading";
  kont.appendChild(head);

  const name = document.createElement("h3");
  name.innerHTML = el.ime + " " + el.prezime;
  head.appendChild(name);

  const slikaDiv = document.createElement("div");
  slikaDiv.className = "pricing-terms";
  kont.appendChild(slikaDiv);

  const slika = document.createElement("img");
  slika.className = "slika";
  slika.src = el.slika;
  slika.alt = "Avatar";
  slika.style.width = "100%";
  slikaDiv.appendChild(slika);

  const infoDiv = document.createElement("div");
  infoDiv.className = "pricing-content";
  kont.appendChild(infoDiv);

  const lista = document.createElement("ul");
  infoDiv.appendChild(lista);

  info = document.createElement("li");
  info.innerHTML = "Godinja rođenja: " + el.godina_rodjenja;
  lista.appendChild(info);

  info = document.createElement("li");
  info.innerHTML = "Broj telefona: " + el.br_telefona;
  lista.appendChild(info);

  info = document.createElement("li");
  info.innerHTML = "Kategorija: " + el.opis;
  lista.appendChild(info);

  info = document.createElement("li");
  info.innerHTML = "Liga: " + el.ime_lige;
  lista.appendChild(info);
}

function pretraga() {
  var value = document.getElementById("pretraga").value.toUpperCase();
  var card = document.getElementsByClassName("card");
  var ime = document.getElementsByClassName("imeSudije");
  Array.from(ime).forEach((el, index) => {
    if (el.innerHTML.toUpperCase().indexOf(value) > -1) {
      card[index].style.display = "block";
    } else {
      card[index].style.display = "none";
    }
  });
}

function sortiranje(ev) {
  var card = document.getElementsByClassName("card");
  var liga = document.getElementsByClassName("imeLige");
  if (event.target.id == "dugmePrve") {
    Array.from(liga).forEach((el, index) => {
      if (el.id === "Prva Niska") {
        card[index].style.display = "block";
      } else {
        card[index].style.display = "none";
      }
    });
  } else if (event.target.id == "dugmeDruge") {
    Array.from(liga).forEach((el, index) => {
      if (el.id === "Druga Niska") {
        card[index].style.display = "block";
      } else {
        card[index].style.display = "none";
      }
    });
  } else if (event.target.id == "dugmeMladjih") {
    Array.from(liga).forEach((el, index) => {
      if (el.id === "Mladje Kategorije") {
        card[index].style.display = "block";
      } else {
        card[index].style.display = "none";
      }
    });
  } else if (event.target.id == "dugmeCicibani") {
    Array.from(liga).forEach((el, index) => {
      if (el.id === "Cicibani") {
        card[index].style.display = "block";
      } else {
        card[index].style.display = "none";
      }
    });
  }
}
