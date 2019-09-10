vratiSve();

// FUNKCIJE
function vratiSve() {
  fetch("http://localhost:3000/vratiTerene")
    .then(response => {
      if (!response.ok)
        throw new Error("Greska u povezivanju! " + response.statusText);
      else {
        return response.json();
      }
    })
    .then(data => crtajTabelu(data))
    .catch(error => console.log("Greska u radu sa bazom! " + error));
}

function crtajTabelu(data) {
  const tabela = document.getElementById("tabelaTereni");
  let tabelaHTML =
    "<thead><th>Lokacija terena</th><th>Naziv</th></thead><tbody>";
  data.data.forEach(el => {
    tabelaHTML +=
      "<tr><td>" + el.lokacija + "</td><td>" + el.naziv + "</td></tr>";
  });
  tabelaHTML += "</tbody>";
  tabela.innerHTML = tabelaHTML;
  tabela.className = "table-hover table";
}
