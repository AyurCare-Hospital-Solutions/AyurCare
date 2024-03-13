const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Prescription = require("./Prescription");
const Medicine = require("./Medicine");

const PrescriptionMedicine = sequelize.define("PrescriptionMedicines", {
    amount: {
        type: DataTypes.NUMBER,
        validate: {
            min: 0,
            max: 1000,
        }
    },
}, { timestamps: false });


PrescriptionMedicine.belongsTo(Prescription);
Prescription.hasMany(PrescriptionMedicine);

Medicine.hasOne(PrescriptionMedicine, { onDelete: "CASCADE", foreignKey: { allowNull: false } });


module.exports = PrescriptionMedicine;