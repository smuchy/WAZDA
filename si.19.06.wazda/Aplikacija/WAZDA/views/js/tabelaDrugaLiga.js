vratiPodatke();
document.getElementById("pretraziUtakmice").onkeyup = ev => pretraga();
document.getElementById("sortiranjePoTerenu").onclick = ev =>
  sortiranjePoTerenu();
document.getElementById("sortiranjePoDatumu").onclick = ev =>
  sortiranjePoDatumu();

function vratiPodatke() {
  fetch("http://localhost:3000/vratiSaStatDruga")
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
      console.log("Greska u prikupljanju podataka " + error.statusText)
    );
}

//funkcija koja iscrtava tabelu iz druge lige
function crtajTabelu(data) {
  const tabela = document.getElementById("drugaLigaTabela");
  let tabelaHTML =
    "<thead><th>Domaca ekipa</th><th> Rezultat </th><th>Gostujuca ekipa</th><th>Datum</th><th>Naziv terena</th><th>Lokacija terena</th><th>Prikazi statistiku</th></thead><tbody>";

  const datum = document.getElementById("sortiranjePoDatumu");
  const teren = document.getElementById("sortiranjePoTerenu");

  data.data.forEach(el => {
    tabelaHTML +=
      "<tr><td>" +
      el.domaci +
      "</td><td>" +
      el.rezultat +
      "</td><td class='gostiIme'>" +
      el.gosti +
      "</td><td>" +
      el.datum +
      "</td><td>" +
      el.naziv +
      "</td><td>" +
      el.lokacija +
      "</td><td><button class='btn btn-inverse' id=" +
      el.id_utakmice +
      ">Statistika</button></td></tr>";

    //kreiranje opcija za sortiranje po datumu
    let opcija = document.createElement("option");
    opcija.value = el.datum;
    opcija.innerHTML = el.datum;
    datum.appendChild(opcija);

    //kreiranje opcija za sortiranje po terenu
    let opcija2 = document.createElement("option");
    opcija2.value = el.naziv;
    opcija2.innerHTML = el.naziv;
    teren.appendChild(opcija2);
  });

  tabelaHTML += "</tbody>";
  tabela.innerHTML = tabelaHTML;
  data.data.forEach(el => {
    document.getElementById(el.id_utakmice).onclick = ev => vratiStatistiku(el);
  });
}

function vratiStatistiku(el) {
  fetch("http://localhost:3000/vratiStatistiku/" + el.id_utakmice)
    .then(response => {
      if (!response.ok)
        throw new Error("Greska u povezivanju! " + response.statusText);
      else {
        return response.json();
      }
    })
    .then(data => crtajStatistiku(data))
    .catch(error => console.log("Greska u radu sa bazom! " + error));
}

function crtajStatistiku(data) {
  kontejner = document.getElementById("popKont");

  const stat = data.data;
  const modal = document.createElement("div");
  modal.className = "pop";
  modal.id = "myPop" + stat[0].id;
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
  name.innerHTML = "Statistika utakmice";
  head.appendChild(name);

  const infoDiv = document.createElement("div");
  infoDiv.className = "pricing-content";
  kont.appendChild(infoDiv);

  const lista = document.createElement("ul");
  infoDiv.appendChild(lista);

  info = document.createElement("li");
  info.innerHTML = "Broj crvenih kartona: " + stat[0].broj_crvenih;
  lista.appendChild(info);

  info = document.createElement("li");
  info.innerHTML = "Broj zutih kartona: " + stat[0].broj_zutih;
  lista.appendChild(info);

  info = document.createElement("li");
  info.innerHTML = "Komentar sudije: ";
  lista.appendChild(info);

  let info1 = document.createElement("li");
  info1.innerHTML = "  " + stat[0].komentar;
  info1.className = "alert";
  lista.appendChild(info1);
}

function pretraga() {
  var txtValue, i;
  var value = document.getElementById("pretraziUtakmice").value.toUpperCase();
  var tabela = document.getElementById("prvaLigaTabela");
  var red = document.getElementsByTagName("tr");

  //uporedjuje sa prvim TD elementom (ime domace ekipe)
  for (i = 0; i < red.length; i++) {
    td = red[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(value) > -1) {
        red[i].style.display = "";
      } else {
        red[i].style.display = "none";
      }
    }
  }
}

function sortiranjePoDatumu() {
  var txtValue, i;
  var value1 = document.getElementById("sortiranjePoDatumu").value;
  var value2 = document.getElementById("sortiranjePoTerenu").value;
  var tabela = document.getElementById("prvaLigaTabela");
  var red = document.getElementsByTagName("tr");

  //sortiranje prema izabranom datumu
  for (i = 0; i < red.length; i++) {
    td = red[i].getElementsByTagName("td")[3];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.indexOf(value1) > -1) {
        red[i].style.display = "";
      } else {
        red[i].style.display = "none";
      }
    }
  }
}

function sortiranjePoTerenu() {
  var txtValue, i;
  var value1 = document.getElementById("sortiranjePoDatumu").value;
  var value2 = document.getElementById("sortiranjePoTerenu").value;
  var tabela = document.getElementById("prvaLigaTabela");
  var red = document.getElementsByTagName("tr");

  //sortiranje prema izabranom terenu
  for (i = 0; i < red.length; i++) {
    td = red[i].getElementsByTagName("td")[4];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.indexOf(value2) > -1) {
        red[i].style.display = "";
      } else {
        red[i].style.display = "none";
      }
    }
  }
}
