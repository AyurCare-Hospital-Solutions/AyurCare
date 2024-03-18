const express = require("express");
const router = express.Router();
const accessoryService = require('../systems/IMS/accessory')

// Register routes here

router.get('/accessory',accessoryService.getAccessory);
router.post('/accessory/addAccessory',accessoryService.addAccessory);
router.put('/accessory/updateAccessory/:id',accessoryService.updateAccessory);
router.post('/accessory/deleteAccessory',accessoryService.deleteAccessory);

module.exports = router;