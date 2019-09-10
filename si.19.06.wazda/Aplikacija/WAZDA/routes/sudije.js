var express = require("express");
var router = express.Router();
var path = require("path");
var db = require("./dbconnect");
var bcrypt = require("bcrypt");
const saltRounds = 10;

var SELECT_SUDIJA_PRIKAZ =
  "SELECT username,ime,prezime,godina_rodjenja,slika,zvanje,opis,br_telefona,god_poc_sudjenja,ime_lige,email from korisnik natural join clan_saveza natural join sudija";

router.get("/vratiSudije", (req, res) => {
  db.query(SELECT_SUDIJA_PRIKAZ, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: result
      });
    }
  });
});

router.post("/dodajSudiju", (req, res) => {
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
  const god_poc_sudjenja = req.body.god_poc_sudjenja;
  const ime_lige = req.body.ime_lige;
  const username_sekretara = req.body.username_sekretara;
  bcrypt.hash(password, saltRounds, function(err, hash) {
    db.query(
      "INSERT INTO korisnik(username,password,ime,prezime,godina_rodjenja,br_telefona,email,admin) VALUES (?, ?, ?, ?, ?, ?, ?, 'N')",
      [username, hash, ime, prezime, godina_rodjenja, br_telefona, email],
      (err, result) => {
        if (err) throw err;

        db.query(
          `INSERT INTO clan_saveza(id,username,zvanje,slika,opis,bivsi_clan,reg_broj_saveza) VALUES (LAST_INSERT_ID(), (SELECT username FROM korisnik WHERE username='${username}'), 'sudija', ?, ?, 'N', ?)`,
          [slika, opis, reg_broj_saveza],
          (err, result) => {
            if (err) throw err;

            db.query(
              `INSERT INTO sudija(id,username,clanarina,god_poc_sudjenja,id_sekretara,ime_lige) VALUES (LAST_INSERT_ID(), (SELECT username FROM clan_saveza WHERE username='${username}'), 'Y', ?, (SELECT id FROM sekretar WHERE username='${username_sekretara}'), ?)`,
              [god_poc_sudjenja, ime_lige],
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

router.post("/azurirajSudiju", (req, res) => {
  const id = req.body.id;
  const username = req.body.username;
  const password = req.body.password;
  const slika = req.body.slika;
  const zvanje = req.body.zvanje;
  const ime_lige = req.body.ime_lige;

  bcrypt.hash(password, saltRounds, function(err, hash) {
    db.query(
      `UPDATE sudija SET username=?, ime_lige=? WHERE id=${id}`,
      [username, ime_lige],
      (err, result) => {
        if (err) throw err;

        db.query(
          `UPDATE clan_saveza SET username=?, slika=?, zvanje=? WHERE id=${id}`,
          [username, slika, zvanje],
          (err, result) => {
            if (err) throw err;

            db.query(
              `UPDATE korisnik SET username=?, password=? WHERE id=${id}`,
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

router.post("/obrisiSudiju", (req, res) => {
  const username = req.body.username;
  db.query(
    `INSERT INTO bivsi_clan(username,ime,prezime,br_telefona,email) VALUES ((SELECT username FROM korisnik WHERE username='${username}'), (SELECT ime FROM korisnik WHERE username='${username}'), (SELECT prezime FROM korisnik WHERE username='${username}'), (SELECT br_telefona FROM korisnik WHERE username='${username}'), (SELECT email FROM korisnik WHERE username='${username}'))`,
    (err, result) => {
      if (err) throw err;

      db.query(
        `DELETE FROM sudija WHERE username='${username}'`,
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
