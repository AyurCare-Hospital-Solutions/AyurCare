const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

const Ward = sequelize.define("wards", { name: DataTypes.STRING }, { timestamps: false });

module.exports = Ward;