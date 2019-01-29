const Router = require("koa-router");
const router = new Router();
const dayjs = require("dayjs");
const user = require("./user");

router.get("/", ctx => {
  ctx.body = dayjs().format("HH:mm:ss MM/DD/YYYY");
});

router.use("/user", user.routes());

module.exports = router;
