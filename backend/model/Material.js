const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Item = require("./Item");

const Material = sequelize.define("Material",
    {
        amount: {
            type: DataTypes.STRING
        }
    }
);

Material.belongsTo(Item, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: { allowNull: false }
});

module.exports = Material;