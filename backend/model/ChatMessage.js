const { DataTypes, Model } = require("sequelize");
const { sequelize } = require(".");
const Staff = require("./Staff");

const ChatMessage = sequelize.define("ChatMessage", {
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

ChatMessage.belongsTo(Staff, { as: "sender", onDelete: "CASCADE", onUpdate: "CASCADE" })
Staff.hasMany(ChatMessage, { as: "ChatMessages" })
ChatMessage.belongsTo(Staff, { as: "receiver", onDelete: "CASCADE", onUpdate: "CASCADE" })


module.exports = ChatMessage;