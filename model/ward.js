const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

const Ward = sequelize.define("ward", { name: DataTypes.STRING });

module.exports = Ward;