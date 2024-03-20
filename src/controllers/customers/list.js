const { knex } = require("../connection");
const errorMessages = require("../helpers/errorMessages");
const utils = require("../helpers/utils");

const getAllCustomers = async (req, res) => {
  try {
    const allClients = await knex("clientes").orderBy("id");

    return res.status(200).json(allClients);
  } catch ({ message }) {
    return res
      .status(500)
      .json({ mensagem: errorMessages.server, error: message });
  }
};

module.exports = {
  getAllCustomers,
};
