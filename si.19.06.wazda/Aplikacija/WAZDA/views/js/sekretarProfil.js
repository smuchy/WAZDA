vratiPodatke();
const username = document.getElementById("usernameSekretara");
document.getElementById("editProfil").onclick = ev => editProfil();
document.getElementById("kreirajUtakmicu").onclick = ev => kreirajUtakmicu();
function crtajGodine(name) {
  for (let i = 1950; i < 2020; i++) {
    let opcija = document.createElement("option");
    opcija.innerHTML = i;
    opcija.value = i;
    name.appendChild(opcija);
  }
}

function vratiPodatke() {
  fetch("http://localhost:3000/vratiSekretara")
    .then(response => {
      if (!response.ok)
        throw new Error("Greska u povezivanju! " + response.statusText);
      else {
        return response.json();
      }
    })
    .then(data => crtajSekretara(data))
    .catch(error => console.log("Greska u radu sa bazom! " + error.statusText));
}

function crtajSekretara(data) {
  const sekretar = data.data[0];
  const username2 = document.getElementById("usernameSekretara2");
  const ime = document.getElementById("imeSekretara");
  const zvanje = document.getElementById("zvanjeSekretara");
  const email = document.getElementById("emailSekretara");
  const br_telefona = document.getElementById("telefonSekretara");
  const ime2 = document.getElementById("imeSekretara2");
  const prezime2 = document.getElementById("prezimeSekretara");
  const zvanje2 = document.getElementById("zvanjeSekretara2");
  const godina_rodjenja = document.getElementById("godinaRodjenja");
  const br_telefona2 = document.getElementById("telefonSekretara2");
  const opis = document.getElementById("opisSekretara");
  const slika = document.getElementById("profilnaSlika");

  username2.innerHTML = sekretar.username;
  username.value = sekretar.username;
  ime.innerHTML = sekretar.ime + " " + sekretar.prezime;
  zvanje.innerHTML = sekretar.zvanje;
  email.innerHTML = sekretar.email;
  br_telefona.innerHTML = sekretar.br_telefona;
  ime2.innerHTML = sekretar.ime;
  prezime2.innerHTML = sekretar.prezime;
  zvanje2.innerHTML = sekretar.zvanje;
  godina_rodjenja.innerHTML = sekretar.godina_rodjenja;
  br_telefona2.innerHTML = sekretar.br_telefona;
  opis.innerHTML = sekretar.opis;
  slika.src = sekretar.slika;
}

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
  name.id = "novoImeSekretara";
  info.appendChild(name);

  let linija = document.createElement("hr");
  info.appendChild(linija);

  labela = document.createElement("h6");
  labela.innerHTML = "Prezime: ";
  info.appendChild(labela);

  name = document.createElement("input");
  name.type = "text";
  name.placeholder = "Enter new name";
  name.id = "novoPrezimeSekretara";
  info.appendChild(name);

  linija = document.createElement("hr");
  info.appendChild(linija);

  labela = document.createElement("label");
  labela.innerHTML = "Broj telefona: ";
  info.appendChild(labela);

  name = document.createElement("input");
  name.type = "text";
  name.placeholder = "Enter phone number";
  name.id = "noviBrojTelefonaSekretara";
  info.appendChild(name);

  linija = document.createElement("hr");
  info.appendChild(linija);

  labela = document.createElement("label");
  labela.innerHTML = "Email: ";
  info.appendChild(labela);

  name = document.createElement("input");
  name.type = "text";
  name.placeholder = "Enter email address";
  name.id = "noviEmailSekretara";
  info.appendChild(name);

  linija = document.createElement("hr");
  info.appendChild(linija);

  labela = document.createElement("label");
  labela.innerHTML = "Opis: ";
  info.appendChild(labela);

  name = document.createElement("textarea");
  name.type = "text";
  name.placeholder = "Enter description";
  name.id = "noviOpisSekretara";
  info.appendChild(name);

  linija = document.createElement("hr");
  info.appendChild(linija);

  const sacuvaj = document.createElement("button");
  sacuvaj.innerHTML = "Sacuvaj promene";
  sacuvaj.id = "sacuvajPromene";
  info.appendChild(sacuvaj);
  sacuvaj.className = "btn btn-inverse";

  sacuvaj.onclick = ev => updateSekretara();
}

