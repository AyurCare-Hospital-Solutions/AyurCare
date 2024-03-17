const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Item = require("./Item");

const Medicine = sequelize.define("Medicine", {
    inHouse: {
        type: DataTypes.BOOLEAN
    }
}
);

Medicine.belongsTo(Item, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: { allowNull: false }
});

module.exports = Medicine;