const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Item = require("./Item");

const Material = sequelize.define("Meterials",
    {
        amount: {
            type: DataTypes.STRING
        }
    }
);

Item.hasOne(Material, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: { allowNull: false }
});
Material.belongsTo(Item);

module.exports = Material;