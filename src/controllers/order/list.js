const { knex } = require("../connection");
const errorMessages = require("../helpers/errorMessages");
const successMessages = require("../helpers/successMessages");
const utils = require("../helpers/utils");
const { send } = require("../nodemailer");

const listOrders = async (req, res) => {
  const { cliente_id } = req.query;

  try {
    if (cliente_id) {
      const listOrder = await knex("pedidos").where({ cliente_id }).first();

      if (!listOrder) {
        return res.status(404).json({ messagem: errorMessages.orderNotfound });
      }

      const listProductOrder = await knex("pedido_produtos").where(
        "pedido_id",
        listOrder.id
      );

      const objectListOrder = {
        pedido: listOrder,
        pedido_produtos: listProductOrder,
      };

      return res.status(200).json(objectListOrder);
    } else if (!cliente_id) {
      const listOrder = await knex("pedidos").returning("*");
      const listProductOrder = await knex("pedido_produtos").returning("*");

      const objectListOrder = {
        pedido: listOrder,
        pedido_produtos: listProductOrder,
      };

      return res.status(200).json(objectListOrder);
    }
  } catch ({ message }) {
    return res
      .status(500)
      .json({ mensagem: errorMessages.server, error: message });
  }
};

module.exports = {
  listOrders,
};
