const { DataTypes, Model } = require("sequelize");
const { sequelize } = require(".");
const Staff = require("./Staff");

const SupportTicket = sequelize.define("SupportTickets", {
    content: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING
    },
    timeStamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    type: {
        type: DataTypes.STRING
    },
});

SupportTicket.belongsTo(Staff, { as: "sender", onDelete: "CASCADE", onUpdate: "CASCADE" })
Staff.hasMany(SupportTicket, { as: "SupportTickets" })
SupportTicket.belongsTo(Staff, { as: "receiver", onDelete: "CASCADE", onUpdate: "CASCADE" })


module.exports = SupportTicket;