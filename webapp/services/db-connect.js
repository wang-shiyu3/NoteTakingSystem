//Including dependency
const Sequelize = require("sequelize");
const {
  DB_HOST,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD
} = require("./../configs/config");
//Setting up the config
const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
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

//       sequelize.query("select * from user").then(function(rows) {
//         console.log(JSON.stringify(rows));
//       });
//       console.log("Connection has been established successfully");
//     }
//   })
//   .catch(err => {
//     console.log(err);
//   });

module.exports = sequelize;
