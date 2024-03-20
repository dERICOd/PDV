const yup = require("yup");
const { pt } = require("yup-locales");
yup.setLocale(pt);

const yupMessages = {
    requiredProductId: "Produto_id é um campo necessário.",
    requiredQuantityProduct: "Quantidade_produto é um campo necessário.",
    minOrderProduct: "Pedido_produtos: Os campos produto_id e quantidade_produto são necessários.",
    minValueProduct: "O valor não pode ser negativo ou zero!",
    minQuantityStock: "Quantidade_estoque não pode ser negativo ou zero! "
}

module.exports = yupMessages;