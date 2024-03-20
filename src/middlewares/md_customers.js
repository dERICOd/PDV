const { knex } = require("../connection");
const yup = require("yup");
const { pt } = require("yup-locales");
const errorMessages = require("../helpers/errorMessages");
const validateRegisterAndUpdateCustomer = require("../helpers/schemas_customers");
const { validateId } = require("../helpers/schemas_id");
const utils = require("../helpers/utils");

yup.setLocale(pt);

const customerRegisterFields = async (req, res, next) => {
  const { email, cpf } = req.body;
  try {
    await validateRegisterAndUpdateCustomer.validate(req.body);

    const find = await knex("clientes")
      .where({ cpf })
      .orWhere({ email })
      .first();
    if (find) {
      return res
        .status(409)
        .json({ mensagem: errorMessages.invalidEmailOrCpf });
    }

    next();
  } catch (error) {
    if (error.name == "ValidationError")
      return res.status(400).json({ mensagem: error.message });

    return res.status(500).json({ mensagem: error.message });
  }
};

const customerUpdateFields = async (req, res, next) => {
  const { email, cpf } = req.body;
  const { id } = req.params;

  try {
    await validateId.validate({ id: Number(id) });

    const findId = await utils.getCustomer(id);

    if (!findId) {
      return res
        .status(400)
        .json({ mensagem: errorMessages.customerNotFound(id) });
    }
    await validateRegisterAndUpdateCustomer.validate(req.body);
    if (email) {
      const findDuplicateEmail = await knex("clientes")
        .where({ email })
        .whereNot({ id })
        .select("*")
        .first();
      if (findDuplicateEmail) {
        return res.status(409).json({ mensagem: errorMessages.duplicateEmail });
      }
    }
    if (cpf) {
      const findDuplicateCPF = await knex("clientes")
        .where({ cpf })
        .whereNot({ id })
        .select("*")
        .first();
      if (findDuplicateCPF) {
        return res.status(409).json({ mensagem: errorMessages.duplicateCPF });
      }
    }
    next();
  } catch (error) {
    if (error.name == "ValidationError") {
      return res.status(400).json({ mensagem: error.message });
    }
    return res.status(500).json({ mensagem: error.message });
  }
};
const customerId = async (req, res, next) => {
  const { id } = req.params;
  try {
    await validateId.validate({ id: Number(id) });
    const costumerFound = await utils.getCustomer(id);
    if (!costumerFound) {
      return res
        .status(404)
        .json({ mensagem: errorMessages.customerNotFound(id) });
    }
    next();
  } catch (error) {
    if (error.name == "ValidationError") {
      return res.status(400).json({ mensagem: error.message });
    }
    return res.status(500).json({ mensagem: error.message });
  }
};
module.exports = {
  customerRegisterFields,
  customerUpdateFields,
  customerId,
};
