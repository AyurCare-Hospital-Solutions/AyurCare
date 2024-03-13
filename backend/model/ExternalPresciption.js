const { DataTypes, ENUM } = require("sequelize");
const { sequelize } = require(".");

const ExternalPrescription = sequelize.define("ExternalPrescription", {
    name: DataTypes.STRING(100),
    phone: DataTypes.STRING(14),
    email: { type: DataTypes.STRING(50), validate: { isEmail: true, notEmpty: true } },
    file: DataTypes.STRING(100),
    status: { type: ENUM, values: ['pending', 'rejected', 'approved'], defaultValue: 'pending' }
});

module.exports = ExternalPrescription;