const express = require("express");
const router = express.Router();

// import the patient function to the router
const Patient = require("../systems/PRSS/patientReg");

// Register routes here
router.get("/test-patient", Patient.test);
router.post("/create-patient", Patient.createNewPatient);
router.get("/get-patients", Patient.getPatients);
router.get("/get-patient/:id", Patient.getPatientDetails);
router.put("/update-patient/:id", Patient.updatePatientDetails);
router.delete("/delete-patient/:id", Patient.deletePatient);
router.get("/recent-patient", Patient.getRecentPatient);

module.exports = router;
