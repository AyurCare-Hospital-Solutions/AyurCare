const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const ConditionType = require("./ConditionType");
const Medicine = require("./Medicine");
const Staff = require("./Staff");
const Patient = require("./Patient");

const Prescription = sequelize.define(
  "Prescriptions",
  {
    diagnosis: DataTypes.STRING,
    note: DataTypes.STRING,
    dispensed_date: DataTypes.DATE,
    status: {
        type: DataTypes.ENUM,
        values: ["pending", "approved", "rejected"]
    }
}, { paranoid: true });

const PrescriptionConditions = sequelize.define(
  "PrescriptionConditions",
  {},
  { timestamps: false }
);

const PrescriptionMedicine = sequelize.define("PrescriptionMedicines", {
  amount: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 1000,
    },
  },
});


Prescription.belongsToMany(ConditionType, { through: PrescriptionConditions });
Prescription.belongsToMany(Medicine, { through: PrescriptionMedicine });
Prescription.belongsTo(Staff, { as: "DispensedBy" });
Prescription.belongsTo(Staff, { as: "Doctor" });
Prescription.belongsTo(Patient);

module.exports = Prescription;
