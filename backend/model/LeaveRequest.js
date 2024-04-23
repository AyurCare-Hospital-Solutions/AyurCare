const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Staff = require("./Staff");
const LeaveType = require("./LeaveType");

const LeaveRequest = sequelize.define("LeaveRequests", {
    reason: {
        type: DataTypes.STRING
    },
    start_date: {
        type: DataTypes.DATEONLY
    },
    end_date: {
        type: DataTypes.DATEONLY
    },
    registration: {
        type: DataTypes.STRING,
        defaultValue: "pending",
        validate: {
            isIn: [["Full Day", "Part Day", "Multiple Day"]]
        }
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
  reason: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.DATEONLY,
  },
  registration: {
    type: DataTypes.STRING,
    defaultValue: "Full Day",
    validate: {
      isIn: [["Full Day", "Part Day", "Multiple Day"]],
    },
  },
  hours: {
    type: DataTypes.REAL, // possible to add decimals
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "Pending",
    validate: {
      isIn: [["Approved", "Pending", "Rejected"]],
    },
  },
});

LeaveRequest.belongsTo(Staff);
Staff.hasMany(LeaveRequest);
LeaveRequest.belongsTo(LeaveType);

module.exports = LeaveRequest;
