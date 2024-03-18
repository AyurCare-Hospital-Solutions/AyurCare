const { DataTypes, Model } = require("sequelize");
const { sequelize } = require(".");

const ShiftType = sequelize.define("ShiftType", {
    startTime: DataTypes.TIME,
    endTime: DataTypes.TIME
}, { timestamps: false });



module.exports = ShiftType;