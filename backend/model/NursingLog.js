const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const IPDAdmission = require("./IPDAdmission");


const NursingLog = sequelize.define("NursingLogs", {
    note: DataTypes.TEXT,
}, { paranoid: true });

NursingLog.belongsTo(IPDAdmission, {
    foreignKey: {
        allowNull: false,
    },
    onDelete: 'CASCADE'
});

IPDAdmission.hasMany(NursingLog);

// TODO: MedicalStaff

module.exports = NursingLog;
