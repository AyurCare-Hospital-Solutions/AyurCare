const OPDAppointment = require("../../model/OPDAppointment");
const Patient = require("../../model/Patient");
const express = require("express"); 

// Get all OPD appointments
const getAllOPDAppointments = async (req, res) => {
  try {
    const appointments = await OPDAppointment.findAll({
      include: [Patient], // Include related patient model
    });
    res.json(appointments);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error getting OPD appointments: ${error.message}` });
  }
};

// Get OPD appointment by ID
const getOPDAppointmentById = async (req, res) => {
  const id = req.params.id;
  try {
    const appointment = await OPDAppointment.findByPk(id, {
      include: [Patient],
    });
    if (!appointment) {
      return res.status(404).json({ error: "OPD appointment not found" });
    }
    res.json(appointment);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error getting OPD appointment by ID: ${error.message}` });
  }
};


// Update an OPD appointment
const updateOPDAppointment = async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  try {
    const [updatedAppointment] = await OPDAppointment.update(updatedData, {
      where: {
        id: id,
      },
    });
    if (!updatedAppointment) {
      return res.status(404).json({ error: "OPD appointment not found" });
    }
    res.status(200).json({ message: "OPD appointment updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error updating OPD appointment: ${error.message}` });
  }
};

module.exports = {
  getAllOPDAppointments,
  getOPDAppointmentById,
  updateOPDAppointment,
};
