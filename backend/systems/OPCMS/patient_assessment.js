const PatientAssessment = require('../../model/PatientAssessment');
const express = require('express');
const yup = require('yup');

const patientAssessmentValidator = yup.object().shape({
    patientId: yup.number().required(),
    assessmentDate: yup.date().required(),
});

// GET all patient assessments
const getPatientAssessments = async (req, res) => {
    try {
        const patientAssessments = await PatientAssessment.findAll();
        res.status(200).json(patientAssessments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// POST a new patient assessment
const addPatientAssessment = async (req, res) => {
    try {
        // Validate request body
        const validData = await patientAssessmentValidator.validate(req.body, { abortEarly: false });

        // Create patient assessment
        const patientAssessment = await PatientAssessment.create(validData);
        res.status(201).json(patientAssessment);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Bad Request' });
    }
};

// PUT update a patient assessment
const updatePatientAssessment = async (req, res) => {
    try {
        // Get assessment ID from request params
        const { id } = req.params;
        // Validate request body
        const validData = await patientAssessmentValidator.validate(req.body, { abortEarly: false });

        // Find patient assessment by ID
        let patientAssessment = await PatientAssessment.findByPk(id);

        // Check if patient assessment exists
        if (!patientAssessment) {
            return res.status(404).json({ message: 'Patient assessment not found' });
        }

        // Update patient assessment
        patientAssessment = await patientAssessment.update(validData);

        res.status(200).json(patientAssessment);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Bad Request' });
    }
};

// DELETE a patient assessment
const deletePatientAssessment = async (req, res) => {
    try {
        // Get assessment ID from request params
        const { id } = req.params;

        // Find patient assessment by ID
        let patientAssessment = await PatientAssessment.findByPk(id);

        // Check if patient assessment exists
        if (!patientAssessment) {
            return res.status(404).json({ message: 'Patient assessment not found' });
        }

        // Delete patient assessment
        await patientAssessment.destroy();

        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getPatientAssessments,
    addPatientAssessment,
    updatePatientAssessment,
    deletePatientAssessment
};
