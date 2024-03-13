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

Item.hasOne(Accessory, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Accessory.belongsTo(Item);

module.exports = Accessory;