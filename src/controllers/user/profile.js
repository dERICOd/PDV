const bcrypt = require("bcrypt");
const { knex } = require("../connection");
const jwt = require("jsonwebtoken");
const errorMessages = require("../helpers/errorMessages");
const utils = require("../helpers/utils");

const userProfile = (req, res) => {
  try {
    const { senha: _, ...userProfile } = req.user;
    res.status(200).json(userProfile);
  } catch ({ message }) {
    return res
      .status(500)
      .json({ mensagem: errorMessages.server, error: message });
  }
};

module.exports = {
  userProfile,
};
