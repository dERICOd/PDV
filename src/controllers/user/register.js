const bcrypt = require("bcrypt");
const { knex } = require("../connection");
const jwt = require("jsonwebtoken");
const errorMessages = require("../helpers/errorMessages");
const utils = require("../helpers/utils");

const registerUser = async (req, res) => {
  const { nome, senha, email } = req.body;
  try {
    const passHash = await bcrypt.hash(senha, 10);
    await knex("usuarios")
      .insert({ nome, email, senha: passHash })
      .returning("*");

    return res.status(201).json();
  } catch ({ message }) {
    return res
      .status(500)
      .json({ mensagem: errorMessages.server, error: message });
  }
};

module.exports = {
  registerUser,
};
