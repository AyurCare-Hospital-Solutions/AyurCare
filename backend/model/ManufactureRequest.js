const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Medicine = require("./Medicine");

const ManufactureRequest = sequelize.define("Manufacture_Request",
    {
        reqID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        amount: {
            type: DataTypes.INTEGER,
        },
        isPriority: {
            type: DataTypes.BOOLEAN
        },
        req_date: {
            type: DataTypes.DATEONLY
        },
        mf_date: {
            type: DataTypes.DATEONLY
        },
        progress: {
            type: DataTypes.STRING,
            defaultValue: "Pending",
            validate: {
                isIn: [["Succcess", "Pending", "Reject"]]
            }
        }
    });