const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Medicine = require("./Medicine");

const MedicineLot = sequelize.define("MedicineLot", {
    manufacturer: {
        type: DataTypes.STRING
    },
    amount: {
        type: DataTypes.INTEGER
    },
    expire_date: {
        type: DataTypes.DATEONLY
    }
}
);

MedicineLot.belongsTo(Medicine, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: { allowNull: false }
});
Medicine.hasMany(MedicineLot);


module.exports = MedicineLot;