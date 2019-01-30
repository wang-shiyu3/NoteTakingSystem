const jwt = require("jsonwebtoken");
const secret = "csye6225";
const sign = (id, username) => {
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: { id, username }
    },
    secret
  );
};
const verify = token => {
  let decoded = null;
  try {
    decoded = jwt.verify(token, secret);
  } catch (err) {
    return err;
  }
  return decoded;
};
module.exports = {
  sign,
  verify
};
