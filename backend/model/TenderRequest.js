const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Item = require("./Item");

const TenderRequest = sequelize.define("Tender_Requests",
    {
        reqID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        amount: {
            type: DataTypes.INTEGER,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue : "Pending",
            validate: {
                isIn: [["Succcess", "Pending", "Reject"]]
            }
        }
    }
);

Item.hasMany(TenderRequest, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: { allowNull: false }
});
TenderRequest.belongsTo(Item);

module.exports = TenderRequest;