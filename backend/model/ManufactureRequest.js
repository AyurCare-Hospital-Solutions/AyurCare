const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Medicine = require("./Medicine");

const ManufactureRequest = sequelize.define("ManufactureRequest", {
    amount: {
        type: DataTypes.INTEGER,
    },
    isPriority: {
        type: DataTypes.BOOLEAN
    },
    mfDate: {
        type: DataTypes.DATEONLY
    },
    progress: {
        type: DataTypes.STRING,
        defaultValue: "Pending",
        validate: {
            isIn: [["Success", "Pending", "Reject"]]
        }
    }
});

ManufactureRequest.belongsTo(Medicine);

module.exports = ManufactureRequest;