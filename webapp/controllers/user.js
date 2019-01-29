const Router = require("koa-router");
const { isStrongPwd } = require("./../services/user");
const router = new Router();

router.post("/register", ctx => {
  const { request, response } = ctx;
  console.log(request.body);
  const { username, password } = request.body;
  const vs = isStrongPwd(password);
  if (vs.length) {
    ctx.body = vs;
    return;
  }
  ctx.body = request.body;
});

module.exports = router;
