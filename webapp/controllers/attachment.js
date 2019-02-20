const Router = require("koa-router");
const multer = require("koa-multer");
const upload = multer({ dest: "./../uploads/" });

const Attachment = require("./../model/attachment");
const Note = require("./../model/note");

const router = new Router();

router.get("/", async ctx => {
  const {
    params: { nid }
  } = ctx;

  try {
    const attachment = await Attachment.find({ where: { nid } });
    ctx.body = attachment ? {} : attachment.toJSON();
  } catch (err) {
    console.log(err);
  }
});

router.post("/", upload.single("doc"), async ctx => {
  const {
    request: { file },
    params: { nid }
  } = ctx;

  console.log(file);

  try {
    const attachment = await Attachment.create({ url: "", nid });
    ctx.body = attachment ? {} : attachment.toJSON();
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", () => {});

module.exports = router;
