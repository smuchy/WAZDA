const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
var app = express();
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const hbs = require("hbs");

// AUTH
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var MySQLStore = require("express-mysql-session")(session);
var bcrypt = require("bcrypt");

// ZAHTEV RUTA
var povezivanje = require("./routes/povezivanjeStranica");
var sudije = require("./routes/sudije");
var delegati = require("./routes/delegati");
var sekretari = require("./routes/sekretari");
var tereni = require("./routes/tereni");
var utakmice = require("./routes/utakmice");
var statistike = require("./routes/statistike");
var db = require("./routes/dbconnect");

// SVE USE METODE KOJE SU POTREBNE
app.use(express.static(path.join(__dirname, "views")));
app.set("view engine", "hbs");
app.use(express.urlencoded());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors());
app.use(povezivanje);
app.use(sudije);
app.use(delegati);
app.use(sekretari);
app.use(tereni);
app.use(utakmice);
app.use(statistike);
// app.use(db);
app.use(cookieParser());
app.use(logger("dev"));
const saltRounds = 10;

var options = {
  host: "localhost",
  user: "root",
  password: "infiniteminds123",
  database: "wazda"
};

var sessionStore = new MySQLStore(options);

app.use(
  session({
    secret: "keyboard car",
    resave: false,
    store: sessionStore,
    saveUninitialized: false
    // cookie: { secure: true }
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

app.get("/home", (req, res) => {
  console.log(req.user);
  console.log(req.isAuthenticated());
  res.render("index");
});

app.get("/onama", (req, res) => {
  res.render("about");
});

app.get("/organizacija", (req, res) => {
  res.render("organizacija");
});

app.get("/listaSudija", (req, res) => {
  res.render("sudije");
});

app.get("/dokumenta", (req, res) => {
  res.render("dokumenti");
});

app.get("/delegati", (req, res) => {
  res.render("delegati");
});

app.get("/prvaLiga", (req, res) => {
  res.render("prvaLiga");
});

app.get("/drugaLiga", (req, res) => {
  res.render("drugaLiga");
});

app.get("/mladjaLiga", (req, res) => {
  res.render("mladjeKategorije");
});

app.get("/cicibani", (req, res) => {
  res.render("cicibani");
});

app.get("/tereni", (req, res) => {
  res.render("tereni");
});

app.get("/registruj", (req, res) => {
  res.render("register-proba");
});

app.get("/profileDelegat", authenticationMiddlewareDelegat(), (req, res) => {
  res.render("delegatProfil");
});

app.get("/sudijaProfil", authenticationMiddlewareSudija(), (req, res) => {
  res.render("sudijaProfil");
});

app.get("/vratiSudiju", authenticationMiddlewareSudija(), (req, res) => {
  console.log(req.session.passport.user.user);
  var sudijaUser = req.session.passport.user.user;
  db.query(
    `SELECT ime,prezime,username,godina_rodjenja,email,slika,zvanje,opis,br_telefona,god_poc_sudjenja,ime_lige FROM korisnik natural join clan_saveza natural join sudija WHERE id='${
      sudijaUser.id
    }'`,
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

app.post(
  "/dodajStatistiku/:idUtakmice",
  authenticationMiddlewareSudija(),
  (req, res) => {
    const idUtakmice = req.params.idUtakmice;
    const broj_zutih = req.body.broj_zutih;
    const broj_crvenih = req.body.broj_crvenih;
    const komentar = req.body.komentar;
    const rezultat = req.body.rezultat;
    const id_sudije = req.session.passport.user.user.id;
    console.log(broj_zutih);
    db.query(
      "INSERT INTO statistika(broj_zutih,broj_crvenih,komentar,id_sudije,id_utakmice) VALUES (?,?,?,?,?)",
      [broj_zutih, broj_crvenih, komentar, id_sudije, idUtakmice],
      (err, result) => {
        if (err) throw err;
        else {
          db.query(
            `UPDATE utakmica SET rezultat=?,ima_statistiku='Y' WHERE id_utakmice='${idUtakmice}'`,
            [rezultat],
            (err, result) => {
              if (err) throw err;
              else {
                console.log("Uspeh!");
              }
            }
          );
        }
      }
    );
  }
);

app.get("/vratiBezOcene", authenticationMiddlewareDelegat(), (req, res) => {
  const id_delegata = req.session.passport.user.user.id;
  console.log(id_delegata);
  db.query(
    `SELECT id_utakmice,rezultat,gosti,domaci,id_sudije,ime_lige,datum FROM utakmica WHERE id_delegata='${id_delegata}' AND ocena_sudije='NULL' AND ima_statistiku='Y'`,
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

app.post("/ocenaSudije", authenticationMiddlewareDelegat(), (req, res) => {
  const ocena_sudije = req.body.ocena_sudije;
  const id_utakmice = req.body.id_utakmice;
  db.query(
    `UPDATE utakmica SET ocena_sudije=? WHERE id_utakmice='${id_utakmice}'`,
    [ocena_sudije],
    (err, res) => {
      if (err) throw err;
      else {
        console.log("Uspeh!");
      }
    }
  );
});

app.get("/vratiOcene", (req, res) => {
  const idSudije = req.session.passport.user.user.id;
  db.query(
    `SELECT ocena_sudije,id_sudije FROM utakmica WHERE id_sudije='${idSudije}'`,
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

app.get("/vratiOdredjeniProfil", (req, res) => {
  const zvanje = req.session.passport.user.user.zvanje;
  const admin = req.session.passport.user.user.admin;
  if (zvanje == "sudija") {
    res.redirect("/sudijaProfil");
  }
  if (zvanje == "delegat") {
    res.redirect("/profileDelegat");
  }
  if (zvanje == "sekretar") {
    res.redirect("/sekretarProfil");
  }
  if (admin == "Y") {
    res.redirect("/adminProfil");
  }
});

app.post("/updateSudiju", authenticationMiddlewareSudija(), (req, res) => {
  const ime = req.body.ime;
  const prezime = req.body.prezime;
  const opis = req.body.opis;
  const br_telefona = req.body.br_telefona;
  const email = req.body.email;
  const id_sudije = req.session.passport.user.user.id;
  console.log(ime);
  console.log(prezime);
  console.log(opis);
  console.log(br_telefona);
  console.log(email);

  db.query(
    `UPDATE korisnik NATURAL JOIN clan_saveza NATURAL JOIN sudija SET ime=?,prezime=?,opis=?,br_telefona=?,email=? WHERE id='${id_sudije}'`,
    [ime, prezime, opis, br_telefona, email],
    (err, result) => {
      if (err) throw err;
      else {
        console.log("Uspeh!");
      }
    }
  );
});

app.post("/updateDelegata", authenticationMiddlewareDelegat(), (req, res) => {
  const ime = req.body.ime;
  const prezime = req.body.prezime;
  const opis = req.body.opis;
  const br_telefona = req.body.br_telefona;
  const email = req.body.email;
  const id_delegata = req.session.passport.user.user.id;
  console.log(ime);
  console.log(prezime);
  console.log(opis);
  console.log(br_telefona);
  console.log(email);

  db.query(
    `UPDATE korisnik NATURAL JOIN clan_saveza NATURAL JOIN delegat SET ime=?,prezime=?,opis=?,br_telefona=?,email=? WHERE id='${id_delegata}'`,
    [ime, prezime, opis, br_telefona, email],
    (err, result) => {
      if (err) throw err;
      else {
        console.log("Uspeh!");
      }
    }
  );
});

app.post("/updateSekretara", authenticationMiddlewareSekretar(), (req, res) => {
  const ime = req.body.ime;
  const prezime = req.body.prezime;
  const opis = req.body.opis;
  const br_telefona = req.body.br_telefona;
  const email = req.body.email;
  const id_sekretara = req.session.passport.user.user.id;
  console.log(ime);
  console.log(prezime);
  console.log(opis);
  console.log(br_telefona);
  console.log(email);

  db.query(
    `UPDATE korisnik NATURAL JOIN clan_saveza NATURAL JOIN sekretar SET ime=?,prezime=?,opis=?,br_telefona=?,email=? WHERE id='${id_sekretara}'`,
    [ime, prezime, opis, br_telefona, email],
    (err, result) => {
      if (err) throw err;
      else {
        console.log("Uspeh!");
      }
    }
  );
});

// VRATI BEZ STATISTIKE
app.get("/vratiBezStat", authenticationMiddlewareSudija(), (req, res) => {
  var idSudije = req.session.passport.user.user.id;
  console.log(idSudije);
  db.query(
    `SELECT id_utakmice,rezultat,gosti,domaci,datum FROM utakmica WHERE id_sudije='${idSudije}' AND ima_statistiku='N'`,
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

app.get("/vratiDelegata", authenticationMiddlewareDelegat(), (req, res) => {
  console.log(req.session.passport.user.user);
  var delegatUser = req.session.passport.user.user;
  db.query(
    `SELECT ime,username,prezime,godina_rodjenja,email,slika,zvanje,opis,br_telefona FROM korisnik natural join clan_saveza natural join delegat WHERE id='${
      delegatUser.id
    }'`,
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

app.get("/vratiSekretara", authenticationMiddlewareSekretar(), (req, res) => {
  console.log(req.session.passport.user.user);
  var sekretarUser = req.session.passport.user.user;
  db.query(
    `SELECT username,ime,prezime,godina_rodjenja,email,slika,zvanje,opis,br_telefona FROM korisnik natural join clan_saveza natural join sekretar WHERE id='${
      sekretarUser.id
    }'`,
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

app.get("/adminProfil", authenticationMiddlewareAdmin(), (req, res) => {
  res.render("admin");
});

app.get("/sekretarProfil", authenticationMiddlewareSekretar(), (req, res) => {
  res.render("sekretarProfil");
});

passport.use(
  "delegat-login",
  new LocalStrategy((username, password, done) => {
    console.log(username);
    console.log(password);

    db.query(
      "SELECT id, password, zvanje FROM korisnik natural join clan_saveza WHERE zvanje='delegat' AND username = ?",
      [username],
      (err, result, fields) => {
        if (err) {
          done(err);
        }
        if (result.length === 0) {
          done(null, false);
        } else {
          console.log(result[0].password);
          const hash = result[0].password.toString();
          bcrypt.compare(password, hash, (err, res) => {
            if (res === true) {
              return done(null, { user: result[0] });
            } else {
              return done(null, false);
            }
          });
        }
      }
    );
  })
);

passport.use(
  "sudija-login",
  new LocalStrategy((username, password, done) => {
    console.log(username);
    console.log(password);

    db.query(
      "SELECT id, password, zvanje FROM korisnik natural join clan_saveza WHERE zvanje='sudija' AND username = ?",
      [username],
      (err, result, fields) => {
        if (err) {
          done(err);
        }
        if (result.length === 0) {
          done(null, false);
        } else {
          console.log(result[0].password);
          const hash = result[0].password.toString();
          bcrypt.compare(password, hash, (err, res) => {
            if (res === true) {
              return done(null, { user: result[0] });
            } else {
              return done(null, false);
            }
          });
        }
      }
    );
  })
);

passport.use(
  "sekretar-login",
  new LocalStrategy((username, password, done) => {
    console.log(username);
    console.log(password);

    db.query(
      "SELECT id, password, zvanje FROM korisnik natural join clan_saveza WHERE zvanje='sekretar' AND username = ?",
      [username],
      (err, result, fields) => {
        if (err) {
          done(err);
        }
        if (result.length === 0) {
          done(null, false);
        } else {
          console.log(result[0].password);
          const hash = result[0].password.toString();
          bcrypt.compare(password, hash, (err, res) => {
            if (res === true) {
              return done(null, { user: result[0] });
            } else {
              return done(null, false);
            }
          });
        }
      }
    );
  })
);

passport.use(
  "admin-login",
  new LocalStrategy((username, password, done) => {
    console.log(username);
    console.log(password);

    db.query(
      "SELECT id, password, admin FROM korisnik WHERE admin='Y' AND username = ?",
      [username],
      (err, result, fields) => {
        if (err) {
          done(err);
        }
        if (result.length === 0) {
          done(null, false);
        } else {
          console.log(result[0].password);
          const hash = result[0].password.toString();
          bcrypt.compare(password, hash, (err, res) => {
            if (res === true) {
              return done(null, { user: result[0] });
            } else {
              return done(null, false);
            }
          });
        }
      }
    );
  })
);

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const ime = req.body.ime;
  const prezime = req.body.prezime;
  const godina_rodjenja = req.body.godina_rodjenja;
  const br_telefona = req.body.br_telefona;
  const email = req.body.email;
  const admin = req.body.admin;
  const zvanje = req.body.zvanje;
  const slika = req.body.slika;
  const opis = req.body.opis;
  const bivsi_clan = req.body.bivsi_clan;
  const reg_broj_saveza = req.body.reg_broj_saveza;
  const ocena = req.body.ocena;
  const clanarina = req.body.clanarina;
  const god_poc_sudjenja = req.body.god_poc_sudjenja;
  const ime_lige = req.body.ime_lige;
  bcrypt.hash(password, saltRounds, function(err, hash) {
    db.query(
      "INSERT INTO korisnik (username,password,ime,prezime,godina_rodjenja,br_telefona,email,admin) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        username,
        hash,
        ime,
        prezime,
        godina_rodjenja,
        br_telefona,
        email,
        admin
      ],
      (err, result) => {
        if (err) throw err;

        // db.query(
        //   `INSERT INTO clan_saveza(id,username,zvanje,slika,opis,bivsi_clan,reg_broj_saveza) VALUES (LAST_INSERT_ID(),(SELECT username FROM korisnik WHERE username='${username}'),?, ?, ?, ?, ?)`,
        //   [zvanje, slika, opis, bivsi_clan, reg_broj_saveza],
        //   (err, result) => {
        //     if (err) throw err;

        //     db.query(
        //       `INSERT INTO sudija(id,username,ocena,clanarina,god_poc_sudjenja,id_sekretara,ime_lige) VALUES (LAST_INSERT_ID(), (SELECT username FROM clan_saveza WHERE username='${username}'), ?, ?, ?, 9, ?)`,
        //       [ocena, clanarina, god_poc_sudjenja, ime_lige],
        //       (err, result) => {
        //         if (err) throw err;

        //         db.query(
        //           "SELECT LAST_INSERT_ID() as user_id",
        //           (err, result, fields) => {
        //             if (err) throw err;

        //             const user_id = result[0];

        //             console.log(result[0]);
        //             req.login(user_id, err => {
        //               res.redirect("/");
        //             });
        //           }
        //         );
        //       }
        //     );
        //   }
        // );

        console.log("Uspeh!");
      }
    );
  });
});

app.post(
  "/loginSekretar",
  passport.authenticate("sekretar-login", {
    successRedirect: "/sekretarProfil",
    failureRedirect: "/"
  })
);

app.post(
  "/loginAdmin",
  passport.authenticate("admin-login", {
    successRedirect: "/adminProfil",
    failureRedirect: "/"
  })
);

app.post(
  "/loginSudija",
  passport.authenticate("sudija-login", {
    successRedirect: "/sudijaProfil",
    failureRedirect: "/"
  })
);

app.post(
  "/loginDelegat",
  passport.authenticate("delegat-login", {
    successRedirect: "/profileDelegat",
    failureRedirect: "/"
  })
);

//error -> page not found
// app.use((req, res, next) => {
//   var err = new Error("Page not found!");
//   err.status = 404;
//   next(err);
// });

// //handling errors
// app.use((err, req, res, next) => {
//   res.status(err.status || 500);
//   res.send(err.message);
// });

app.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

function authenticationMiddlewareDelegat() {
  return (req, res, next) => {
    var pom = req.session.passport.user.user.zvanje;
    console.log(pom);

    if (req.isAuthenticated() && pom == "delegat") return next();
    res.redirect("/");
  };
}

function authenticationMiddlewareSekretar() {
  return (req, res, next) => {
    var pom = req.session.passport.user.user.zvanje;
    console.log(pom);

    if (req.isAuthenticated() && pom == "sekretar") return next();
    res.redirect("/");
  };
}

function authenticationMiddlewareAdmin() {
  return (req, res, next) => {
    var pom = req.session.passport.user.user.admin;
    console.log(pom);

    if (req.isAuthenticated() && pom == "Y") return next();
    res.redirect("/");
  };
}

function authenticationMiddlewareSudija() {
  return (req, res, next) => {
    var pom = req.session.passport.user.user.zvanje;
    console.log(pom);

    if (req.isAuthenticated() && pom == "sudija") return next();
    res.redirect("/");
  };
}

// STARTOVANJE SERVERA
app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
