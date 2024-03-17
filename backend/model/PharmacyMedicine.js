const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Medicine = require("./Medicine");

const PharmacyMedicine = sequelize.define("PharmacyMedicine", {
    amount: {
        type: DataTypes.INTEGER,
    },
    expire_date: {
        type: DataTypes.DATEONLY
    }
}
)

PharmacyMedicine.belongsTo(Medicine, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: { allowNull: false }
});

module.exports = PharmacyMedicine;