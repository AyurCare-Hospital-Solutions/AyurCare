const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

const ConditionType = sequelize.define("ConditionType", {
    name: DataTypes.STRING
}, { timestamps: false });

module.exports = ConditionType;