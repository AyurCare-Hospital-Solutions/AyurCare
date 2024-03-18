const express = require("express");
const router = express.Router();

const accessoryService = require('../systems/IMS/accessory');
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
router.get('/accessory',accessoryService.getAccessory);
router.post('/accessory/addAccessory',accessoryService.addAccessory);
router.put('/accessory/updateAccessory/:id',accessoryService.updateAccessory);
router.post('/accessory/deleteAccessory',accessoryService.deleteAccessory);

// Request



module.exports = router;