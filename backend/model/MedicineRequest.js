const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Medicine = require("./Medicine");

const MedicineRequest = sequelize.define("MedicineRequest", {
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

MedicineRequest.belongsTo(Medicine);

module.exports = MedicineRequest;