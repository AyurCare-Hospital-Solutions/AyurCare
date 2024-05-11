const express = require("express");
const router = express.Router();
const medi = require("../systems/DMMS/med");
const dmmsAnalyse = require("../systems/DMMS/dmmsAnalyse");
// const medimeti = require("../systems/DMMS/medimeti");

router.get("/request", medi.getRequests);
router.post("/request/createReq", medi.createRequest);
router.put('/request/:id', medi.updateRequest);
router.delete("/request/:id", medi.deleteRequest);

router.get("/analyse/manufactureRequestData", dmmsAnalyse.manufactureRequestData);

// router.get("/recipe", medimeti.getRequests);
// router.post("/recipe/createRep", medimeti.createRequest);
// router.delete("/recipe/:id", medimeti.deleteRequest);




// Register routes here

module.exports = router;