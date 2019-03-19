const Router = require("koa-router");
const User = require("./../model/user");
const logger = require("./../services/log");

const {
  isEmail,
  isStrongPwd,
  isUserExisted,
  encryptPwd
} = require("./../services/user");
const router = new Router();

router.post("/register", async ctx => {
  const { request } = ctx;
  const { username, password } = request.body;

  const checkIsMail = isEmail(username);
  if (!checkIsMail) {
    ctx.body = { message: "Username must be an email" };
    ctx.status = 400;
    return;
  }

  const vs = isStrongPwd(password);
  if (vs.length) {
    ctx.body = { message: vs };
    ctx.status = 400;
    return;
  }
  const isUserExistedMsg = await isUserExisted(username);
  if (isUserExistedMsg) {
    ctx.body = { message: isUserExistedMsg };
    ctx.status = 409;
    return;
  }

  try {
    const hash = await encryptPwd(password);
    const user = await User.create({ username, password: hash });
    logger.info("User was created successfully");
    ctx.body = { message: "User was created successfully" };
  } catch (err) {
    logger.error("User was created failed");
    console.log(err);
  }
});

module.exports = router;
