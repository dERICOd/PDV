const { knex } = require("../connection");
const errorMessages = require("../helpers/errorMessages");
const utils = require("../helpers/utils");

const detailProducts = async (req, res) => {
  const { id } = req.params;

  try {
    const findProduct = await utils.getProduct(id);

    if (!findProduct) {
      return res
        .status(400)
        .json({ mensagem: errorMessages.productNotFound(id) });
    }

    return res.status(200).json(findProduct);
  } catch ({ message }) {
    return res
      .status(500)
      .json({ mensagem: errorMessages.server, error: message });
  }
};

module.exports = {
  detailProducts,
};
