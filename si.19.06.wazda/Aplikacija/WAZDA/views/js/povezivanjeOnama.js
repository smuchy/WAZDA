document.getElementById("organizacija").onclick = ev =>
  otvoriStranu("organizacija");
document.getElementById("listaSudija").onclick = ev =>
  otvoriStranu("listaSudija");
document.getElementById("dokumenti").onclick = ev => otvoriStranu("dokumenta");
document.getElementById("delegati").onclick = ev => otvoriStranu("delegati");
document.getElementById("prvaLiga").onclick = ev => otvoriStranu("prvaLiga");
document.getElementById("drugaLiga").onclick = ev => otvoriStranu("drugaLiga");
document.getElementById("mladjaLiga").onclick = ev =>
  otvoriStranu("mladjaLiga");
document.getElementById("cicibani").onclick = ev => otvoriStranu("cicibani");
document.getElementById("logoPocetna").onclick = ev => otvoriStranu("");
document.getElementById("pocetna").onclick = ev => otvoriStranu("");
document.getElementById("tereni").onclick = ev => otvoriStranu("tereni");

//otvara stranu na osnovu stringla prosledjenog kroz f-ju
function otvoriStranu(text) {
  fetch("http://localhost:3000/" + text)
    .then(response => {
      if (!response.ok)
        throw new Error("Greska u povezivanju " + response.statusText);
      else {
        return response.json();
      }
    })
    .catch(error =>
      console.log("Greska u pribavljanju podataka " + error.statusText)
    );
}
