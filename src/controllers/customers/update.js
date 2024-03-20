const { knex } = require("../connection");
const errorMessages = require("../helpers/errorMessages");
const utils = require("../helpers/utils");

const updateCustomer = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;
  const { id } = req.params;
  try {
    await knex("clientes")
      .update({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado })
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
  updateCustomer,
};
