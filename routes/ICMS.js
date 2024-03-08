const express = require("express");
const router = express.Router();

const wardService = require("../systems/ICMS/wards");

router.post("/ward", wardService.create);
router.get("/ward", wardService.get);
router.patch("/ward/:id", wardService.renameWard);
router.delete("/ward/:id", wardService.delete);

module.exports = router;