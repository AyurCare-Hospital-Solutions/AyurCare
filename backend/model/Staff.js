const { DataTypes, Model } = require("sequelize");
const { sequelize } = require(".");
const Designation = require("./Designation");

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
    }

    // TODO: need to add desID
}
)

Staff.belongsTo(Staff, { foreignKey: { name: "SuperID" }, as: "Supervisor", onDelete: "SET NULL", onUpdate: "CASCADE" })
Staff.hasMany(Staff, { foreignKey: { name: "SuperID" }, as: "Supervisee" });
Staff.belongsTo(Designation);

module.exports = Staff;