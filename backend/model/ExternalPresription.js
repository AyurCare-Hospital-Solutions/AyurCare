const { DataTypes, ENUM } = require("sequelize");
const { sequelize } = require(".");

const ExternalPresription = sequelize.define("ExternalPrescription", {
    name: DataTypes.STRING(100),
    age: DataTypes.NUMBER(),
    phone: DataTypes.STRING(14),
    address: DataTypes.STRING(200),
    email: { type: DataTypes.STRING(50), validate: { isEmail: true, notEmpty: true } },
    notes: DataTypes.STRING(300),
    file: DataTypes.STRING(100),
    status: { type: ENUM, values: ['pending', 'rejected', 'approved'], defaultValue: 'pending' }
});

module.exports = ExternalPresription;