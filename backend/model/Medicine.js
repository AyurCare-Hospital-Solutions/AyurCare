const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Item = require("./Item");

const Medicine = sequelize.define("Medicine",
    {
        inHouse : {
            type: DataTypes.BOOLEAN
        }
    }
);

Item.hasOne(Medicine, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: { allowNull: false }
});
Medicine.belongsTo(Item);

module.exports = Medicine;