const express = require("express");
const router = express.Router();
const medicine = require("../systems/PMS/medicine")
const prescription = require("../systems/PMS/prescription")

router.get("/medicine", medicine.getMedicines)
router.get("/prescriptionDetails", prescription.getPrescriptions);

module.exports = router;