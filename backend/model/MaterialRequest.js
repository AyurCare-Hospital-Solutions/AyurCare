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
            isIn: [["Accepted", "Pending", "Rejected"]]
        }
    },

});

MaterialRequest.belongsTo(Material);

module.exports = MaterialRequest;