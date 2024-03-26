const jwt = require("jsonwebtoken");

const CreateAccessToken = async (user) => {
  const token = await jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

module.exports = { CreateAccessToken };
