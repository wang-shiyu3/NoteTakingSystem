const Router = require("koa-router");
const Note = require("./../model/note");

const router = new Router();

// Get all notes
router.get("/all", async ctx => {
  try {
    const uid = ctx.request.uid;
    const notes = await Note.findAll({ where: { uid } });
    ctx.body = notes;
  } catch (err) {
    console.log(err);
  }
});

// Get one note
router.get("/:id", async ctx => {
  const {
    request,
    params: { id }
  } = ctx;
  const uid = request.uid;
  try {
    const note = await Note.find({ where: { uid, id } });
    ctx.body = note.toJSON();
  } catch (err) {
    console.log(err);
  }
});

// Create new one
router.post("/", async ctx => {
  const {
    request: { content, uid }
  } = ctx;
  try {
    const note = await Note.create({ uid, content });
    console.log(uid);
    ctx.body = { id: note.toJSON().id };
  } catch (err) {
    console.log(err);
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
    console.log(err);
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
    ctx.body = { row_affected: note };
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
