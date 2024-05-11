const express = require("express");
const router = express.Router();
const medicine = require("../systems/PMS/medicine");
const internalPrescription = require("../systems/PMS/internalPrescription");
const externalPrescription = require("../systems/PMS/externalPrescription");
const multer = require("multer");
const upload = multer({ dest: "./uploads/prescriptions" });

// here we have mention if the url (first parameter) call this function that's it.
// those methods are inside the **** systems/pms ****

// ROUTES FOR MEDICINE
router.get("/medicineall", medicine.getPharmacyMedicines);
router.get("/specificmedicine/:id", medicine.getSpecificMedicine);
router.get("/deletemedicine/:id", medicine.deleteMedicine);
router.post("/updatemedicinestock/:id", medicine.changeStockLevel);
router.get("/getInventoryMedicine", medicine.getInventoryMedicine);
router.post("/setPharmacyMedicine", medicine.setPharmacyMedicine);

// ROUTES FOR INTERNAL PRESCRIPTION
router.get("/getAllPrescription", internalPrescription.getPrescriptions);
router.put(
  "/updatePrescription/:id",
  internalPrescription.updatePrescriptionStatus
);

// ROUTES FOR EXTERNAL PRESCRIPTION
router.post(
  "/setExternalPrescription",
  upload.single("file"),
  externalPrescription.setExternalPrescription
);

router.put(
  "/updateExternalPrescriptionStatus/:id",
  externalPrescription.updateExternalPrescriptionStatus
);
router.get(
  "/getExternalPrescriptionImage/:filename",
  externalPrescription.getExternalPrescriptionImage
);
router.get(
  "/getAllUserPrescriptions",
  externalPrescription.getAllUserPrescriptions
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
  "/getTotalExternalPrescriptionsCount",
  externalPrescription.getTotalExternalPrescriptionsCount
);

// ROUTES FOR FETCHING THE DATA FOR THE REPORT
// 1. Medicine -------------------------------------------------------------------------------
router.get("/getZeroMedicineCount", medicine.getZeroMedicineCount);
router.get("/getMedicineStockLessThan10", medicine.getMedicineStockLessThan10);

// 2. internal prescription ------------------------------------------------------------------
router.get(
  "/getTotalPrescriptionsCount",
  internalPrescription.getTotalPrescriptionsCount
);

router.get(
  "/getApprovedPrescriptionsCount",
  internalPrescription.getApprovedPrescriptionsCount
);

router.get(
  "/getRejectedPrescriptionsCount",
  internalPrescription.getRejectedPrescriptionsCount
);

router.get(
  "/getPendingPrescriptionsCount",
  internalPrescription.getPendingPrescriptionsCount
);

// 3. external prescription ------------------------------------------------------------------
router.get(
  "/getTotalExternalPrescriptionsCount",
  externalPrescription.getTotalPrescriptionsCount
);

router.get(
  "/getApprovedExternalPrescriptionsCount",
  externalPrescription.getApprovedPrescriptionsCount
);

router.get(
  "/getRejectedExternalPrescriptionsCount",
  externalPrescription.getRejectedPrescriptionsCount
);

router.get(
  "/getPendingExternalPrescriptionsCount",
  externalPrescription.getPendingPrescriptionsCount
);

// 4. user concerns ------------------------------------------------------------------
router.get("/getTotalUserConcerns", externalPrescription.getTotalUserConcerns);
module.exports = router;
