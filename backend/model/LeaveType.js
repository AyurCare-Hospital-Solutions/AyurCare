const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

const LeaveType = sequelize.define(
  "LeaveType",
  {
    name: DataTypes.STRING,
    hours: DataTypes.FLOAT,
  },
  { timestamps: false }
);

//LeaveType.sync({ alter: true });

module.exports = LeaveType;
