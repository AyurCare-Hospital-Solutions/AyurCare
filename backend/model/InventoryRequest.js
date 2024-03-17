const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Item = require("./Item");
const Staff = require("./Staff");

const InventoryRequest = sequelize.define("InventoryRequests", {
    amount: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "Pending",
        validate: {
            isIn: [["Success", "Pending", "Reject"]]
        }
    },

});

InventoryRequest.belongsTo(Staff);
Staff.hasMany(InventoryRequest);

Item.hasMany(InventoryRequest);
InventoryRequest.belongsTo(Item);

module.exports = InventoryRequest;