const Sequelize = require("sequelize");
const sequelize = require("./../services/db-connect");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

User.sync();

module.exports = User;
