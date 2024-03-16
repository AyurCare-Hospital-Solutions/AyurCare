const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Prescription = require("./Prescription");
const { number } = require("yup");

const PrescriptionMedicine = sequelize.define("PrescriptionMedicines", {
    amount: {
        type: DataTypes.INTEGER,
        validate: {
            min: 0,
            max: 1000,
        }
    },
}, { timestamps: false });



PrescriptionMedicine.belongsTo(Prescription);
Prescription.hasMany(PrescriptionMedicine);

// TODO: medicine

module.exports = PrescriptionMedicine;