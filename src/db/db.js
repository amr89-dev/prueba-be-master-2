const { Sequelize } = require("sequelize");
require("dotenv").config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
const DB_URL =
  process.env.DB_URL ||
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const db = new Sequelize(DB_URL, { logging: false, native: false });

module.exports = db;
