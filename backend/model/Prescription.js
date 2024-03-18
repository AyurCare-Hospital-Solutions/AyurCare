const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const ConditionType = require("./ConditionType");
const Medicine = require("./Medicine");

const Prescription = sequelize.define("Prescriptions", {
    diagnosis: DataTypes.STRING,
    note: DataTypes.STRING,
    dispensed_date: DataTypes.DATE
}, { paranoid: true });

const PrescriptionConditions = sequelize.define('PrescriptionConditions', {}, { timestamps: false });

const PrescriptionMedicine = sequelize.define("PrescriptionMedicines", {
    amount: {
        type: DataTypes.INTEGER,
        validate: {
            min: 0,
            max: 1000,
        }
    },
});


Prescription.belongsToMany(ConditionType, { through: PrescriptionConditions });
Prescription.belongsToMany(Medicine, { through: PrescriptionMedicine });

// TODO: doctor
// TODO: pharmacist

module.exports = Prescription;