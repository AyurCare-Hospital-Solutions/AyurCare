const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Ward = require("./Ward");

const Bed = sequelize.define("Beds", {}, { timestamps: false });

Bed.belongsTo(Ward, { onDelete: 'CASCADE' });
Ward.hasMany(Bed);

module.exports = Bed;