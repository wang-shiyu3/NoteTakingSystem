const Router = require("koa-router");
const multer = require("koa-multer");
const upload = multer({ dest: "./../uploads/" });

const Attachment = require("./../model/attachment");
const s3 = require("../services/s3");

const router = new Router();

router.get("/", async ctx => {
  const {
    params: { nid }
  } = ctx;

  try {
    const attachment = await Attachment.findAll({
      where: { nid },
      order: [["createdAt", "ASC"]]
    });
    ctx.body = attachment || {};
  } catch (err) {
    console.log(err);
  }
});

router.post("/", upload.single("doc"), async ctx => {
  const {
    req: { file },
    params: { nid }
  } = ctx;

  try {
    const url = await s3.upload(file);
    const attachment = await Attachment.create({ url, nid });
    ctx.body = attachment ? attachment.toJSON() : {};
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", upload.single("doc"), async ctx => {
  const {
    req: { file },
    params: { id }
  } = ctx;
  try {
    const url = await s3.upload(file);
    let attachment = await Attachment.findOne({ where: { id } });
    await s3.remove(attachment.url.split("/").pop());
    attachment = await Attachment.update({ url }, { where: { id } });
    ctx.body = { row_affected: attachment };
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async ctx => {
  const {
    params: { id }
  } = ctx;
  try {
    const attachment = await Attachment.findOne({ where: { id } });
    await s3.remove(attachment.url.split("/").pop());
    const deleted = await attachment.destroy();
    ctx.body = { row_affected: deleted ? 1 : 0 };
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
