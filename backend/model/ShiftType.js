const { DataTypes, Model } = require("sequelize");
const { sequelize } = require(".");
const Designation = require("./Designation");

const ShiftType = sequelize.define(
  "ShiftType",
  {
    name: DataTypes.TEXT,
    startTime: DataTypes.TIME,
    endTime: DataTypes.TIME,
  },
  { timestamps: false }
);

const ShiftDesignation = sequelize.define(
  "ShiftDesignation",
  { minAmount: DataTypes.INTEGER },
  { timestamps: false }
);

ShiftType.belongsToMany(Designation, { through: ShiftDesignation });

module.exports = { ShiftType, ShiftDesignation };
