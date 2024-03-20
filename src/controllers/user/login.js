const bcrypt = require("bcrypt");
const { knex } = require("../connection");
const jwt = require("jsonwebtoken");
const errorMessages = require("../helpers/errorMessages");
const utils = require("../helpers/utils");

const login = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await utils.getUser(email);

    const token = jwt.sign({ id: user.id }, process.env.JWT_PASS, {
      expiresIn: "8h",
    });

    delete user.senha;

    return res.status(200).json({ usuario: user, token });
  } catch ({ message }) {
    return res
      .status(500)
      .json({ mensagem: errorMessages.server, error: message });
  }
};

module.exports = {
  login,
};
