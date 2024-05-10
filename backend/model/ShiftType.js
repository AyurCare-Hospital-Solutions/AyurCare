const { DataTypes, Model } = require("sequelize");
const { sequelize } = require(".");

const ShiftType = sequelize.define(
  "ShiftType",
  {
    name: DataTypes.TEXT,
    startTime: DataTypes.TIME,
    endTime: DataTypes.TIME,
  },
  { timestamps: false }
);

module.exports = { ShiftType };
