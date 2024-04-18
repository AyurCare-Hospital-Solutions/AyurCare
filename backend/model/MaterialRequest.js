const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Material = require("./Material");
const Item = require("./Item");

const MaterialRequest = sequelize.define("MaterialRequest", {
    amount: {
        type: DataTypes.INTEGER,
    },
    reqId : {
        type: DataTypes.INTEGER
    }
});

MaterialRequest.belongsTo(Item);

module.exports = MaterialRequest;