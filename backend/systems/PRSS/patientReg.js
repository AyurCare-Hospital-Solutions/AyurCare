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
    // tracking_no: yup.string().min(5).max(15).required(),
}).strict().noUnknown();

// get the current date
function getDate() {
    return new Date().toISOString().split("T")[0];
};

//create the tracking number
async function createTrackingNumber(i) {
    const date = new Date();
    
    // check the month is 0
    if (date.getMonth() === 0) {
        return `${date.getFullYear()}A${i}`;
    }else if (date.getMonth() === 1) {
        return `${date.getFullYear()}B${i}`;
    }else if (date.getMonth() === 2) {
        return `${date.getFullYear()}C${i}`;
    }else if (date.getMonth() === 3) {
        return `${date.getFullYear()}D${i}`;
    }else if (date.getMonth() === 4) {
        return `${date.getFullYear()}E${i}`;
    }else if (date.getMonth() === 5) {
        return `${date.getFullYear()}F${i}`;
    }else if (date.getDate() === 6) {
        return `${date.getFullYear()}G${i}`;
    }else if (date.getDate() === 7) {
        return `${date.getFullYear()}H${i}`;
    }else if (date.getDate() === 8) {
        return `${date.getFullYear()}I${i}`;
    }else if (date.getDate() === 9) {
        return `${date.getFullYear()}J${i}`;
    }else if (date.getDate() === 10) {
        return `${date.getFullYear()}K${i}`;
    }else if (date.getDate() === 11) {
        return `${date.getFullYear()}L${i}`;
    }else{
        return false;
    }
}

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

// create new patient
async function createNewPatient(req, res) {
    try {
        var check = await validatePatientDetails.validate(req.body); 
    } catch (validationError) {
        res.status(400).send({ msg: validationError.errors[0] });
        return;
    }

    // check the patient already exist
    const patientExist = await Patient.findOne({ where: { nic: req.body.nic } });

    // if exist send the error message
    if (patientExist) {
        return res.status(400).json({ msg: "Patient already exists" });
    }

    try {

        // grtting the details from the frontene
        const patientDetails = { ...req.body };

        // create the tracking number
        const tracking_no = await createTrackingNumber(1);

        // add the tracking number to the patient details
        const newPatient = { tracking_no, ...patientDetails };
        console.log(newPatient);

        const patient = await Patient.create(newPatient);
        return res.status(200).json(patient.toJSON());
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "An error occured while creating the patient. Please try again later."});
    }
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

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

// get patient details by id
async function getPatientDetails(req, res) {
    
    // check the patient id is null
    if (!Number.isInteger(Number.parseInt(req.params.id))) {
        res.status(400).json({msg: "Invalid patient id"});
        return;
    }

    const patient = await Patient.findByPk(req.params.id);
    if(patient === null){
        res.status(404).json({msg: "The patient does not exist"});
        return;
    }
    res.status(200).json(patient);
}

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

// update patient details
async function updatePatientDetails(req, res) {

    try {
        var data = await validatePatientDetails.validate(req.body);
    }catch(validationError){
        res.status(400).send({msg: validationError.errors[0]});
        return;
    }
    
    // getting the patient id
    const id = Number.parseInt(req.params.id);

    // check the patient id is null
    if(id === null){
        res.status(400).json({msg: "Invalid patient id"});
        return;
    }

    //check the id is an integer
    if (!Number.isInteger(id)) {
        res.status(400).json({msg: "Invalid patient id"});
        return;        
    }

    // find the patient by id
    const patient = await Patient.findByPk(id);
    if(patient === null){
        res.status(404).json({msg: "The patient does not exist"});
        return;
    }
    
    // send the update data
    await patient.update(data);
    res.status(200).json({  msg: "Patient details updated successfully" });
}

/**
 * @param {express.Request} req 
 * @param {express.Response} res  
 */

// get the patient details by id
async function deletePatient(req, res) {

    // checking the patient id is null
    if(req.params.id === null){
        res.status(400).json({msg: "Invalid patient id"});
        return;
    }

    // Getting the patient id
    const patient = await Patient.findByPk(req.params.id);
    if(patient === null){
        res.status(404).json({msg: "The patient does not exist"});
        return;
    }
    await patient.destroy();
    res.status(200).json({msg: "Patient deleted successfully"});
}

module.exports = {test, createNewPatient, getPatients, getPatientDetails, updatePatientDetails, deletePatient}