let username = document.querySelector("input[name='inputText']");
let sifra = document.querySelector("input[name='inputSigninPassword']");
document.getElementById("prijaviSe").onclick = ev => proslediInfo();

function proslediInfo() {
  console.log("uspeli smo");
  const formFetch = {
    method: "post",
    headers: new Headers({
      "Content-Type": "aplication/json"
    }),
    body: JSON.stringify({
      user: username.value,
      pass: sifra.value
    })
  };

  fetch("http://localhost:3000/login", formFetch)
    .then(response => {
      if (!response.ok)
        throw new Error("Greska u povezivanju " + response.statusText);
    })
    .catch(error => console.log("Greska u radu sa bazom " + error.statusText));
}
