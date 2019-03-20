const Router = require("koa-router");
const Note = require("./../model/note");
const Attachment = require("./../model/attachment");
const s3 = require("../services/s3");

const router = new Router();

// Get all notes
router.get("/all", async ctx => {
  try {
    const uid = ctx.request.uid;
    const notes = await Note.findAll({ where: { uid } });
    ctx.body = notes;
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message
    };
  }
});

// Get one note
router.get("/:id", async ctx => {
  const {
    request: { uid },
    params: { id }
  } = ctx;
  try {
    const note = await Note.find({ where: { uid, id } });
    ctx.body = note.toJSON();
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message
    };
  }
});

// Create new one
router.post("/", async ctx => {
  const {
    request: {
      body: { content, title },
      uid
    }
  } = ctx;
  try {
    const note = await Note.create({ uid, content, title });
    ctx.status = 201;
    const { uid: noo, ...ret } = note.toJSON();
    ctx.body = ret;
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message
    };
  }
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
  try {
    console.log(content);
    const note = await Note.update({ content }, { where: { id, uid } });
    ctx.body = { row_affected: note };
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message
    };
  }
});

// Delete one
router.delete("/:id", async ctx => {
  const {
    request: { uid },
    params: { id }
  } = ctx;

  try {
    const note = await Note.destroy({ where: { id, uid } });
    const attachments = await Attachment.findAll({ where: { nid: id } });
    for (let attachment of attachments) {
      await s3.remove(attachment.url.split("/").pop());
    }
    const attachment = await Attachment.destroy({ where: { nid: id } });
    ctx.body = { row_affected: { note, attachment } };
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message
    };
  }
});

module.exports = router;
