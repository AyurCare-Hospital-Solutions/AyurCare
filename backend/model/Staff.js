const { DataTypes, Model } = require("sequelize");
const { sequelize } = require(".");

const Staff = sequelize.define("Staff",
    {
        staffID : {
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        name : {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        dateHired: {
            type: DataTypes.DATEONLY
        },
        qualification: {
            type: DataTypes.STRING
        },
        email:{
            type : DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING(14)
        },
        homePhone: {
            type: DataTypes.STRING(14)
        }

        // TODO === >>>
        // need to add supervices
        // neet to add desID
    }
)