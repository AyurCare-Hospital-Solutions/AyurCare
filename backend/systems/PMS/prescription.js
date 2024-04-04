const express = require("express");
const Prescription = require("../../model/Prescription");
const Patient = require("../../model/Patient");
const OPDAppointment = require("../../model/OPDAppointment");

// this () is for get the all prescriptions from the DB
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function getPrescriptions(req, res) {
  const prescriptions = await Prescription.findAll({
    include: [{ model: OPDAppointment, include: Patient }],
  });

  console.log(prescriptions);

  res.status(200).json({ msg: "success" });
}

// MINE 1
// this method is for updating the prescription.
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function updatePrescription(req, res) {
  res.status(200).json({ msg: "this is update prescription" });
}

module.exports = { getPrescriptions, updatePrescription };
