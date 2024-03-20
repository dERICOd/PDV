const { knex } = require("../connection");
const errorMessages = require("../helpers/errorMessages");
const utils = require("../helpers/utils");

const listProducts = async (req, res) => {
  const { categoria_id } = req.query;

  try {
    if (categoria_id) {
      const listProductsByCategory = await knex("produtos").where({
        categoria_id,
      });

      return res.status(200).json(listProductsByCategory);
    }
    const productList = await knex("produtos").orderBy("id");

    return res.status(200).json(productList);
  } catch ({ message }) {
    return res
      .status(500)
      .json({ mensagem: errorMessages.server, error: message });
  }
};

module.exports = {
  listProducts,
};
