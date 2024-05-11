const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

const UserConcern = sequelize.define("UserConcern", {
  email: {
    type: DataTypes.STRING(70),
  },
  concern: {
    type: DataTypes.STRING(300),
  },
});

module.exports = UserConcern;
