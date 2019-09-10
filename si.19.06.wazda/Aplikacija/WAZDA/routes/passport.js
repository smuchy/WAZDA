// var LocalStrategy = require("passport-local");
// var db = require("./dbconnect");

// module.exports = function(passport) {
//   passport.serializeUser((user, done) => {
//     done(null, user.username);
//   });

//   passport.deserializeUser((username, done) => {
//     db.query(
//       "SELECT * FROM korisnik WHERE username = ?",
//       [username],
//       (err, rows) => {
//         done(err, rows[0]);
//       }
//     );
//   });

//   passport.use(
//     "local-login",
//     new LocalStrategy(
//       {
//         usernameField: "username",
//         passwordField: "password",
//         passReqToCallback: true
//       },
//       (req, username, password, done) => {
//         db.query(
//           "SELECT * FROM korisnik WHERE username=?",
//           [username],
//           (err, row) => {
//             if (err) {
//               return done(err);
//             }
//             if (!rows.length) {
//               return done(
//                 null,
//                 false,
//                 req.flash("loginMessage", "No User Found!")
//               );
//             }
//             if (!bcrypt.compareSync(password, rows[0].password)) {
//               return done(
//                 null,
//                 false,
//                 req.flash("loginMessage", "Wrong Password!")
//               );
//             }
//             return done(null, rows[0]);
//           }
//         );
//       }
//     )
//   );
// };
