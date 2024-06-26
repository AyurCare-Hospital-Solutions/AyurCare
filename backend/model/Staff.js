const { DataTypes, Model } = require("sequelize");
const { sequelize } = require(".");
const Designation = require("./Designation");
const { roles } = require("../middleware/auth");
const Shift = require("./Shift");
const { sync } = require("glob");

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
    designation: {
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
    stfType: {
        // TODO: fix data type in db
        type: DataTypes.ENUM(Object.keys(roles))
    },
    password: {
        type: DataTypes.STRING
    }
})

Staff.belongsTo(Staff, { foreignKey: { name: "SuperID" }, as: "Supervisor", onDelete: "SET NULL", onUpdate: "CASCADE" })
Staff.hasMany(Staff, { foreignKey: { name: "SuperID" }, as: "Supervisee" });
Staff.belongsTo(Designation);

Staff.belongsToMany(Shift, { through: "StaffShift" })
Shift.belongsToMany(Staff, { through: "StaffShift" })

module.exports = Staff;