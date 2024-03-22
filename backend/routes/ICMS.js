const express = require("express");
const router = express.Router();

const wardService = require("../systems/ICMS/wards");

router.post("/ward", wardService.createWard);
router.get("/ward", wardService.getWards);
router.put("/ward/:id", wardService.renameWard);
router.delete("/ward/:id", wardService.deleteWard);

module.exports = router;