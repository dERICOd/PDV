const yup = require("yup");
const { pt } = require("yup-locales");
const { typeErrorNumber } = require("./errorMessages");
yup.setLocale(pt);

const validateId = yup.object({
  id: yup.number().required().typeError(typeErrorNumber("Id")).strict(),
});

const validateClientId = yup.object({
  cliente_id: yup.number().typeError(typeErrorNumber("Cliente_id")).strict(),
});

module.exports = { validateId, validateClientId };
