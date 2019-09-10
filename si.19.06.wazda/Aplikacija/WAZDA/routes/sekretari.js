var express = require("express");
var router = express.Router();
var path = require("path");
var db = require("./dbconnect");
var bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/dodajSekretara", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const ime = req.body.ime;
  const prezime = req.body.prezime;
  const godina_rodjenja = req.body.godina_rodjenja;
  const br_telefona = req.body.br_telefona;
  const email = req.body.email;
  const slika = req.body.slika;
  const opis = req.body.opis;
  const reg_broj_saveza = req.body.reg_broj_saveza;
  console.log(
    username +
      password +
      ime +
      prezime +
      godina_rodjenja +
      br_telefona +
      email +
      slika +
      opis +
      reg_broj_saveza
  );
  bcrypt.hash(password, saltRounds, function(err, hash) {
    db.query(
      "INSERT INTO korisnik(username,password,ime,prezime,godina_rodjenja,br_telefona,email,admin) VALUES (?, ?, ?, ?, ?, ?, ?, 'N')",
      [username, hash, ime, prezime, godina_rodjenja, br_telefona, email],
      (err, result) => {
        if (err) throw err;

        db.query(
          `INSERT INTO clan_saveza(id,username,zvanje,slika,opis,bivsi_clan,reg_broj_saveza) VALUES (LAST_INSERT_ID(), (SELECT username FROM korisnik WHERE username='${username}'), 'sekretar', ?, ?, 'N', ?)`,
          [slika, opis, reg_broj_saveza],
          (err, result) => {
            if (err) throw err;

            db.query(
              `INSERT INTO sekretar(id,username) VALUES (LAST_INSERT_ID(), (SELECT username FROM clan_saveza WHERE username='${username}'))`,
              (err, result) => {
                if (err) throw err;

                db.query(
                  "SELECT LAST_INSERT_ID() as user_id",
                  (err, result, fields) => {
                    if (err) throw err;

                    console.log(result[0]);
                  }
                );
              }
            );
          }
        );

        console.log("Uspeh!");
      }
    );
  });
});

router.post("/azurirajSekretara", (req, res) => {
  const id = req.body.id;
  const username = req.body.username;
  const password = req.body.password;
  const slika = req.body.slika;
  console.log(id);

  bcrypt.hash(password, saltRounds, function(err, hash) {
    db.query(
      `UPDATE sekretar SET username=? WHERE id='${id}'`,
      [username],
      (err, result) => {
        if (err) throw err;

        db.query(
          `UPDATE clan_saveza SET username=?, slika=? WHERE id='${id}'`,
          [username, slika],
          (err, result) => {
            if (err) throw err;

            db.query(
              `UPDATE korisnik SET username=?, password=? WHERE id='${id}'`,
              [username, hash],
              (err, result) => {
                if (err) throw err;
                else {
                  console.log("Uspeh!");
                }
              }
            );
          }
        );
      }
    );
  });
});

router.post("/obrisiSekretara", (req, res) => {
  const username = req.body.username;
  db.query(
    `INSERT INTO bivsi_clan(username,ime,prezime,br_telefona,email) VALUES ((SELECT username FROM korisnik WHERE username='${username}'), (SELECT ime FROM korisnik WHERE username='${username}'), (SELECT prezime FROM korisnik WHERE username='${username}'), (SELECT br_telefona FROM korisnik WHERE username='${username}'), (SELECT email FROM korisnik WHERE username='${username}'))`,
    (err, result) => {
      if (err) throw err;

      db.query(
        `DELETE FROM sekretar WHERE username='${username}'`,
        (err, result) => {
          if (err) throw err;

          db.query(
            `DELETE FROM clan_saveza WHERE username='${username}'`,
            (err, result) => {
              if (err) throw err;

              db.query(
                `DELETE FROM korisnik WHERE username='${username}'`,
                (err, result) => {
                  if (err) throw err;
                  else {
                    console.log("Uspeh!");
                  }
                }
              );
            }
          );
        }
      );
    }
  );
});

module.exports = router;
