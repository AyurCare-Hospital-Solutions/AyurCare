const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Item = require("./Item");
const Material = require("./Material");

const Medicine = sequelize.define("Medicine", {
    inHouse: {
        type: DataTypes.BOOLEAN
    }
}
);

Medicine.belongsTo(Item, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: { allowNull: false }
});

const MedicineMaterial = sequelize.define("MedicineMaterial", { amount: DataTypes.INTEGER }, { timestamps: false });

Medicine.belongsToMany(Material, { through: MedicineMaterial });

module.exports = Medicine;