const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

const Item = sequelize.define("Items",
    {
        itemID: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    },
    {
        name :{
            type: DataTypes.STRING
        }
    },
    {
        reOrderbuffer : {
            type : DataTypes.INTEGER
        }
    },
    {
        unit : DataTypes.STRING
    },
);

module.exports  = Item;