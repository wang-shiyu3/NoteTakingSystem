const Router = require("koa-router");
const multer = require("koa-multer");
const upload = multer({ dest: "./../uploads/" });
const logger = require("./../services/log");

const Attachment = require("./../model/attachment");
const s3 = require("../services/s3");
const {PROFILE} = require("../configs/config");

const router = new Router();

router.get("/", async ctx => {
  const {
    params: { nid }
  } = ctx;
  logger.info(`Get all attachment of ${nid}`);
  const attachment = await Attachment.findAll({
    where: { nid },
    order: [["createdAt", "ASC"]]
  });
  ctx.body = attachment || {};
});

router.post("/", upload.single("doc"), async ctx => {
  const {
    req: { file },
    params: { nid }
  } = ctx;
  let url = PROFILE!="dev" ? await s3.upload(file):"../uploads/"+file.filename;
  const attachment = await Attachment.create({ url, nid });
  ctx.body = attachment ? attachment.toJSON() : {};
});

router.put("/:id", upload.single("doc"), async ctx => {
  const {
    req: { file },
    params: { id }
  } = ctx;
  let url = PROFILE!="dev" ? await s3.upload(file):"../uploads/"+file.filename;
  let attachment = await Attachment.findOne({ where: { id } });

  if(PROFILE!="dev"){
    await s3.remove(attachment.url.split("/").pop());
  }

  attachment = await Attachment.update({ url }, { where: { id } });
  ctx.body = { row_affected: attachment };
});

router.delete("/:id", async ctx => {
  const {
    params: { id }
  } = ctx;
  const attachment = await Attachment.findOne({ where: { id } });
  if(PROFILE!="dev"){
    await s3.remove(attachment.url.split("/").pop());
  }
  const deleted = await attachment.destroy();
  ctx.body = { row_affected: deleted ? 1 : 0 };
});

module.exports = router;
