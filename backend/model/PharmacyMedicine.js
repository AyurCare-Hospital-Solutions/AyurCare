const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Medicine = require("./Medicine");

const PharmacyMedicine = sequelize.define("PharmacyMedicine", {
  // column name
  amount: {
    // Have to mention the data type
    type: DataTypes.INTEGER,
  },
  expire_date: {
    type: DataTypes.DATEONLY,
  },
});

//FOREIGN KEY STUFFS
PharmacyMedicine.belongsTo(Medicine, {
  //this one is for if the medicine get deleted on the Medicine table it will be deleted ƒrom Pharmacy Medicince table
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: { allowNull: false },
});

module.exports = PharmacyMedicine;
