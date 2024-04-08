const express = require("express");
const router = express.Router();

const accessoryService = require('../systems/IMS/accessory');
const materialService = require('../systems/IMS/material');
const medicineService = require('../systems/IMS/medicine');
const medicineLotService = require('../systems/IMS/medicineLot');
const materialRequestService = require('../systems/IMS/materialRequest');
const medicineRequestService = require('../systems/IMS/medicineRequest');

// Material
router.get('/material', materialService.getMaterial);
router.post('/material/addMaterial', materialService.addMaterial);
router.put('/material/updateMaterial/:id', materialService.updateMaterial);
router.post('/material/deleteMaterial', materialService.deleteMaterial);


// Medicine 
router.get('/medicine', medicineService.getMedicine);
router.post('/medicine/addMedicine', medicineService.addMedicine);
router.put('/medicine/updateMedicine/:id', medicineService.updateMedicine);
router.post('/medicine/deleteMedicine', medicineService.deleteMedicine);

// Medicine Lot
router.get('/medicineLot/:medId', medicineLotService.getMedicineLot);
router.post('/medicineLot/addMedicineLot', medicineLotService.addMedicineLot);
router.put('/medicineLot/updateMedicineLot/:id', medicineLotService.updateMedicineLot);
router.post('/medicineLot/deleteMedicineLot', medicineLotService.deleteMedicineLot);

// Accessories
router.get('/accessory', accessoryService.getAccessory);
router.post('/accessory/addAccessory', accessoryService.addAccessory);
router.put('/accessory/updateAccessory/:id', accessoryService.updateAccessory);
router.post('/accessory/deleteAccessory', accessoryService.deleteAccessory);

// Medicine Request
router.get('/medicineRequest', medicineRequestService.getMedicineRequests);
router.post('/medicineRequest/addMedicineRequest', medicineRequestService.addMeicicneRequest);
router.put('/medicineRequest/:id', medicineRequestService.updateMedicineRequest);
router.delete('/medicineRequest/:id', medicineRequestService.deleteMedicneRequest);

// Material Request
router.get('/materialRequest', materialRequestService.getMaterialRequests);
router.post('/materialRequest/addMaterialRequest', materialRequestService.addMaterialRequest);
router.put('/materialRequest/:id',materialRequestService.updateMaterialRequest);
router.delete('/materialRequest/:id',materialRequestService.deleteMaterialRequest);


module.exports = router;