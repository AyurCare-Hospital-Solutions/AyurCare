const express = require("express");
const router = express.Router();
const medi = require("../systems/DMMS/med");
const dmmsAnalyse = require("../systems/DMMS/dmmsAnalyse");

router.get("/request", medi.getRequests);
router.post("/request/createReq", medi.createRequest);
router.put('/request/:id', medi.updateRequest);
router.delete("/request/:id", medi.deleteRequest);

router.get("/analyse/manufactureRequestData", dmmsAnalyse.manufactureRequestData);



// Register routes here

module.exports = router;
