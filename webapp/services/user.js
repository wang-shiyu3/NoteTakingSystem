const passwordValidator = require("password-validator");
const bcrypt = require("bcrypt");

const schema = new passwordValidator();

const pwdDesc = {
  min: "Minimum length 8",
  max: "Maximum length 100",
  uppercase: "Must have uppercase letters",
  lowercase: "Must have lowercase letters",
  digits: "Must have digits",
  spaces: "Should not have spaces",
  symbols: "Must have symbols"
};

const isStrongPwd = pwd => {
  schema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(100) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits() // Must have digits
    .has()
    .symbols() // Must have symbols
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .oneOf(["Passw0rd", "Password123"]); // Blacklist these values
  return schema.validate(pwd + "", { list: true }).map(desc => pwdDesc[desc]);
};

const { users } = require("./../mock");
const isUserExisted = username => {
  const flag = users.filter(user => user.username == username);
  if (flag.length) {
    return "User is existed";
  }
  return false;
};

const encryptPwd = pwd => {
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(pwd, salt, function(err, hash) {
      console.log(hash);
    });
  });
};

const checkPwd = async (pwd, passwordHash) => {
  const match = await bcrypt.compare(pwd, passwordHash);
  console.log(match)
  return match;
};

module.exports = {
  isStrongPwd,
  isUserExisted,
  encryptPwd,
  checkPwd
};
