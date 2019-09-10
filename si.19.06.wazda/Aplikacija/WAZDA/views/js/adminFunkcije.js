document.getElementById("kreirajSudiju").onclick = ev => kreirajSudiju();
document.getElementById("kreirajDelegata").onclick = ev => kreirajDelegata();
document.getElementById("kreirajSekretara").onclick = ev => kreirajSekretara();

document.getElementById("obrisiSudiju").onclick = ev => obrisiSudiju();
document.getElementById("obrisiDelegata").onclick = ev => obrisiDelegata();
document.getElementById("obrisiSekretara").onclick = ev => obrisiSekretara();

document.getElementById("azurirajSudiju").onclick = ev => azurirajSudiju();
document.getElementById("azurirajDelegata").onclick = ev => azurirajDelegata();
document.getElementById("azurirajSekretara").onclick = ev =>
  azurirajSekretara();

//kreiranje korisnika
function kreirajSudiju() {
  const username = document.getElementById("usernameSudije").value;
  const password = document.getElementById("passwordSudije").value;
  const ime = document.getElementById("imeSudije").value;
  const prezime = document.getElementById("prezimeSudije").value;
  const godina_rodjenja = document.getElementById("godinaRod").value;
  const br_telefona = document.getElementById("telefonSudije").value;
  const email = document.getElementById("emailSudije").value;
  const slika = document.getElementById("slikaSudije").value;
  const reg_broj_saveza = document.getElementById("regBrSavezaSudije").value;
  const god_poc_sudjenja = document.getElementById("godinaSud").value;
  const username_sekretara = document.getElementById("usernameSekretaraSudije")
    .value;
  const ime_lige = document.querySelector("input[name='liga']:checked").value;
  const opis = document.getElementById("opisSudije").value;

  const formFetch = {
    method: "post",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      username: username,
      password: password,
      ime: ime,
      prezime: prezime,
      godina_rodjenja: godina_rodjenja,
      br_telefona: br_telefona,
      email: email,
      slika: slika,
      reg_broj_saveza: reg_broj_saveza,
      god_poc_sudjenja: god_poc_sudjenja,
      username_sekretara: username_sekretara,
      ime_lige: ime_lige,
      opis: opis
    })
  };
  fetch("http://localhost:3000/dodajSudiju", formFetch)
    .then(response => {
      if (!response.ok)
        throw new Error(
          "Greska u povezivanju sa serverom! " + response.statusText
        );
      else {
        return response.json();
      }
    })
    .then(console.log("Uspesno dodavanje sudije!"))
    .catch(error => console.log("Greska u radu sa bazom!" + error.statusText));
}

function kreirajDelegata() {
  const username = document.getElementById("usernameDelegata").value;
  const password = document.getElementById("passwordDelegata").value;
  const ime = document.getElementById("imeDelegata").value;
  const prezime = document.getElementById("prezimeDelegata").value;
  const godina_rodjenja = document.getElementById("godinaRodDelegata").value;
  const br_telefona = document.getElementById("telefonDelegata").value;
  const email = document.getElementById("emailDelegata").value;
  const slika = document.getElementById("slikaDelegata").value;
  const reg_broj_saveza = document.getElementById("regBrSavezaDelegata").value;
  const opis = document.getElementById("opisDelegata").value;
  const username_sekretara = document.getElementById(
    "usernameSekretaraDelegata"
  ).value;

  const formFetch = {
    method: "post",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      username: username,
      password: password,
      ime: ime,
      prezime: prezime,
      godina_rodjenja: godina_rodjenja,
      br_telefona: br_telefona,
      email: email,
      slika: slika,
      reg_broj_saveza: reg_broj_saveza,
      opis: opis,
      username_sekretara: username_sekretara
    })
  };
  fetch("http://localhost:3000/dodajDelegata", formFetch)
    .then(response => {
      if (!response.ok)
        throw new Error(
          "Greska u povezivanju sa serverom! " + response.statusText
        );
      else {
        return response.json();
      }
    })
    .then(console.log("Uspesno dodavanje delegata!"))
    .catch(error => console.log("Greska u radu sa bazom!" + error.statusText));
}

function kreirajSekretara() {
  const username = document.getElementById("usernameSekretara").value;
  const password = document.getElementById("passwordSekretara").value;
  const ime = document.getElementById("imeSekretara").value;
  const prezime = document.getElementById("prezimeSekretara").value;
  const godina_rodjenja = document.getElementById("godinaRodSekretara").value;
  const br_telefona = document.getElementById("telefonSekretara").value;
  const email = document.getElementById("emailSekretara").value;
  const slika = document.getElementById("slikaSekretara").value;
  const reg_broj_saveza = document.getElementById("regBrSavezaSekretara").value;
  const opis = document.getElementById("opisSekretara").value;

  const formFetch = {
    method: "post",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      username: username,
      password: password,
      ime: ime,
      prezime: prezime,
      godina_rodjenja: godina_rodjenja,
      br_telefona: br_telefona,
      email: email,
      slika: slika,
      reg_broj_saveza: reg_broj_saveza,
      opis: opis
    })
  };
  fetch("http://localhost:3000/dodajSekretara", formFetch)
    .then(response => {
      if (!response.ok)
        throw new Error(
          "Greska u povezivanju sa serverom! " + response.statusText
        );
      else {
        return response.json();
      }
    })
    .then(console.log("Uspesno dodavanje sekretara!"))
    .catch(error => console.log("Greska u radu sa bazom!" + error.statusText));
}

