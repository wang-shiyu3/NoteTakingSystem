const passwordValidator = require("password-validator");
const bcrypt = require("bcrypt");
const User = require("./../model/user");

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
  const res = schema.validate(pwd + "", { list: true });
  return res.map(desc => pwdDesc[desc]);
};

const isUserExisted = async username => {
  const user = await User.count({ where: { username } });
  if (user > 0) {
    return "User is existed";
  }
  return false;
};

const encryptPwd = async pwd => {
  const saltRounds = 10;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(pwd, salt);
    return hash;
  } catch (err) {
    console.log(err);
  }
};

const fetchUser = async (password, username) => {
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return false;
    }
    const match = await bcrypt.compare(password, user.toJSON().password);

    if (!match) {
      return false;
    }

    return { id: user.id };
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  isStrongPwd,
  isUserExisted,
  encryptPwd,
  fetchUser
};
