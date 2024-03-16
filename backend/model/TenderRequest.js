const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Item = require("./Item");

const TenderRequest = sequelize.define("TenderRequest", {
    amount: {
        type: DataTypes.INTEGER,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "Pending",
        validate: {
            isIn: [["Success", "Pending", "Reject"]]
        }
    }
}
);

TenderRequest.belongsTo(Item, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: { allowNull: false }
});

module.exports = TenderRequest;