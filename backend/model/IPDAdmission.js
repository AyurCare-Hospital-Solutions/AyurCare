const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Patient = require("./Patient");
const Bed = require("./Bed");

const IPDAdmission = sequelize.define("IPDAdmission", {
    discharge_date: DataTypes.DATEONLY
},);


IPDAdmission.belongsTo(Patient, {
    foreignKey: {
        allowNull: false,
    },
    onDelete: 'CASCADE',
});

Patient.hasMany(IPDAdmission);

IPDAdmission.belongsTo(Bed, { onDelete: 'SET NULL' });

module.exports = IPDAdmission;