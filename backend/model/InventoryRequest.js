const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Item = require("./Item");

const InventoryRequest = sequelize.define("InventoryRequests",
    {
        reqID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        amount: {
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: "Pending",
            validate: {
                isIn: [["Succcess", "Pending", "Reject"]]
            }
        },

        // TODO ==>>> add user ID
    })