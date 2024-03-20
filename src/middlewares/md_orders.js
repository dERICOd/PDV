const yup = require("yup");
const { pt } = require("yup-locales");
const errorMessages = require("../helpers/errorMessages");
const utils = require("../helpers/utils");
const { validateAllFieldsOrders } = require("../helpers/schemas_orders");
yup.setLocale(pt);

const orderFields = async (req, res, next) => {
  const { cliente_id, pedido_produtos } = req.body;
  try {
    await validateAllFieldsOrders.validate(req.body);

    if (!(await utils.getCustomer(cliente_id))) {
      return res
        .status(404)
        .json({ mensagem: errorMessages.customerNotFound(cliente_id) });
    }

    for (const product of pedido_produtos) {
      if (!(await utils.getProduct(product.produto_id))) {
        return res
          .status(404)
          .json({
            mensagem: errorMessages.productNotFound(product.produto_id),
          });
      }

      if (
        !(await utils.checkMinimumQuantityProduct(
          product.produto_id,
          product.quantidade_produto
        ))
      ) {
        return res
          .status(400)
          .json({
            mensagem: errorMessages.isValidQuantityProduct(
              product.produto_id,
              product.quantidade_produto
            ),
          });
      }

      if (
        !(await utils.checkStockProduct(
          product.produto_id,
          product.quantidade_produto
        ))
      ) {
        return res
          .status(409)
          .json({
            mensagem: errorMessages.hasSufficientStockProduct(
              product.produto_id,
              product.quantidade_produto
            ),
          });
      }
    }

    next();
  } catch (error) {
    if (error.name == "ValidationError") {
      return res.status(400).json({ mensagem: error.message });
    }

    return res
      .status(500)
      .json({ error: error.message, mensagem: errorMessages.server });
  }
};

module.exports = { orderFields };
