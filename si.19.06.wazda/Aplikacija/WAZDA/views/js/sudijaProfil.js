vratiPodatke();
document.getElementById("editProfil").onclick = ev => editProfil();
document.getElementById("editUtakmicu").onclick = ev => editUtakmicu();

function crtajGodine(name) {
  for (let i = 1950; i < 2020; i++) {
    let opcija = document.createElement("option");
    opcija.innerHTML = i;
    opcija.value = i;
    name.appendChild(opcija);
  }
}

function vratiPodatke() {
  fetch("http://localhost:3000/vratiSudiju")
    .then(response => {
      if (!response.ok)
        throw new Error("Greska u povezivanju! " + response.statusText);
      else {
        return response.json();
      }
    })
    .then(data => crtajSudiju(data))
    .catch(error => console.log("Greska u radu sa bazom! " + error.statusText));
}

function crtajSudiju(data) {
  const sudija = data.data[0];
  const username = document.getElementById("usernameSudije");
  const ime = document.getElementById("imeSudije");
  const zvanje = document.getElementById("zvanjeSudije");
  const email = document.getElementById("emailSudije");
  const br_telefona = document.getElementById("telefonSudije");
  const god_poc_sudjenja = document.getElementById("godinaSudjenja");
  const ime2 = document.getElementById("imeSudije2");
  const prezime2 = document.getElementById("prezimeSudije");
  const zvanje2 = document.getElementById("zvanjeSudije2");
  const godina_rodjenja = document.getElementById("godinaRodjenja");
  const br_telefona2 = document.getElementById("telefonSudije2");
  const opis = document.getElementById("opisSudije");
  const slika = document.getElementById("profilnaSlika");

  username.innerHTML = sudija.username;
  ime.innerHTML = sudija.ime + " " + sudija.prezime;
  zvanje.innerHTML = sudija.zvanje;
  email.innerHTML = sudija.email;
  br_telefona.innerHTML = sudija.br_telefona;
  god_poc_sudjenja.innerHTML = sudija.god_poc_sudjenja;
  ime2.innerHTML = sudija.ime;
  prezime2.innerHTML = sudija.prezime;
  zvanje2.innerHTML = sudija.zvanje;
  godina_rodjenja.innerHTML = sudija.godina_rodjenja;
  br_telefona2.innerHTML = sudija.br_telefona;
  opis.innerHTML = sudija.opis;
  slika.src = sudija.slika;

  vratiOcene();
}

function vratiOcene() {
  fetch("http://localhost:3000/vratiOcene")
    .then(response => {
      if (!response.ok)
        throw new Error(
          "Greska u povezivanju sa bazom! " + response.statusText
        );
      else {
        return response.json();
      }
    })
    .then(data => crtajOcene(data))
    .catch(error => console.log("Greska u pribavljanju podataka! " + error));
}

function crtajOcene(data) {
  const bar = document.getElementById("oceneProsek");
  const labela = document.getElementById("prosek");
  let broj = data.data.length;
  let prosek = 0;

  data.data.forEach(el => {
    prosek += el.ocena_sudije;
  });

  prosek = prosek / broj;
  prosek = parseFloat(prosek).toFixed(2);
  labela.innerHTML = prosek;
  bar.style = "display:flex";
  bar.style.flexGrow = prosek * 0.2;
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
  name.id = "novoImeSudije";
  info.appendChild(name);

  let linija = document.createElement("hr");
  info.appendChild(linija);

  labela = document.createElement("h6");
  labela.innerHTML = "Prezime: ";
  info.appendChild(labela);

  name = document.createElement("input");
  name.type = "text";
  name.placeholder = "Enter new name";
  name.id = "novoPrezimeSudije";
  info.appendChild(name);

  linija = document.createElement("hr");
  info.appendChild(linija);

  labela = document.createElement("label");
  labela.innerHTML = "Broj telefona: ";
  info.appendChild(labela);

  name = document.createElement("input");
  name.type = "text";
  name.placeholder = "Enter phone number";
  name.id = "noviBrojTelefonaSudije";
  info.appendChild(name);

  linija = document.createElement("hr");
  info.appendChild(linija);

  labela = document.createElement("label");
  labela.innerHTML = "Email: ";
  info.appendChild(labela);

  name = document.createElement("input");
  name.type = "text";
  name.placeholder = "Enter email address";
  name.id = "noviEmailSudije";
  info.appendChild(name);

  linija = document.createElement("hr");
  info.appendChild(linija);

  labela = document.createElement("label");
  labela.innerHTML = "Opis: ";
  info.appendChild(labela);

  name = document.createElement("textarea");
  name.type = "text";
  name.placeholder = "Enter description";
  name.id = "noviOpisSudije";
  info.appendChild(name);

  linija = document.createElement("hr");
  info.appendChild(linija);

  const sacuvaj = document.createElement("button");
  sacuvaj.innerHTML = "Sacuvaj promene";
  sacuvaj.id = "sacuvajPromene";
  info.appendChild(sacuvaj);
  sacuvaj.className = "btn btn-inverse";

  sacuvaj.onclick = ev => updateSudiju();
}

