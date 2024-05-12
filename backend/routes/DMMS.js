const express = require("express");
const router = express.Router();
const medi = require("../systems/DMMS/med");
const dmmsAnalyse = require("../systems/DMMS/dmmsAnalyse");
const Medimeti = require("../systems/DMMS/medimeti")

router.get("/request", medi.getRequests);
router.post("/request/createReq", medi.createRequest);
router.put('/request/:id', medi.updateRequest);
router.delete("/request/:id", medi.deleteRequest);

router.get("/analyse/manufactureRequestData", dmmsAnalyse.manufactureRequestData);

router.get("/recipe", Medimeti.getMedicineMaterials);
router.post("/recipe/createRep", Medimeti.createMedicineMaterials);
router.delete("/recipe/:id", Medimeti.deleteMedicineMaterials);




// Register routes here

module.exports = router;