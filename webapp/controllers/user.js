const Router = require("koa-router");
const User = require("./../model/user");
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
    return;
  }

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
    const {username, id} = user.toJSON();
    ctx.body = {username, id};
  } catch (err) {
    console.log(err);
  }


});

module.exports = router;