function sakrijPop() {
  const kontejner = document.getElementById("myPop");
  kontejner.style.display = "none";
}

//slanje upisanih podataka za upis u bazu
function updateSekretara() {
  const ime = document.getElementById("novoImeSekretara").value;
  const prezime = document.getElementById("novoPrezimeSekretara").value;
  const opis = document.getElementById("noviOpisSekretara").value;
  const broj_telefona = document.getElementById("noviBrojTelefonaSekretara")
    .value;
  const email = document.getElementById("noviEmailSekretara").value;

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
  fetch("http://localhost:3000/updateSekretara", formFetch)
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

//fetch vraca listu sudija iz baze
function kreirajUtakmicu() {
  fetch("http://localhost:3000/vratiSudije")
    .then(response => {
      if (!response.ok)
        throw new Error(
          "Greska u povezivanju sa bazom! " + response.statusText
        );
      else {
        return response.json();
      }
    })
    .then(data => crtajTabelu(data))
    .catch(error =>
      console.log("Greska u pribavljanju podataka! " + error.statusText)
    );
}

//PopUp kartica za kreiranje utakmice
function crtajTabelu(data) {
  const kontejner = document.getElementById("popKont2");
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
  labela.innerHTML = "Organizovanje utakmice ";
  labela.id = "inner-headline";
  labela.className = "span12";
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
  labela.innerHTML = "Domaci tim: ";
  info.appendChild(labela);

  let name = document.createElement("input");
  name.type = "text";
  name.placeholder = "Enter name";
  name.id = "domaci";
  info.appendChild(name);

  let linija = document.createElement("hr");
  info.appendChild(linija);

  labela = document.createElement("h6");
  labela.innerHTML = "Gostujuci tim: ";
  info.appendChild(labela);

  name = document.createElement("input");
  name.type = "text";
  name.placeholder = "Enter name";
  name.id = "gosti";
  info.appendChild(name);

  linija = document.createElement("hr");
  info.appendChild(linija);

  labela = document.createElement("label");
  labela.innerHTML = "Datum odrzavanja: ";
  info.appendChild(labela);

  name = document.createElement("input");
  name.type = "text";
  name.placeholder = "Enter date";
  name.id = "datum";
  info.appendChild(name);

  linija = document.createElement("hr");
  info.appendChild(linija);

  labela = document.createElement("label");
  labela.innerHTML = "Ime lige: ";
  info.appendChild(labela);

  imeLige = ["Prva Niska", "Druga Niska", "Mladje Kategorije", "Cicibani"];
  for (let i = 1; i < imeLige.length + 1; i++) {
    let span = document.createElement("span");
    span.style = "display: flex; flex_direction:row";
    info.appendChild(span);

    let dugme = document.createElement("input");
    dugme.type = "radio";
    dugme.name = "imeLige";
    dugme.value = i;
    dugme.style = "margin:5px";
    span.appendChild(dugme);

    let labela = document.createElement("label");
    labela.innerHTML = imeLige[i - 1];
    span.appendChild(labela);
  }

  linija = document.createElement("hr");
  info.appendChild(linija);

  const naslov = document.createElement("h6");
  naslov.innerHTML = "Izbor sudije";
  info.appendChild(naslov);

  const tabela = document.createElement("table");
  tabela.className = "table table-hover";
  info.appendChild(tabela);

  //tabela koja crta listu sudija
  let tabelaHTML =
    "<thead><th>Ime</th><th>Prezime</th><th>Liga</th><th>Email</th><th>Izaberi</th></thead><tbody>";
  data.data.forEach(el => {
    tabelaHTML +=
      "<tr><td>" +
      el.ime +
      "</td><td>" +
      el.prezime +
      "</td><td>" +
      el.ime_lige +
      "</td><td>" +
      el.email +
      "</td><td><input type='radio' name='izborSudije' value=" +
      el.username +
      "></td><td></tr>";
  });

  tabelaHTML += "</tbody>";
  tabela.innerHTML = tabelaHTML;
  tabela.style.color = "black";

  vratiTerene(info);
  vratiDelegate(info);
}

//fetch vraca listu terena iz baze
function vratiTerene(info) {
  fetch("http://localhost:3000/vratiTerene")
    .then(response => {
      if (!response.ok)
        throw new Error(
          "Greska u povezivanju sa bazom! " + response.statusText
        );
      else {
        return response.json();
      }
    })
    .then(data => crtajTerene(data, info))
    .catch(error =>
      console.log("Greska u pribavljanju podataka! " + error.statusText)
    );
}

//fetxh vraca listu delegata iz baze
function vratiDelegate(info) {
  fetch("http://localhost:3000/vratiDelegate")
    .then(response => {
      if (!response.ok)
        throw new Error(
          "Greska u povezivanju sa bazom! " + response.statusText
        );
      else {
        return response.json();
      }
    })
    .then(data => crtajDelegate(data, info))
    .catch(error =>
      console.log("Greska u pribavljanju podataka! " + error.statusText)
    );
}

//tabela koja crta listu terena
function crtajTerene(data, info) {
  let linija = document.createElement("hr");
  info.appendChild(linija);

  const naslov = document.createElement("h6");
  naslov.innerHTML = "Izbor terena";
  info.appendChild(naslov);

  const tabela = document.createElement("table");
  tabela.className = "table table-hover";
  info.appendChild(tabela);

  let tabelaHTML =
    "<thead><th>Naziv</th><th>Lokacija</th><th>Izaberi</th></thead><tbody>";
  data.data.forEach(el => {
    tabelaHTML +=
      "<tr><td>" +
      el.naziv +
      "</td><td>" +
      el.lokacija +
      "</td><td><input type='radio' name='izborTerena' value=" +
      el.id_terena +
      "></td><td></tr>";
  });

  tabelaHTML += "</tbody>";
  tabela.innerHTML = tabelaHTML;
  tabela.style.color = "black";
}

//tabela koja crta listu delegata
function crtajDelegate(data, info) {
  let linija = document.createElement("hr");
  info.appendChild(linija);

  const naslov = document.createElement("h6");
  naslov.innerHTML = "Izbor delegata";
  info.appendChild(naslov);

  const tabela = document.createElement("table");
  tabela.className = "table table-hover";
  info.appendChild(tabela);

  console.log(data.data);

  let tabelaHTML =
    "<thead><th>Ime</th><th>Prezime</th><th>Email</th><th>Izaberi</th></thead><tbody>";
  data.data.forEach(el => {
    tabelaHTML +=
      "<tr><td>" +
      el.ime +
      "</td><td>" +
      el.prezime +
      "</td><td>" +
      el.email +
      "</td><td><input type='radio' name='izborDelegata' value=" +
      el.username +
      "></td><td></tr>";
  });

  tabelaHTML += "</tbody>";
  tabela.innerHTML = tabelaHTML;
  tabela.style.color = "black";

  const sacuvaj = document.createElement("button");
  sacuvaj.innerHTML = "Sacuvaj promene";
  sacuvaj.id = "sacuvajPromene";
  info.appendChild(sacuvaj);
  sacuvaj.className = "btn btn-inverse";

  sacuvaj.onclick = ev => dodajUtakmicu();
}

function sakrijPop2() {
  const kontejner = document.getElementById("myPop2");
  kontejner.style.display = "none";
}

//prosledjivanje unetih podataka i dodavanje utakmice u bazu
function dodajUtakmicu() {
  const domaci = document.getElementById("domaci").value;
  const gosti = document.getElementById("gosti").value;
  const datum = document.getElementById("datum").value;
  const id_lige = document.querySelector("input[name='imeLige']:checked").value;
  const username_sudije = document.querySelector(
    "input[name='izborSudije']:checked"
  ).value;
  const username_delegata = document.querySelector(
    "input[name='izborDelegata']:checked"
  ).value;
  const id_terena = document.querySelector("input[name='izborTerena']:checked")
    .value;

  const formFetch = {
    method: "post",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      domaci: domaci,
      gosti: gosti,
      datum: datum,
      id_lige: id_lige,
      username_sudije: username_sudije,
      username_delegata: username_delegata,
      id_terena: id_terena
    })
  };
  fetch("http://localhost:3000/dodajUtakmicu/" + username.value, formFetch)
    .then(response => {
      if (!response.ok)
        throw new Error(
          "Greska u povezivanju sa serverom! " + response.statusText
        );
      else {
        return response.json();
      }
    })
    .then(sakrijPop2())
    .catch(error => console.log("Greska u radu sa bazom!" + error.statusText));
}
