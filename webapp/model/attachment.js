const Sequelize = require("sequelize");
const sequelize = require("./../services/db-connect");

const Attachment = sequelize.define("attachment", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  nid: Sequelize.UUID, // note id
  url: Sequelize.STRING
});

Attachment.sync();

module.exports = Attachment;
