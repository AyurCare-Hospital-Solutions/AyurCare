const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Patient = require("./Patient");
const Bed = require("./Bed");

const IPDAdmission = sequelize.define("IPD_admission", {

});

IPDAdmission.belongsTo(Patient);
Patient.hasMany(IPDAdmission);

IPDAdmission.belongsTo(Bed);
Bed.hasOne(IPDAdmission);

module.exports = IPDAdmission;