//brisanje korisnika
function obrisiSudiju() {
  const username = document.getElementById("usernameSudijeBrisanje").value;

  const formFetch = {
    method: "post",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      username: username
    })
  };
  fetch("http://localhost:3000/obrisiSudiju", formFetch)
    .then(response => {
      if (!response.ok)
        throw new Error(
          "Greska u povezivanju sa serverom! " + response.statusText
        );
      else {
        return response.json();
      }
    })
    .then(console.log("Uspesno brisanje sudije iz baze!"))
    .catch(error => console.log("Greska u radu sa bazom!" + error.statusText));
}

function obrisiDelegata() {
  const username = document.getElementById("usernameDelegataBrisanje").value;

  const formFetch = {
    method: "post",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      username: username
    })
  };
  fetch("http://localhost:3000/obrisiDelegata", formFetch)
    .then(response => {
      if (!response.ok)
        throw new Error(
          "Greska u povezivanju sa serverom! " + response.statusText
        );
      else {
        return response.json();
      }
    })
    .then(console.log("Uspesno brisanje delegata iz baze!"))
    .catch(error => console.log("Greska u radu sa bazom!" + error.statusText));
}

function obrisiSekretara() {
  const username = document.getElementById("usernameSekretaraBrisanje").value;

  const formFetch = {
    method: "post",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      username: username
    })
  };
  fetch("http://localhost:3000/obrisiSekretara", formFetch)
    .then(response => {
      if (!response.ok)
        throw new Error(
          "Greska u povezivanju sa serverom! " + response.statusText
        );
      else {
        return response.json();
      }
    })
    .then(console.log("Uspesno brisanje sekretara iz baze!"))
    .catch(error => console.log("Greska u radu sa bazom!" + error.statusText));
}

//azuriranje korisnika
function azurirajSudiju() {
  const id = document.getElementById("azurirajIdSudije").value;
  const username = document.getElementById("azurirajUsernameSudije").value;
  const password = document.getElementById("azurirajPasswordSudije").value;
  const zvanje = document.getElementById("azurirajZvanjeSudije").value;
  const slika = document.getElementById("azurirajSlikuSudije").value;
  const ime_lige = document.querySelector("input[name='azurirajLigu']:checked")
    .value;

  const formFetch = {
    method: "post",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      id: id,
      username: username,
      password: password,
      slika: slika,
      ime_lige: ime_lige,
      zvanje: zvanje
    })
  };
  fetch("http://localhost:3000/azurirajSudiju", formFetch)
    .then(response => {
      if (!response.ok)
        throw new Error(
          "Greska u povezivanju sa serverom! " + response.statusText
        );
      else {
        return response.json();
      }
    })
    .then(console.log("Uspesno azuriranje sudije!"))
    .catch(error => console.log("Greska u radu sa bazom!" + error.statusText));
}

function azurirajDelegata() {
  const id = document.getElementById("azurirajIdDelegata");
  const username = document.getElementById("azurirajUsernameDelegata");
  const password = document.getElementById("azurirajPasswordDelegata");
  const slika = document.getElementById("azurirajSlikuDelegata");

  const formFetch = {
    method: "post",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      id: id.value,
      username: username.value,
      password: password.value,
      slika: slika.value
    })
  };
  fetch("http://localhost:3000/azurirajDelegata", formFetch)
    .then(response => {
      if (!response.ok)
        throw new Error(
          "Greska u povezivanju sa serverom! " + response.statusText
        );
      else {
        return response.json();
      }
    })
    .then(console.log("Uspesno auziranje delegata!"))
    .catch(error => console.log("Greska u radu sa bazom!" + error.statusText));
}

function azurirajSekretara() {
  const id = document.getElementById("azurirajIdSekretara");
  const username = document.getElementById("azurirajUsernameSekretara");
  const password = document.getElementById("azurirajPasswordSekretara");
  const slika = document.getElementById("azurirajSlikuSekretara");

  const formFetch = {
    method: "post",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      id: id.value,
      username: username.value,
      password: password.value,
      slika: slika.value
    })
  };
  fetch("http://localhost:3000/azurirajSekretara", formFetch)
    .then(response => {
      if (!response.ok)
        throw new Error(
          "Greska u povezivanju sa serverom! " + response.statusText
        );
      else {
        return response.json();
      }
    })
    .then(console.log("Uspesno auziranje sekretara!"))
    .catch(error => console.log("Greska u radu sa bazom!" + error.statusText));
}
