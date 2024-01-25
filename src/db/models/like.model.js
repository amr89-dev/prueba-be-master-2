const { DataTypes } = require("sequelize");
const db = require("../db");

const Like = db.define("like", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  like: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Like;
