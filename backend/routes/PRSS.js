const express = require("express");
const router = express.Router();

// import the patient function to the router
const Patient = require("../systems/PRSS/patientReg");
const Appointment = require("../systems/PRSS/appointmentReg");

// Register routes here
// patient registration related APIs
router.get("/test-patient", Patient.test);
router.post("/create-patient", Patient.createNewPatient);
router.get("/get-patients", Patient.getPatients);
router.get("/get-patient/:id", Patient.getPatientDetails);
router.put("/update-patient/:id", Patient.updatePatientDetails);
router.delete("/delete-patient/:id", Patient.deletePatient);
router.get("/recent-patient", Patient.getRecentPatient);
router.get("/tolCount-patient", Patient.getPatientCountPerDay);

// Appointment registration related APIs
router.post("/create-appointment", Appointment.createAppointment);

module.exports = router;
