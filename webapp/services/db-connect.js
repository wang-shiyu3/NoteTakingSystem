//Including dependency
const Sequelize = require("sequelize");

//Setting up the config
const sequelize = new Sequelize("csye6225", "admin", "xxxxxx", {
  host: "3.17.36.232",
  port: 3306,
  dialect: "mysql",
  logging: false
});

// Checking connection status
// sequelize
//   .authenticate()
//   .then(function(err) {
//     if (err) {
//       console.log("There is connection in ERROR");
//     } else {
//       // sequelize.query("delete from users").then(function(rows) {
//       //   console.log(JSON.stringify(rows));
//       // });

//       sequelize.query("select * from users").then(function(rows) {
//         console.log(JSON.stringify(rows));
//       });
//       console.log("Connection has been established successfully");
//     }
//   })
//   .catch(err => {
//     console.log(err);
//   });

module.exports = sequelize;
