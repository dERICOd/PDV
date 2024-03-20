const { knex } = require("../connection");
const errorMessages = require("../helpers/errorMessages");
const utils = require("../helpers/utils");

const deleteProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const findProduct = await utils.getProduct(id);

    if (!findProduct) {
      return res
        .status(404)
        .json({ mensagem: errorMessages.productNotFound(id) });
    }

    const findProductOrder = await utils.ProductOrder(id);

    if (findProductOrder) {
      return res
        .status(403)
        .json({ mensagem: errorMessages.linkedProduct(findProductOrder.id) });
    }

    const foundImage = await knex("produtos")
      .select("produto_imagem")
      .where({ id })
      .returning("*");

    await utils.deleteImage(foundImage);

    await knex("produtos").del().where({ id });

    return res.status(204).send();
  } catch ({ message }) {
    return res
      .status(500)
      .json({ mensagem: errorMessages.server, error: message });
  }
};

module.exports = {
  deleteProductById,
};
