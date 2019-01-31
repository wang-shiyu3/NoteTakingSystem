//Including dependency
var Sequelize = require("sequelize");

//Setting up the config
var sequelize = new Sequelize(
  "",
  "admin",
  "xxxxxx",
  {
    host: "3.17.36.232",
    port: 3306,
    dialect: "mysql"
  }
);

//Checking connection status
sequelize
  .authenticate()
  .then(function(err) {
    if (err) {
      console.log("There is connection in ERROR");
    } else {
      console.log("Connection has been established successfully");
    }
  })
  .catch(err => {
      console.log(err)
  });
