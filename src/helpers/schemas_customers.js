const yup = require("yup");
const { pt } = require("yup-locales");
const { typeErrorString } = require("./errorMessages");
yup.setLocale(pt);

const validateRegisterAndUpdateCustomer = yup.object({
  nome: yup
    .string()
    .required()
    .typeError(typeErrorString("Nome"))
    .strict(),
  email: yup
    .string()
    .email()
    .typeError(typeErrorString("Email"))
    .required()
    .strict(),
  cpf: yup
    .string()
    .length(11)
    .typeError(typeErrorString("CPF"))
    .required()
    .strict(),
  cep: yup.string().length(9).strict(),
  rua: yup.string().strict(),
  numero: yup.string().strict(),
  bairro: yup.string().strict(),
  cidade: yup.string().strict(),
  estado: yup.string().strict(),
});

module.exports = validateRegisterAndUpdateCustomer;