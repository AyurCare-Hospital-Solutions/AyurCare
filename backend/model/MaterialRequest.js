const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Material = require("./Material");

const MaterialRequest = sequelize.define("MaterialRequest", {
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

MaterialRequest.belongsTo(Material);

module.exports = MaterialRequest;