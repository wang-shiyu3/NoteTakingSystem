const Router = require("koa-router");
const {
  isStrongPwd,
  isUserExisted,
  encryptPwd
} = require("./../services/user");
const router = new Router();

router.post("/register", ctx => {
  const { request, response } = ctx;
  const { username, password } = request.body;
  const vs = isStrongPwd(password);
  if (vs.length) {
    ctx.body = { message: vs };
    return;
  }
  const isUserExistedMsg = isUserExisted(username);
  if (isUserExistedMsg) {
    ctx.body = { message: isUserExistedMsg };
    return;
  }

  encryptPwd(password);

  ctx.body = request.body;
});

module.exports = router;
