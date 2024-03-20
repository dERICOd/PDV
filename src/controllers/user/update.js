const bcrypt = require("bcrypt");
const { knex } = require("../connection");
const jwt = require("jsonwebtoken");
const errorMessages = require("../helpers/errorMessages");
const utils = require("../helpers/utils");

const updateUser = async (req, res) => {
  const { id } = req.user;
  const { nome, email, senha } = req.body;
  try {
    const passwordEncrypted = await bcrypt.hash(senha, 10);

    await knex("usuarios")
      .update({ nome, email, senha: passwordEncrypted })
      .where({ id })
      .returning("*");

    return res.status(204).json();
  } catch ({ message }) {
    return res
      .status(500)
      .json({ mensagem: errorMessages.server, error: message });
  }
};

module.exports = {
  updateUser,
};
