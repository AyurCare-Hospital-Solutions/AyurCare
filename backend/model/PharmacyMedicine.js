const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Medicine = require("./Medicine");

const PharmacyMedicine = sequelize.define("PharmacyMedicine",
    {
        itemID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        amount: {
            type: DataTypes.INTEGER,
        },
        expire_date: {
            type: DataTypes.DATEONLY
        }
    }
)

PharmacyMedicine.hasOne(Medicine, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: { allowNull: false }
});
PharmacyMedicine.belongsTo(Medicine);

module.exports = PharmacyMedicine;