function sakrijPop() {
  const kontejner = document.getElementById("myPop");
  kontejner.style.display = "none";
}

//update profil sudije
function updateSudiju() {
  const ime = document.getElementById("novoImeSudije").value;
  const prezime = document.getElementById("novoPrezimeSudije").value;
  const opis = document.getElementById("noviOpisSudije").value;
  const broj_telefona = document.getElementById("noviBrojTelefonaSudije").value;
  const email = document.getElementById("noviEmailSudije").value;

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
  fetch("http://localhost:3000/updateSudiju", formFetch)
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

//utakmice na kojima je sudio dati sudija
function editUtakmicu() {
  fetch("http://localhost:3000/vratiBezStat")
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

function crtajTabelu(data) {
  const kontejner = document.getElementById("sudijaUtakmice");
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
  labela.innerHTML = "Dodavanje statistike ";
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
  labela.innerHTML = "Rezultat: ";
  info.appendChild(labela);

  let name = document.createElement("input");
  name.type = "text";
  name.placeholder = "Enter";
  name.id = "rezultat";
  info.appendChild(name);

  let linija = document.createElement("hr");
  info.appendChild(linija);

  labela = document.createElement("h6");
  labela.innerHTML = "Broj zutih kartona: ";
  info.appendChild(labela);

  name = document.createElement("input");
  name.type = "text";
  name.placeholder = "Enter";
  name.id = "broj_zutih";
  info.appendChild(name);

  linija = document.createElement("hr");
  info.appendChild(linija);

  labela = document.createElement("h6");
  labela.innerHTML = "Broj crvenih kartona: ";
  info.appendChild(labela);

  name = document.createElement("input");
  name.type = "text";
  name.placeholder = "Enter";
  name.id = "broj_crvenih";
  info.appendChild(name);

  linija = document.createElement("hr");
  info.appendChild(linija);

  labela = document.createElement("label");
  labela.innerHTML = "Komentar o utakmici: ";
  info.appendChild(labela);

  name = document.createElement("textarea");
  name.placeholder = "Say something";
  name.id = "komentar";
  info.appendChild(name);

  linija = document.createElement("hr");
  info.appendChild(linija);

  const tabela = document.createElement("table");
  info.appendChild(tabela);

  let tabelaHTML =
    "<thead><th>Domaca ekipa</th><th>Gostujuca ekipa</th><th> Datum </th><th>Dodaj statistiku</th></thead><tbody>";
  data.data.forEach(el => {
    tabelaHTML +=
      "<tr><td>" +
      el.domaci +
      "</td><td>" +
      el.gosti +
      "</td><td>" +
      el.datum +
      "</td><td><input type='radio' name='izborUtakmice' value=" +
      el.id_utakmice +
      "></td><td></tr>";
  });

  tabelaHTML += "</tbody>";
  tabela.innerHTML = tabelaHTML;
  tabela.className = "table-hover table";

  const sacuvaj = document.createElement("button");
  sacuvaj.innerHTML = "Sacuvaj promene";
  sacuvaj.id = "sacuvajPromene";
  info.appendChild(sacuvaj);
  sacuvaj.className = "btn btn-inverse";

  sacuvaj.onclick = ev => dodajStatistiku();
}

function sakrijPop2() {
  const kontejner = document.getElementById("myPop2");
  kontejner.style.display = "none";
}

//dodavanje statistike za odabranu utakmicu
function dodajStatistiku() {
  const rezultat = document.getElementById("rezultat").value;
  const broj_zutih = document.getElementById("broj_zutih").value;
  const broj_crvenih = document.getElementById("broj_crvenih").value;
  const komentar = document.getElementById("komentar").value;
  const id_utakmice = document.querySelector(
    "input[name='izborUtakmice']:checked"
  ).value;

  console.log(id_utakmice);
  const formFetch = {
    method: "post",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      rezultat: rezultat,
      broj_zutih: broj_zutih,
      broj_crvenih: broj_crvenih,
      komentar: komentar,
      id_utakmice: id_utakmice
    })
  };
  fetch("http://localhost:3000/dodajStatistiku/" + id_utakmice, formFetch)
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
    .catch(error => console.log("Greska u radu sa bazom!" + error));
}
