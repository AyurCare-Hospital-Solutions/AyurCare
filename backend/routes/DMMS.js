const express = require("express");
const router = express.Router();
const medi = require("../systems/DMMS/med");

router.get("/request",medi.getRequests);
router.post("/request",medi.createRequest);
router.delete("/request/:id",medi.deleteRequest);

// Register routes here

module.exports = router;