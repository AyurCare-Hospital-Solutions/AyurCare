const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const ConditionType = require("./ConditionType");

const Prescription = sequelize.define("Prescriptions", {
    diagnosis: DataTypes.STRING,
    note: DataTypes.STRING,
    dispensed_date: DataTypes.DATE
}, { paranoid: true });

const PrescriptionConditions = sequelize.define('PrescriptionConditions', {
    PrescriptionId: {
        type: DataTypes.INTEGER,
        references: {
            model: Prescription,
            key: 'id'
        }
    },
    ConditionTypeId: {
        type: DataTypes.INTEGER,
        references: {
            model: ConditionType,
            key: 'id'
        }
    }
}, { timestamps: false });


Prescription.belongsToMany(ConditionType, { through: PrescriptionConditions });
ConditionType.belongsToMany(Prescription, { through: PrescriptionConditions });

// TODO: doctor
// TODO: pharmacist

module.exports = Prescription;