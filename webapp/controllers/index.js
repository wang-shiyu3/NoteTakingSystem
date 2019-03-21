const Router = require("koa-router");
const router = new Router();
const dayjs = require("dayjs");
const statsd = require("./../services/statsd");
const logger = require("./../services/log");
const user = require("./user");
const note = require("./note");
const attachment = require("./attachment");

const basicAuth = require("./../filters/basic_auth");
const noteService = require("./../services/note");

router.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  statsd.increment(`${ctx.method} ${ctx.url}`);
});

router.get("/", basicAuth, ctx => {
  logger.info(dayjs().format("HH:mm:ss MM/DD/YYYY"));
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
