const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const IPDAdmission = require("./IPDAdmission");
const Bed = require("./Bed");

const BedHistory = sequelize.define("BedHistory", {
    assigned: { type: DataTypes.DATE, allowNull: false },
    released: { type: DataTypes.DATE, allowNull: false },
}, { timestamps: false });

BedHistory.belongsTo(IPDAdmission, { onDelete: "SET NULL" });
BedHistory.belongsTo(Bed, { onDelete: "SET NULL" });