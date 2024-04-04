const express = require("express");
const router = express.Router();

const multer = require("multer");
const { uploadPrescription } = require("../systems/PMS/prescription");
const upload = multer({ dest: "./uploads/prescriptions" });

router.post(
    "/uploadPrescription",
    upload.single("prescription"),
    uploadPrescription
);

module.exports = router;