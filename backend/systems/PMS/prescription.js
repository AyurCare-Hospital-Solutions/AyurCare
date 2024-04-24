const express = require("express");
const Prescription = require("../../model/Prescription");
const Patient = require("../../model/Patient");
const Staff = require("../../model/Staff");
const OPDAppointment = require("../../model/OPDAppointment");

// this () is for get the all prescriptions from the DB
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function getPrescriptions(req, res) {
  const prescriptions = await Prescription.findAll({
    include: [{ model: Patient }, { model: OPDAppointment }],
  });
  res.status(200).json(prescriptions);
}

// This method is for updating the prescription's status
/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function updatePrescriptionStatus(req, res) {
  const prescriptionId = Number.parseInt(req.params.id);
  const { status } = req.body; // Destructure status from the request body

  try {
    const prescriptionObject = await Prescription.findByPk(prescriptionId);
    if (!prescriptionObject) {
      return res.status(404).json({ msg: "Prescription not found" });
    }

    await prescriptionObject.update({ status: status }); // Update the status dynamically based on input
    res.status(200).json({ msg: "Prescription status updated successfully" });
  } catch (error) {
    console.error("Failed to update prescription status:", error);
    res.status(500).json({ msg: "Failed to update prescription status" });
  }
}

// GET THE TOTAL NUMBER OF THE PRESCRIPTIONS
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function getTotalPrescriptionsCount(req, res) {
  const sum = await Prescription.count();
  res.status(200).json({ count: sum });
}

module.exports = {
  getPrescriptions,
  updatePrescriptionStatus,
  getTotalPrescriptionsCount,
};
