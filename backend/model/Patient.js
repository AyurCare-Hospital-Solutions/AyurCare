const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

const Patient = sequelize.define("Patients", {
    name: DataTypes.STRING(100),
    nic: DataTypes.STRING(15),
    phone: DataTypes.STRING(14),
    email: { type: DataTypes.STRING(50), validate: { isEmail: true, notEmpty: true } },
    address: DataTypes.STRING(255),
    tracking_no: DataTypes.STRING(15),
});

module.exports = Patient;