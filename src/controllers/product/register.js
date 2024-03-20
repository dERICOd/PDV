const { knex } = require("../connection");
const errorMessages = require("../helpers/errorMessages");
const utils = require("../helpers/utils");

const registerProduct = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const { file } = req;
  try {
    const { Location: produto_imagem } = await utils.setProductImage(file);

    await knex("produtos").insert({
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
      produto_imagem,
    });

    return res.status(201).json();
  } catch ({ message }) {
    return res
      .status(500)
      .json({ mensagem: errorMessages.server, error: message });
  }
};

module.exports = {
  registerProduct,
};
