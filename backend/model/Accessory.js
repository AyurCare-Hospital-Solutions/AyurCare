const { DataTypes, Model } = require("sequelize");
const { sequelize } = require(".");
const Item = require("./Item");

const Accessory = sequelize.define("Accessories",
    {
        amount: {
            type: DataTypes.INTEGER
        }
    }
);

Accessory.belongsTo(Item, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: { allowNull: false }
});


module.exports = Accessory;