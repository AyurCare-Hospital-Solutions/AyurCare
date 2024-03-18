const Patient = require("../../model/Patient");
const express = require("express");
const yup = require("yup");

// validate the patient details
const validatePatientDetails = yup.object({
    name: yup.string().min(2).max(100).required(),
    nic: yup.string().min(10).max(15).required(),
    phone: yup.string().min(10).max(14).required(),
    email: yup.string().min(5).max(50).email().required(),
    address: yup.string().min(5).max(255).required(),
    tracking_no: yup.string().min(5).max(15).required(),
    last_visit: yup.string().required()
}).strict().noUnknown();

// localhost:5000/api/prss/test

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

// test function
async function test(req, res) {
    res.status(200).send("Api is working");
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

async function createNewPatient(req, res) {
    try {
        var data = await validatePatientDetails.validate(req.body); 
    } catch (validationError) {
        res.status(400).send({ msg: validationError.errors[0] });
        return;
    }
    const patient = await Patient.create(data);
    return res.status(200).json(patient.toJSON());
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

// get the all patients details
async function getPatients(req, res) {
    res.status(200).json(await Patient.findAll());
}

//csjdvjwsjdvbjdf

module.exports = {test, createNewPatient}