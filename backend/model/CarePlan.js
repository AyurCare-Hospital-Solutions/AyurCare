const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const IPDAdmission = require("./IPDAdmission");

const CarePlan = sequelize.define("CarePlan", {
    condition: DataTypes.TEXT,
    diagnosis: DataTypes.TEXT,
    treatmentPlan: DataTypes.TEXT,
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