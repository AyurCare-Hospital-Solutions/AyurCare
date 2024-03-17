const express = require("express");
const router = express.Router();
const medicineService = require('../systems/IMS/medicine')

// Register routes here

// Medicine 
router.get('/medicine',medicineService.getMedicine);
router.post('/medicine/addMedicine', medicineService.addMedicine);
router.put('/medicine/updateMedicine/:id', medicineService.updateMedicine);
router.post('/medicine/deleteMedicine', medicineService.deleteMedicine);

// Material

// Accessories

// Request

module.exports = router;