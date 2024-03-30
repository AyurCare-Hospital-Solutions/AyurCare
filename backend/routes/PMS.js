const express = require("express");
const router = express.Router();
const medicine = require("../systems/PMS/medicine")
const prescription = require("../systems/PMS/prescription")

router.get("/medicineall", medicine.getMedicines)
router.get("/prescriptionDetails", prescription.getPrescriptions);
router.get("/specificmedicine/:id", medicine.getSpecificMedicine);
router.get("/deletemedicine/:id", medicine.deleteMedicine);
router.post("/updatemedicinestock/:id", medicine.changeStockLevel);

module.exports = router;