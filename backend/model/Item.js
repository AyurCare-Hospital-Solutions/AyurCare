const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

const Item = sequelize.define("Items", {
    name: {
        type: DataTypes.STRING
    },
    reOrderBuffer: {
        type: DataTypes.INTEGER
    },
    unit: DataTypes.STRING
});

module.exports = Item;