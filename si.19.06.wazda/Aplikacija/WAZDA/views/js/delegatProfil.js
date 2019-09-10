vratiPodatke();
document.getElementById("editProfil").onclick = ev => editProfil();
document.getElementById("oceniSudiju").onclick = ev => vratiUtakmice();

function crtajGodine(name) {
  for (let i = 1950; i < 2020; i++) {
    let opcija = document.createElement("option");
    opcija.innerHTML = i;
    opcija.value = i;
    name.appendChild(opcija);
  }
}

//vraca podatke ulogovanog delegata
function vratiPodatke() {
  fetch("http://localhost:3000/vratiDelegata")
    .then(response => {
      if (!response.ok)
        throw new Error("Greska u povezivanju! " + response.statusText);
      else {
        return response.json();
      }
    })
    .then(data => crtajDelegata(data))
    .catch(error => console.log("Greska u radu sa bazom! " + error.statusText));
}

//crta profil delegata
function crtajDelegata(data) {
  const delegat = data.data[0];
  const username = document.getElementById("usernameDelegata");
  const ime = document.getElementById("imeDelegata");
  const zvanje = document.getElementById("zvanjeDelegata");
  const email = document.getElementById("emailDelegata");
  const br_telefona = document.getElementById("telefonDelegata");
  const ime2 = document.getElementById("imeDelegata2");
  const prezime2 = document.getElementById("prezimeDelegata");
  const zvanje2 = document.getElementById("zvanjeDelegata2");
  const godina_rodjenja = document.getElementById("godinaRodjenja");
  const br_telefona2 = document.getElementById("telefonDelegata2");
  const opis = document.getElementById("opisDelegata");
  const slika = document.getElementById("profilnaSlika");

  username.innerHTML = delegat.username;
  ime.innerHTML = delegat.ime + " " + delegat.prezime;
  zvanje.innerHTML = delegat.zvanje;
  email.innerHTML = delegat.email;
  br_telefona.innerHTML = delegat.br_telefona;
  ime2.innerHTML = delegat.ime;
  prezime2.innerHTML = delegat.prezime;
  zvanje2.innerHTML = delegat.zvanje;
  godina_rodjenja.innerHTML = delegat.godina_rodjenja;
  br_telefona2.innerHTML = delegat.br_telefona;
  opis.innerHTML = delegat.opis;
  slika.src = delegat.slika;
}

//edit profila delegata
function editProfil() {
  const kontejner = document.getElementById("popKont");
  const modal = document.createElement("div");
  modal.className = "pop";
  modal.id = "myPop";
  kontejner.appendChild(modal);

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

  let labela = document.createElement("h4");
  labela.innerHTML = "Profil ";
  labela.id = "inner-headline";
  labela.className = "span8";
  labela.style.width = "90%";
  head.appendChild(labela);

  const info = document.createElement("div");
  info.className = "pricing-terms";
  kont.appendChild(info);

  let br = document.createElement("br");
  info.appendChild(br);

  br = document.createElement("br");
  info.appendChild(br);

  labela = document.createElement("h6");
  labela.innerHTML = "Ime: ";
  info.appendChild(labela);

  let name = document.createElement("input");
  name.type = "text";
  name.placeholder = "Enter new name";
  name.id = "novoImeDelegata";
  info.appendChild(name);

  let linija = document.createElement("hr");
  info.appendChild(linija);

  labela = document.createElement("h6");
  labela.innerHTML = "Prezime: ";
  info.appendChild(labela);

  name = document.createElement("input");
  name.type = "text";
  name.placeholder = "Enter new name";
  name.id = "novoPrezimeDelegata";
  info.appendChild(name);

  linija = document.createElement("hr");
  info.appendChild(linija);

  labela = document.createElement("label");
  labela.innerHTML = "Broj telefona: ";
  info.appendChild(labela);

  name = document.createElement("input");
  name.type = "text";
  name.placeholder = "Enter phone number";
  name.id = "noviBrojTelefonaDelegata";
  info.appendChild(name);

  linija = document.createElement("hr");
  info.appendChild(linija);

  labela = document.createElement("label");
  labela.innerHTML = "Email: ";
  info.appendChild(labela);

  name = document.createElement("input");
  name.type = "text";
  name.placeholder = "Enter email address";
  name.id = "noviEmailDelegata";
  info.appendChild(name);

  linija = document.createElement("hr");
  info.appendChild(linija);

  labela = document.createElement("label");
  labela.innerHTML = "Opis: ";
  info.appendChild(labela);

  name = document.createElement("textarea");
  name.type = "text";
  name.placeholder = "Enter description";
  name.id = "noviOpisDelegata";
  info.appendChild(name);

  linija = document.createElement("hr");
  info.appendChild(linija);

  const sacuvaj = document.createElement("button");
  sacuvaj.innerHTML = "Sacuvaj promene";
  sacuvaj.id = "sacuvajPromene";
  info.appendChild(sacuvaj);
  sacuvaj.className = "btn btn-inverse";

  sacuvaj.onclick = ev => updateDelegata();
}

function sakrijPop() {
  const kontejner = document.getElementById("myPop");
  kontejner.style.display = "none";
}

