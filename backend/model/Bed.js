const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Ward = require("./Ward");

const Bed = sequelize.define("Bed", {
    number: DataTypes.INTEGER,
    occupied: { type: DataTypes.BOOLEAN, defaultValue: false }
},
    {
        timestamps: false, indexes: [
            {
                unique: true,
                fields: ["number", "WardId"]
            }
        ]
    });

Bed.belongsTo(Ward, { onDelete: 'CASCADE' });
Ward.hasMany(Bed);

module.exports = Bed;