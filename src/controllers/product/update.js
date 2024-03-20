const { knex } = require("../connection");
const errorMessages = require("../helpers/errorMessages");
const utils = require("../helpers/utils");

const updateProduct = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const { id } = req.params;
  const { file } = req;

  try {
    if (!file) {
      const [product] = await knex("produtos")
        .update({
          descricao,
          quantidade_estoque,
          valor,
          categoria_id,
        })
        .where({ id })
        .returning("*");

      return res.status(200).json(product);
    }

    const foundImage = await knex("produtos")
      .select("produto_imagem")
      .where({ id })
      .returning("*");

    if (foundImage) {
      await utils.deleteImage(foundImage);

      await knex("produtos")
        .update({ produto_imagem: null })
        .where({ id })
        .returning("*");

      const { Location: produto_imagem } = await utils.setProductImage(file);

      const [product] = await knex("produtos")
        .update({
          descricao,
          quantidade_estoque,
          valor,
          categoria_id,
          produto_imagem,
        })
        .where({ id })
        .returning("*");

      return res.status(200).json(product);
    }

    const { Location: produto_imagem } = await utils.setProductImage(file);

    const [product] = await knex("produtos")
      .update({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
        produto_imagem,
      })
      .where({ id })
      .returning("*");

    return res.status(200).json(product);
  } catch ({ message }) {
    return res
      .status(500)
      .json({ mensagem: errorMessages.server, error: message });
  }
};

module.exports = {
  updateProduct,
};
