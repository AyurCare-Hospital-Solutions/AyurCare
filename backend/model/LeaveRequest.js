const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Staff = require("./Staff");

const LeaveRequest = sequelize.define("LeaveRequests", {
    type: {
        type: DataTypes.STRING
    },
    reason: {
        type: DataTypes.STRING
    },
    date: {
        type: DataTypes.DATEONLY
    },
    registration: {
        type: DataTypes.STRING // TODO: check value type
    },
    hours: {
        type: DataTypes.REAL // possible to add decimals
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
        validate: {
            isIn: [["Approved", "Pending", "Rejected"]]
        }
    }
});

LeaveRequest.belongsTo(Staff);
Staff.hasMany(LeaveRequest);

module.exports = LeaveRequest;