const express = require("express");
const router = express.Router();

// import the patient function to the router
const Patient = require("../systems/PRSS/patientReg");
const Appointment = require("../systems/PRSS/appointmentReg");
const Analysis = require("../systems/PRSS/analysis");
const AppointmentAnalysis = require("../systems/PRSS/reqAnalysis");

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
router.get("/get-appointments", Appointment.getAppointments);
router.put("/update-appointments/:id", Appointment.editAppointment);
router.delete("/delete-appointments/:id", Appointment.deleteAppointment);
router.get("/today-appointments", Appointment.getpendingAppointment);

// Analysis related APIs
router.get("/gender-count", Analysis.getGenderCount);
router.get("/get-patient-stat", Analysis.getNewPatientCount);

// Analysis related status OPDAppointment
router.get("/appointmentsData", AppointmentAnalysis.appointmentsData);
router.get(
  "/dailyAppointmentCount",
  AppointmentAnalysis.dailyAppointementCount
);

module.exports = router;
