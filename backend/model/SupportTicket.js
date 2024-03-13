const { DataTypes, Model } = require("sequelize");
const { sequelize } = require(".");

const SupportTicket = sequelize.define("SupportTickets",
    {
        msgID:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        content : {
            type: DataTypes.STRING
        },
        status :{
            type : DataTypes.STRING
        },
        timeStamp :{
            type: DataTypes.DATETIME,
            defaultValue: DataTypes.NOW
        },
        type:{
            type: DataTypes.STRING
        },

        // TODO ===>>> need to include senderID and  receiveID
    }
);


module.exports = SupportTicket;