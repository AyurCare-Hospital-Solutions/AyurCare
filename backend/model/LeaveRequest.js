const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

const LeaveRequest = sequelize.define("LeaveRequests",
    {
        leaveID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: DataTypes.STRING
        },
        reason: {
            type: DataTypes.STRING
        },
        date: {
            type: DataTypes.DATEONLY
        },
        registration: {  // ??? IDK what is this ???
            type: DataTypes.STRING
        },
        houres: {
            type: DataTypes.REAL // possible to add decimals
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: "pending",
            validate: {
                isIn: [["Approved", "Pending", "Rejected"]]
            }
        }

        // TODO ===>>> need to add user ID
    });

module.exports = LeaveRequest;