const { DataTypes, Model } = require("sequelize");
const { sequelize } = require(".");
const Staff = require("./Staff")

const Log = sequelize.define("Log", {
    description: DataTypes.STRING(100),
    action: DataTypes.STRING(20),
});

Log.belongsTo(Staff, { onDelete: "SET NULL" });

module.exports = Log;