//slanje upisanih podataka za upis u bazu
function updateDelegata() {
  const ime = document.getElementById("novoImeDelegata").value;
  const prezime = document.getElementById("novoPrezimeDelegata").value;
  const opis = document.getElementById("noviOpisDelegata").value;
  const broj_telefona = document.getElementById("noviBrojTelefonaDelegata")
    .value;
  const email = document.getElementById("noviEmailDelegata").value;

  const formFetch = {
    method: "post",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      ime: ime,
      prezime: prezime,
      opis: opis,
      br_telefona: broj_telefona,
      email: email
    })
  };
  fetch("http://localhost:3000/updateDelegata", formFetch)
    .then(response => {
      if (!response.ok)
        throw new Error(
          "Greska u povezivanju sa serverom! " + response.statusText
        );
      else {
        return response.json();
      }
    })
    .then(vratiPodatke())
    .then(sakrijPop())
    .catch(error => console.log("Greska u radu sa bazom!" + error));
}

//fetch funkcija vraca sve utakmice na kojima je ocena sudije nula
function vratiUtakmice() {
  fetch("http://localhost:3000/vratiBezOcene")
    .then(response => {
      if (!response.ok)
        throw new Error("Greska u povezivanju! " + response.statusText);
      else {
        return response.json();
      }
    })
    .then(data => oceniSudiju(data))
    .catch(error => console.log("Greska u povracaju podataka! " + error));
}

function oceniSudiju(data) {
  const kontejner = document.getElementById("oceniPop");
  const modal = document.createElement("div");
  modal.className = "pop";
  modal.id = "myPop2";
  kontejner.appendChild(modal);

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

  let labela = document.createElement("h4");
  labela.innerHTML = "Ocenjivanje sudije ";
  labela.id = "inner-headline";
  labela.className = "span8";
  labela.style.width = "90%";
  head.appendChild(labela);

  const info = document.createElement("div");
  info.className = "pricing-terms";
  kont.appendChild(info);

  let br = document.createElement("br");
  info.appendChild(br);

  br = document.createElement("br");
  info.appendChild(br);

  br = document.createElement("br");
  info.appendChild(br);

  const tabela = document.createElement("table");
  tabela.className = "table-hover table";
  info.appendChild(tabela);

  let tabelaHTML =
    "<thead><th>Domaca ekipa</th><th>Rezultat</th><th>Gostujuca ekipa</th><th>Datum</th><th>Liga</th><th>Oceni sudiju</th></thead><tbody>";
  data.data.forEach(el => {
    tabelaHTML +=
      "<tr><td>" +
      el.domaci +
      "</td><td>" +
      el.rezultat +
      "</td><td>" +
      el.gosti +
      "</td><td>" +
      el.datum +
      "</td><td>" +
      el.ime_lige +
      "</td><td><input type='radio' name='izaberiSudiju' value=" +
      el.id_utakmice +
      " id=" +
      el.id_sudije +
      "></td></tr>";
  });

  tabelaHTML += "</body>";
  tabela.innerHTML = tabelaHTML;

  let linija = document.createElement("hr");
  info.appendChild(linija);

  labela = document.createElement("label");
  labela.innerHTML = "Ocena: ";
  info.appendChild(labela);

  let name = document.createElement("span");
  name.id = "spanOcena";
  info.appendChild(name);

  for (let i = 1; i < 6; i++) {
    let zvezda = document.createElement("i");
    zvezda.className = "icon-star-empty icon-48";
    zvezda.style.color = "yellow";
    zvezda.value = i;
    zvezda.onclick = ev => crtajZvezdice(zvezda);
    name.appendChild(zvezda);
  }

  linija = document.createElement("hr");
  info.appendChild(linija);

  const sacuvaj = document.createElement("button");
  sacuvaj.innerHTML = "Sacuvaj promene";
  sacuvaj.id = "sacuvajPromene";
  info.appendChild(sacuvaj);
  sacuvaj.className = "btn btn-inverse";

  sacuvaj.onclick = ev => sacuvajPodatke();
}

function crtajZvezdice(zvezda) {
  niz = document.getElementsByClassName("icon-star-empty icon-48");
  Array.from(niz).forEach(el => {
    if (el.value <= zvezda.value) {
      el.className = "icon-star icon-48";
    }
  });

  niz2 = document.getElementsByClassName("icon-star icon-48");
  Array.from(niz2).forEach(el => {
    if (el.value > zvezda.value) {
      el.className = "icon-star-empty icon-48";
    }
  });
}

function sakrijPop2() {
  document.getElementById("myPop2").remove();
}

//slanje podataka u bazu
function sacuvajPodatke() {
  const id_utakmice = document.querySelector(
    "input[name='izaberiSudiju']:checked"
  ).value;
  const ocena_sudije = document.getElementsByClassName("icon-star icon-48")
    .length;
  const id_sudije = document.querySelector(
    "input[name='izaberiSudiju']:checked"
  ).id;

  const formFetch = {
    method: "post",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      id_utakmice: id_utakmice,
      ocena_sudije: ocena_sudije,
      id_sudije: id_sudije
    })
  };
  fetch("http://localhost:3000/ocenaSudije", formFetch)
    .then(response => {
      if (!response.ok)
        throw new Error(
          "Greska u povezivanju sa serverom! " + response.statusText
        );
      else {
        return response.json();
      }
    })
    .then(vratiPodatke())
    .then(sakrijPop2())
    .catch(error => console.log("Greska u radu sa bazom!" + error));
}
