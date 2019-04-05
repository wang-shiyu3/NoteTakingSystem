const Sequelize = require("sequelize");
const sequelize = require("./../services/db-connect");
const s3 = require("./../services/s3");
const Attachment = sequelize.define(
  "attachment",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    nid: Sequelize.UUID, // note id
    url: Sequelize.STRING
  },
  {
    hooks: {
      beforeDestroy: async (attachment, options, fn) => {
        await s3.remove(attachment.url.split("/").pop());
        fn(null, attachment);
      },
      beforeUpdate: async (attachment, options, fn)=>{
        await s3.remove(attachment.url.split("/").pop());
        fn(null, attachment);
      }
    }
  }
);

Attachment.sync();
module.exports = Attachment;
