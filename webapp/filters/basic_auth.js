async function basicAuth(ctx, next) {
  const { request, response } = ctx;
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

  const user = await userService.authenticate({ username, password });
  if (!user) {
    response.status = 401;
    response.body = { message: "Invalid Authentication Credentials" };
    return;
  }

  next();
}
