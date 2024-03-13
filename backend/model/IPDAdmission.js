const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Patient = require("./Patient");
const Bed = require("./Bed");

const IPDAdmission = sequelize.define("IPDAdmission", {

},);


IPDAdmission.belongsTo(Patient, {
    foreignKey: {
        allowNull: false,
    },
    onDelete: 'CASCADE',
});

Patient.hasMany(IPDAdmission);

IPDAdmission.belongsTo(Bed, { foreignKey: { allowNull: false }, onDelete: 'RESTRICT' });
Bed.hasOne(IPDAdmission,);

module.exports = IPDAdmission;