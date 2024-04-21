const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Medicine = require("./Medicine");
const Material = require("./Material");

const MedicineMaterial = sequelize.define("MedicineMaterial", {}, { timestamps: false });

MedicineMaterial.belongsTo(Medicine,
    {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: { allowNull: false, }
    },
);

MedicineMaterial.belongsToMany(Material, { through: "MedicineMaterialMaterials", timestamps: false });


module.exports = MedicineMaterial;
