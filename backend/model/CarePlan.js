const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const IPDAdmission = require("./IPDAdmission");

const CarePlan = sequelize.define("CarePlan", {
    condition: DataTypes.TEXT(500),
    diagnosis: DataTypes.TEXT(500),
    treatmentPlan: DataTypes.TEXT(1000),
}, { paranoid: true });

CarePlan.belongsTo(IPDAdmission, {
    foreignKey: {
        allowNull: false,
    },
    onDelete: 'CASCADE'
});
IPDAdmission.hasMany(CarePlan);

// TODO: Doctor

module.exports = CarePlan;