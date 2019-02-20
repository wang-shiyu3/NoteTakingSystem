const Sequelize = require("sequelize");
const sequelize = require("./../services/db-connect");

const Note = sequelize.define("note", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  uid: Sequelize.INTEGER,
  content: Sequelize.STRING,
  title: Sequelize.STRING,
});

module.exports = Note;
