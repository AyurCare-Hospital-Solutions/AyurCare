const { DataTypes, Model } = require("sequelize");
const { sequelize } = require(".");

const Designation = sequelize.define("Designation", {
    name: DataTypes.STRING,
}, { timestamps: false });

module.exports = Designation;