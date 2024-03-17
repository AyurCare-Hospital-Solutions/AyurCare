const express = require("express");
const router = express.Router();
const materialService = require('../systems/IMS/material');

// Register routes here

router.get('/material', materialService.getMaterial);
router.post('/material/addMaterial', materialService.addMaterial);
router.put('/material/updateMaterial/:id', materialService.updateMaterial);
router.post('/material/deleteMaterial', materialService.deleteMaterial);

module.exports = router;