const Sequelize = require("sequelize");
const sequelize = require("./../services/db-connect");

const Note = sequelize.define("note", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  uid: Sequelize.INTEGER,
  content: Sequelize.STRING
});

module.exports = Note;
