const { DataTypes, Model } = require("sequelize");
const { sequelize } = require(".");
const ShiftType = require("./ShiftType");

const Shift = sequelize.define("Shift", {
    date: DataTypes.DATEONLY
}, { timestamps: false });



Shift.belongsTo(ShiftType);
module.exports = Shift;