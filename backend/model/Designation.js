const { DataTypes, Model } = require("sequelize");
const { sequelize } = require(".");
const LeaveType = require("./LeaveType");

const Designation = sequelize.define("Designation", {
    name: DataTypes.STRING,
}, { timestamps: false });

const DesignationLeaves = sequelize.define("DesignationLeave", {
    amount: DataTypes.INTEGER
}, { timestamps: false });

Designation.belongsToMany(LeaveType, { through: DesignationLeaves });


module.exports = Designation;