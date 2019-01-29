const passwordValidator = require("password-validator");
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
    .digits()   // Must have digits
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

const isUserExisted = uname => {
  return false;
};

module.exports = {
  isStrongPwd,
  isUserExisted
};
