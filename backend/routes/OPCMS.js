const express = require('express');
const router = express.Router();

const appointmentsService = require('../systems/OPCMS/appointments');

// Appointments
router.get('/opdAppointments', appointmentsService.getAllOPDAppointments);
router.put('/opdAppointments/:id', appointmentsService.updateOPDAppointment);

module.exports = router;
