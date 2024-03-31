const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const IPDAdmission = require("./IPDAdmission");
const Staff = require("./Staff")

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
NursingLog.belongsTo(Staff);

module.exports = NursingLog;
