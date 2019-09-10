const mysql = require("mysql");
const util = require("util");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "infiniteminds123",
  database: "wazda"
});

db.connect(err => {
  if (err) {
    console.log("DB connection failed " + err);
  } else {
    console.log("DB connection succeded!");
  }
});

module.exports = db;
