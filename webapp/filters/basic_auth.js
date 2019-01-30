const { users } = require("./../mock");
const { checkPwd } = require("./../services/user");
const { sign, verify } = require("./../services/jwt");

async function basicAuth(ctx, next) {
  const { request, response } = ctx;

  const token = ctx.cookies.get("token");
  const decodedToken = verify(token);
  console.log(decodedToken instanceof Error);
  if (!(decodedToken instanceof Error)) {
    next();
    return;
  }

  if (
    !request.headers.authorization ||
    request.headers.authorization.indexOf("Basic ") === -1
  ) {
    response.status = 401;
    response.body = { message: "Missing Authorization Header" };
    return;
  }

  const base64Credentials = request.headers.authorization.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  const [username, password] = credentials.split(":");

  const getUser = users.filter(
    async user =>
      user.username == username && (await checkPwd(password, user.password))
  );

  if (!getUser.length) {
    response.status = 401;
    response.body = { message: "Invalid Authentication Credentials" };
    return;
  }

  ctx.cookies.set("token", sign(getUser[0].id, getUser[0].username));

  next();
}

module.exports = basicAuth;
