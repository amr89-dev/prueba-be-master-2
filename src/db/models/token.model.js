const db = require("../db");
const { DataTypes } = require("sequelize");

const Token = db.define("token", {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Token;
