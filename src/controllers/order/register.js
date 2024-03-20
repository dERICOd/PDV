const { knex } = require("../connection");
const errorMessages = require("../helpers/errorMessages");
const successMessages = require("../helpers/successMessages");
const utils = require("../helpers/utils");
const { send } = require("../nodemailer");

const registerOrder = async (req, res) => {
  const { cliente_id, pedido_produtos, observacao } = req.body;
  try {
    const client = await utils.getCustomer(cliente_id);
    send(
      client.email,
      successMessages.subjectNewOrder,
      successMessages.bodyNewOrder(client.nome)
    );

    const totalValue = await utils.getOrderTotalValue(pedido_produtos);
    const [orderFull] = await knex("pedidos")
      .insert({ cliente_id, observacao, valor_total: totalValue })
      .returning("*");

    await utils.insertOrderProduct(pedido_produtos, orderFull.id);

    return res.status(201).json();
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: errorMessages.server, error: error.message });
  }
};

module.exports = {
  registerOrder,
};
