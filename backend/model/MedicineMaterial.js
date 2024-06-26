const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Medicine = require("./Medicine");
const Material = require("./Material");

const MedicineMaterial = sequelize.define("MedicineMaterial", {
    amount: DataTypes.INTEGER
}, { timestamps: false });

MedicineMaterial.belongsTo(Medicine, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: { allowNull: false, }
});

MedicineMaterial.belongsTo(Material, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: { allowNull: false, }
})

module.exports = MedicineMaterial;
