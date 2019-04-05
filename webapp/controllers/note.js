const Router = require("koa-router");
const Note = require("./../model/note");

const Attachment = require("./../model/attachment");
const s3 = require("../services/s3");
const logger = require("./../services/log");

const router = new Router();

// Get all notes
router.get("/all", async ctx => {
  const uid = ctx.request.uid;
  const notes = await Note.findAll({
    where: { uid },
    include: [{ model: Attachment }]
  });
  logger.info("Get all notes");
  ctx.body = notes;
});

// Get one note
router.get("/:id", async ctx => {
  const {
    request: { uid },
    params: { id }
  } = ctx;
  const note = await Note.find({
    where: { uid, id },
    include: [{ model: Attachment }]
  });
  logger.info("Get one note");
  ctx.body = note.toJSON();
});

// Create new one
router.post("/", async ctx => {
  const {
    request: {
      body: { content, title },
      uid
    }
  } = ctx;
  const note = await Note.create({ uid, content, title });
  ctx.status = 201;
  const { uid: noo, ...ret } = note.toJSON();
  ctx.body = ret;
});

// Update new one
router.put("/:id", async ctx => {
  const {
    request: {
      uid,
      body: { content }
    },
    params: { id }
  } = ctx;
  const note = await Note.update({ content }, { where: { id, uid } });
  ctx.body = { row_affected: note };
});

// Delete one
router.delete("/:id", async ctx => {
  const {
    request: { uid },
    params: { id }
  } = ctx;

  const attachments = await Attachment.findAll({ where: { nid: id } });
  for (let attachment of attachments) {
    await s3.remove(attachment.url.split("/").pop());
  }
  const note = await Note.destroy({ where: { id, uid } });
  const attachment = await Attachment.destroy({ where: { nid: id } });
  ctx.body = { row_affected: { note, attachment } };
});

module.exports = router;
