const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Patient = require("./Patient");

const IPDWaitList = sequelize.define("ipd_wait_list", {
    is_priority: DataTypes.BOOLEAN,
    reason: DataTypes.STRING
});

IPDWaitList.belongsTo(Patient, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Patient.hasOne(IPDWaitList,);

module.exports = IPDWaitList;