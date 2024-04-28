const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Ward = require("./Ward");

const Bed = sequelize.define("Bed", {
    number: DataTypes.INTEGER
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