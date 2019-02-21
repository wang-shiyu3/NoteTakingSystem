const Sequelize = require("sequelize");
const sequelize = require("./../services/db-connect");

const Note = sequelize.define("note", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  uid: Sequelize.UUID,
  title: Sequelize.STRING,
  content: Sequelize.STRING
});

module.exports = Note;
