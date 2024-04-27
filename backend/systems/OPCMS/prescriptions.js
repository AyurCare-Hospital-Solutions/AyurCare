const Patient = require("../../model/Patient");
const Prescription = require("../../model/Prescription");
const express = require("express");

// Create a prescription
const createPrescription = async (req, res) => {
  try {
    console.log(req.body);
    const prescription = await Prescription.create(req.body);
    res.status(201).json(prescription);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: `Error creating prescription: ${error.message}` });
  }
};

// Get all prescriptions
const getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.findAll();
    res.json(prescriptions);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error getting prescriptions: ${error.message}` });
  }
};

// Get prescription by ID
const getPrescriptionById = async (req, res) => {
  const id = req.params.id;
  try {
    const prescription = await Prescription.findByPk(id);
    if (!prescription) {
      return res.status(404).json({ error: "Prescription not found" });
    }
    res.json(prescription);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error getting prescription by ID: ${error.message}` });
  }
};

// Update a prescription
const updatePrescription = async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  try {
    const [updatedPrescription] = await Prescription.update(updatedData, {
      where: {
        id: id,
      },
    });
    if (!updatedPrescription) {
      return res.status(404).json({ error: "Prescription not found" });
    }
    res.status(200).json({ message: "Prescription updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error updating prescription: ${error.message}` });
  }
};

// Delete a prescription
const deletePrescription = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Prescription.destroy({
      where: {
        id: id,
      },
    });
    if (!deleted) {
      return res.status(404).json({ error: "Prescription not found" });
    }
    res.status(204).json({ message: "Prescription deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error deleting prescription: ${error.message}` });
  }
};

const getPrescriptionByPatientId = async (req, res) => {
  const id = req.params.id;

  const patient = await Patient.findByPk(id);

  if(patient === null){
    return res.status(404).json({ error: "Patient not found" });
  }

  try {
    const prescription = await Prescription.findAll({
      where:{
        PatientId: id,
      }
    });
    if (!prescription) {
      return res.status(404).json({ error: "Prescription not found" });
    }
    console.log(prescription);
    console.log(prescription);
    res.status(200).json({prescription, patient});
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error getting prescription by ID: ${error.message}` });
  }
};

module.exports = {
  createPrescription,
  getAllPrescriptions,
  getPrescriptionById,
  updatePrescription,
  deletePrescription,
  getPrescriptionByPatientId,
};
