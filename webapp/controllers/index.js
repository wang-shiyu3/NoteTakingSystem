const Router = require("koa-router");
const router = new Router();
const dayjs = require("dayjs");
const user = require("./user");
const note = require("./note");
const attachment = require("./attachment");

const basicAuth = require("./../filters/basic_auth");
const noteService = require("./../services/note");

router.get("/", basicAuth, ctx => {
  ctx.body = { time: dayjs().format("HH:mm:ss MM/DD/YYYY") };
});

router.use("/user", user.routes());
router.use("/note", basicAuth, note.routes());
router.use(
  "/note/:nid/attachments",
  basicAuth,
  noteService.HPTATN,
  attachment.routes()
);

module.exports = router;
