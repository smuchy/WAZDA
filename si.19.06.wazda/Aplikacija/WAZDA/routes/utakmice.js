var express = require("express");
var router = express.Router();
var path = require("path");
var db = require("./dbconnect");
var nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "nikola.ristic14@gmail.com",
    pass: "sapphiretco'03"
  },
  tls: {
    rejectUnauthorized: false
  }
});

router.get("/vratiSaStatPrva", (req, res) => {
  db.query(
    "SELECT id_utakmice,rezultat,gosti,domaci,datum,naziv,lokacija,id_sudije FROM utakmica natural join teren WHERE ima_statistiku='Y' AND ime_lige='Prva Niska'",
    (err, result) => {
      if (err) throw err;
      else {
        return res.json({
          data: result
        });
      }
    }
  );
});

router.get("/vratiSaStatDruga", (req, res) => {
  db.query(
    "SELECT id_utakmice,rezultat,gosti,domaci,datum,lokacija,naziv FROM utakmica NATURAL JOIN teren WHERE ima_statistiku='Y' AND ime_lige='Druga Niska'",
    (err, result) => {
      if (err) throw err;
      else {
        return res.json({
          data: result
        });
      }
    }
  );
});

router.get("/vratiSaStatMladje", (req, res) => {
  db.query(
    "SELECT id_utakmice,rezultat,gosti,domaci,datum,lokacija,naziv FROM utakmica NATURAL JOIN teren WHERE ima_statistiku='Y' AND ime_lige='Mladje Kategorije'",
    (err, result) => {
      if (err) throw err;
      else {
        return res.json({
          data: result
        });
      }
    }
  );
});

router.get("/vratiSaStatCicibani", (req, res) => {
  db.query(
    "SELECT id_utakmice,rezultat,gosti,domaci,datum,lokacija,naziv FROM utakmica NATURAL JOIN teren WHERE ima_statistiku='Y' AND ime_lige='Cicibani'",
    (err, result) => {
      if (err) throw err;
      else {
        return res.json({
          data: result
        });
      }
    }
  );
});

router.post("/dodajUtakmicu/:username", (req, res) => {
  const domaci = req.body.domaci;
  const gosti = req.body.gosti;
  const username_sudije = req.body.username_sudije;
  const username_delegata = req.body.username_delegata;
  const id_lige = req.body.id_lige;
  const id_terena = req.body.id_terena;
  const datum = req.body.datum;
  const username = req.params.username;
  db.query(
    `INSERT INTO utakmica(ocena_sudije,domaci,gosti,id_sudije,id_delegata,ime_lige,id_terena,datum,ima_statistiku,id_sekretara) VALUES (0,?,?,(SELECT id FROM sudija WHERE username='${username_sudije}'),(SELECT id FROM delegat WHERE username='${username_delegata}'),(SELECT ime FROM liga WHERE id='${id_lige}'),?,?,'N',(SELECT id FROM sekretar WHERE username='${username}'))`,
    [domaci, gosti, id_terena, datum],
    (err, result) => {
      if (err) throw err;
      else {
        console.log("Uspeh!");
        db.query(
          `SELECT email FROM korisnik natural join clan_saveza natural join sudija WHERE username='${username_sudije}'`,
          (err, result) => {
            if (err) throw err;
            else {
              var email = JSON.stringify(result);
              console.log(email);
              let HelperOptions = {
                from: '"Fudbalski savez Nisa" <nikola.ristic14@gmail.com',
                to: email,
                subject: "Zakazana utakmica",
                text:
                  "Postovani, delegirani ste da sudite na utakmici " +
                  domaci +
                  " " +
                  "protiv" +
                  " " +
                  gosti +
                  " " +
                  "datuma: " +
                  datum
              };
              transporter.sendMail(HelperOptions, (err, info) => {
                if (err) {
                  console.log(err);
                }

                console.log("Message sent!");
                console.log(info);
              });
            }
          }
        );
      }
    }
  );
});

module.exports = router;
