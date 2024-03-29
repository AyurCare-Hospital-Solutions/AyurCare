const express = require("express");
const Prescription = require("../../model/Prescription");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function getPrescriptions(req, res) {
  res.status(200).json(await Prescription.findAll());
}

module.exports = { getPrescriptions };
