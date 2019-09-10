var express = require("express");
var router = express.Router();
var path = require("path");
var db = require("./dbconnect");

router.get("/vratiTerene", (req, res) => {
  db.query("SELECT id_terena,lokacija,naziv FROM teren", (err, result) => {
    if (err) throw err;
    else {
      return res.json({
        data: result
      });
    }
  });
});

module.exports = router;
