const Sequelize = require("sequelize");
const sequelize = require("./../services/db-connect");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

module.exports = User;
