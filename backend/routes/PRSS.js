const express = require("express");
const router = express.Router();

// import the patient function to the router
const Patient = require("../systems/PRSS/patientReg");

// Register routes here
router.get("/test-patient", Patient.test);
router.post("/create-patient", Patient.createNewPatient);

module.exports = router;