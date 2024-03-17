const express = require("express");
const router = express.Router();

const materialService = require('../systems/IMS/material');
const medicineService = require('../systems/IMS/medicine');

// Material
router.get('/material', materialService.getMaterial);
router.post('/material/addMaterial', materialService.addMaterial);
router.put('/material/updateMaterial/:id', materialService.updateMaterial);
router.post('/material/deleteMaterial', materialService.deleteMaterial);


// Medicine 
router.get('/medicine',medicineService.getMedicine);
router.post('/medicine/addMedicine', medicineService.addMedicine);
router.put('/medicine/updateMedicine/:id', medicineService.updateMedicine);
router.post('/medicine/deleteMedicine', medicineService.deleteMedicine);



// Accessories

// Request

module.exports = router;