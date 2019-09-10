var express = require("express");
var router = express.Router();
var path = require("path");
var db = require("./dbconnect");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var MySQLStore = require("express-mysql-session")(session);

router.get("/vratiStatistiku/:idUtakmice", (req, res) => {
  const idUtakmice = req.params.idUtakmice;
  db.query(
    `SELECT id,broj_zutih,broj_crvenih,komentar FROM statistika WHERE id_utakmice='${idUtakmice}'`,
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

module.exports = router;
