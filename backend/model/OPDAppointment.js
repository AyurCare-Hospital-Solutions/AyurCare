const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Patient = require("./Patient");
const Prescription = require("./Prescription");

const OPDAppointment = sequelize.define("OPDAppointment", {
    status: DataTypes.STRING, // TODO: Check
});

Patient.hasMany(OPDAppointment, { onDelete: 'CASCADE', foreignKey: { allowNull: false } });
OPDAppointment.belongsTo(Patient);

Prescription.belongsTo(OPDAppointment, { onDelete: 'CASCADE', foreignKey: { allowNull: false } });
OPDAppointment.belongsTo(Prescription);

module.exports = OPDAppointment;