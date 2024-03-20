const bcrypt = require("bcrypt");
const { knex } = require("../connection");
const jwt = require("jsonwebtoken");
const yup = require("yup");
const { pt } = require("yup-locales");
const errorMessages = require("../helpers/errorMessages");
const utils = require("../helpers/utils");
const {
	validateNomeEmailSenha,
	validateEmailSenha,
} = require("../helpers/schemas_users");
yup.setLocale(pt);

const registerFields = async (req, res, next) => {
	const { nome, email, senha } = req.body;
	try {
		await validateNomeEmailSenha.validate({ email, nome, senha });

		if (await utils.getUser(email)) {
			return res.status(409).json({ mensagem: errorMessages.duplicateEmail });
		}

		next();
	} catch (error) {
		if (error.name == "ValidationError") {
			return res.status(400).json({ mensagem: error.message });
		}

		return res.status(500).json({ mensagem: error.message });
	}
};

const loginFields = async (req, res, next) => {
	const { email, senha } = req.body;

	try {
		await validateEmailSenha.validate({ email, senha });
		const user = await utils.getUser(email);

		if (!user) {
			return res.status(404).json({ mensagem: errorMessages.invalidEmailOrSenha });
		}

		const passwordIsValid = await bcrypt.compare(senha, user.senha);

		if (!passwordIsValid) {
			return res.status(401).json({ mensagem: errorMessages.invalidEmailOrSenha });
		}

		next();
	} catch (error) {
		if (error.name == "ValidationError") {
			return res.status(400).json({ mensagem: error.message });
		}

		return res
			.status(500)
			.json({ message: errorMessages.server, error: error.message });
	}
};

const updateFields = async (req, res, next) => {
	const { nome, email, senha } = req.body;

	try {
		await validateNomeEmailSenha.validate({ nome, email, senha });

		if (await utils.emailIsRegistered(email, req.user.id)) {
			return res.status(409).json({ mensagem: errorMessages.duplicateEmail });
		}

		next();
	} catch (error) {
		if (error.name == "ValidationError") {
			return res.status(400).json({ mensagem: error.message });
		}

		return res
			.status(500)
			.json({ message: errorMessages.server, error: error.message });
	}
};

const auth = async (req, res, next) => {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).json({ mensagem: errorMessages.invalidToken });
	}

	const token = authorization.split(" ")[1];
	try {
		const { id } = jwt.verify(token, process.env.JWT_PASS);
		const user = await knex("usuarios").where({ id }).first();

		if (!user) {
			return res.status(400).json({ mensagem: errorMessages.invalidToken });
		}

		delete user.senha;
		req.user = user;

		next();
	} catch ({ message }) {
		return res
			.status(500)
			.json({ mensagem: errorMessages.server, error: message });
	}
};

module.exports = {
	registerFields,
	loginFields,
	updateFields,
	updateFields,
	auth,
};