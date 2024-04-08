const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

const Patient = sequelize.define("Patients", {
    name: DataTypes.STRING(100),
    nic: DataTypes.STRING(15),
    age: DataTypes.INTEGER,
    phone: DataTypes.STRING(14),
    dob: DataTypes.DATEONLY,
    gender: DataTypes.STRING(10),
    email: { type: DataTypes.STRING(50), validate: { isEmail: true, notEmpty: true } },
    address: DataTypes.STRING(255),
    tracking_no: DataTypes.STRING(15),
});

module.exports = Patient;