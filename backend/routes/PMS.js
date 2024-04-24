const express = require("express");
const router = express.Router();
const medicine = require("../systems/PMS/medicine");
const prescription = require("../systems/PMS/prescription");
const externalPrescription = require("../systems/PMS/externalPrescription");

// here we have mention if the url (first parameter) call this function that's it.
// those methods are inside the **** systems/pms ****

// ROUTES FOR MEDICINE
router.get("/medicineall", medicine.getPharmacyMedicines);
router.get("/specificmedicine/:id", medicine.getSpecificMedicine);
router.get("/deletemedicine/:id", medicine.deleteMedicine);
router.post("/updatemedicinestock/:id", medicine.changeStockLevel);
router.get("/getInventoryMedicine", medicine.getInventoryMedicine);
router.post("/setPharmacyMadicine", medicine.setPharmacyMadicine);

// ROUTES FOR INTERNAL PRESCRIPTION
router.get("/getAllPrescription", prescription.getPrescriptions);
router.put("/updatePrescription/:id", prescription.updatePrescriptionStatus);

// ROUTES FOR EXTERNAL PRESCRIPTION
router.post(
  "/setExternalPrescription",
  externalPrescription.setExternalPrescription
);
router.get(
  "/getExternalPrescription",
  externalPrescription.getAllUserPrescriptions
);
router.put(
  "/updateExternalPrescriptionStatus/:id",
  externalPrescription.updateExternalPrescriptionStatus
);
router.post("/setUserConcerns", externalPrescription.setUserConcern);
router.get("/getUserConcerns", externalPrescription.getUserConcerns);
router.delete("/deleteConcerns/:id", externalPrescription.deleteConcerns);
router.delete(
  "/deleteExternalPrescription/:id",
  externalPrescription.deleteExternalPrescription
);

// ROUTES FOR GET THE SPECIAL COUNTS FROM THE DATABASE
router.get("/getTotalMedicinesCount", medicine.getTotalMedicinesCount);
router.get(
  "/getTotalPrescriptionsCount",
  prescription.getTotalPrescriptionsCount
);
router.get(
  "/getTotalExternalPrescriptionsCount",
  externalPrescription.getTotalExternalPrescriptionsCount
);

module.exports = router;
