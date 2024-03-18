const { DataTypes, Model } = require("sequelize");
const { sequelize } = require(".");
const Designation = require("./Designation");
const roles = require("../middleware/auth/roles");
const Shift = require("./Shift");

const Staff = sequelize.define("Staff", {
    name: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    dateHired: {
        type: DataTypes.DATEONLY
    },
    qualification: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING(14)
    },
    homePhone: {
        type: DataTypes.STRING(14)
    },
    type: {
        type: DataTypes.ENUM(Object.keys(roles))
    }
})

Staff.belongsTo(Staff, { foreignKey: { name: "SuperID" }, as: "Supervisor", onDelete: "SET NULL", onUpdate: "CASCADE" })
Staff.hasMany(Staff, { foreignKey: { name: "SuperID" }, as: "Supervisee" });
Staff.belongsTo(Designation);

Staff.belongsToMany(Shift, { through: "StaffShift" })

module.exports = Staff;