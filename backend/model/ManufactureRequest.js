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
            isIn: [["Completed", "Pending", "Rejected", "In Progress", "Manufacture Error"]]
        }
    }
});

ManufactureRequest.belongsTo(Medicine);
module.exports = ManufactureRequest;