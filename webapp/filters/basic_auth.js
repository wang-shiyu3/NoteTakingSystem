const { fetchUser } = require("./../services/user");
const { sign, verify } = require("./../services/jwt");

async function basicAuth(ctx, next) {
  const { request, response } = ctx;

  // const token = ctx.cookies.get("token");
  // const decodedToken = verify(token);
  // if (!(decodedToken instanceof Error)) {
  //   next();
  //   return;
  // }

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

  const getUser = await fetchUser(password, username);

  if (!getUser) {
    response.status = 401;
    response.body = { message: "Invalid Authentication Credentials" };
    return;
  }

  ctx.cookies.set("token", sign(getUser.id, username));
  request.uid = getUser.id;

  await next();
}

module.exports = basicAuth;
