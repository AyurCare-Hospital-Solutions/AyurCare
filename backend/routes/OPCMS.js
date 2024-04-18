const express = require('express');
const router = express.Router();

const patientAssessmentService = require('../systems/OPCMS/patient_assessment');

// Patient Assessment
router.get('/patientAssessment', patientAssessmentService.getPatientAssessments);
router.post('/patientAssessment/addPatientAssessment', patientAssessmentService.addPatientAssessment);
router.put('/patientAssessment/updatePatientAssessment/:id', patientAssessmentService.updatePatientAssessment);
router.delete('/patientAssessment/deletePatientAssessment/:id', patientAssessmentService.deletePatientAssessment);

//

module.exports = router;
