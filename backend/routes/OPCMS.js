const express = require("express");
const router = express.Router();

const appointmentsService = require("../systems/OPCMS/appointments");
const prescriptionsService = require("../systems/OPCMS/prescriptions"); // Import prescriptions service

// Appointments
router.get("/opdAppointments", appointmentsService.getAllOPDAppointments);
router.put("/opdAppointments/:id", appointmentsService.updateOPDAppointment);

// Prescriptions
router.post(
  "/patients/:id/prescriptions",
  prescriptionsService.createPrescription
);
router.get("/prescriptions", prescriptionsService.getAllPrescriptions);
router.get("/prescriptions/:id", prescriptionsService.getPrescriptionById);
router.put(
  "/patients/:id/prescriptions",
  prescriptionsService.updatePrescription
);
router.delete("/prescriptions/:id", prescriptionsService.deletePrescription);
router.get(
  "/patientPrescriptions/:id",
  prescriptionsService.getPrescriptionByPatientId
);

// Prescriptions router
router.post("/medicalRecords", prescriptionsService.searchPrescriptions);

module.exports = router;
