const { knex } = require("../connection");
const errorMessages = require("../helpers/errorMessages");
const utils = require("../helpers/utils");

const getCustomerById = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await utils.getCustomer(id);
    return res.status(200).json(client);
  } catch ({ message }) {
    return res
      .status(500)
      .json({ mensagem: errorMessages.server, error: message });
  }
};
module.exports = {
  getCustomerById,
};
