const user = {
  username: "k@husky.neu.edu",
  password: "!Pa1990528"
};

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

  if (!(user.username == username && user.password == password)) {
    response.status = 401;
    response.body = { message: "Invalid Authentication Credentials" };
    return;
  }

  next();
}

module.exports = basicAuth;
