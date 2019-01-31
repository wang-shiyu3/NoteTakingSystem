const Router = require("koa-router");
const User = require("./../model/user");
const {
  isStrongPwd,
  isUserExisted,
  encryptPwd
} = require("./../services/user");
const router = new Router();

router.post("/register", async ctx => {
  const { request, response } = ctx;
  const { username, password } = request.body;
  const vs = isStrongPwd(password);
  if (vs.length) {
    ctx.body = { message: vs };
    return;
  }
  const isUserExistedMsg = await isUserExisted(username);
  if (isUserExistedMsg) {
    ctx.body = { message: isUserExistedMsg };
    return;
  }

  try {
    const hash = await encryptPwd(password);
    const user = await User.create({ username, password: hash });
  } catch (err) {
    console.log(err);
  }

  ctx.body = request.body;
});

module.exports = router;
