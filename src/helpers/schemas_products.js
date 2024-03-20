const yup = require("yup");
const { pt } = require("yup-locales");
const { typeErrorString, typeErrorNumber } = require("./errorMessages");
const yupMessages = require("./yupMessages");
yup.setLocale(pt);

const validateAllFieldsProduct = yup.object({
    descricao: yup
        .string()
        .required()
        .typeError(typeErrorString("Descricao"))
        .strict(),
    quantidade_estoque: yup
        .number()
        .min(1, yupMessages.minQuantityStock)
        .required()
        .typeError(typeErrorNumber("Quantidade_estoque"))
        .strict(),
    valor: yup
        .number()
        .min(1, yupMessages.minValueProduct)
        .required()
        .typeError(typeErrorNumber("Valor"))
        .strict(),
    categoria_id: yup
        .number()
        .required()
        .typeError(typeErrorNumber("Categoria_id"))
        .strict(),
    produto_imagem: yup
        .object({
            originalname: yup.string().required(),
            buffer: yup.mixed().required(),
            mimetype: yup.string().required()
        })
        .strict()
});

module.exports = validateAllFieldsProduct;