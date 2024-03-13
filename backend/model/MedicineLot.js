const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Medicine = require("./Medicine");

const MedicineLot = sequelize.define("MedicineLot",
    {
        lotID: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        manufacturer: {
            type: DataTypes.STRING
        },
        amount: {
            type: DataTypes.INTEGER
        },
        expire_date: {
            type: DataTypes.DATEONLY
        }
    }
);

Medicine.hasOne(MedicineLot, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: { allowNull: false }
});
Medicine.belongsTo(Medicine);

module.exports = Medicine;