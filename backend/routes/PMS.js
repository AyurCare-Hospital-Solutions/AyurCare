const express = require("express");
const router = express.Router();
const medicine = require("../systems/PMS/medicine")
const prescription = require("../systems/PMS/prescription")

router.get("/medicine", medicine.getMedicines)
router.get("/prescriptionDetails", prescription.getPrescriptions);

router.get("/medicineall", medicine.getPharmacyMedicines);
router.get("/specificmedicine/:id", medicine.getSpecificMedicine);
router.get("/deletemedicine/:id", medicine.deleteMedicine);
router.post("/updatemedicinestock/:id", medicine.changeStockLevel);
router.get("/getInventoryMedicine", medicine.getInventoryMedicine);
router.post("/setPharmacyMadicine", medicine.setPharmacyMadicine);



router.get("/getAllPrescription", prescription.getPrescriptions);
router.get("/updatePrescription/:id", prescription.updatePrescription);


module.exports = router;
