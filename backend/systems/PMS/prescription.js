const express = require("express");
const yup = require("yup");
const ExternalPrescription = require("../../model/ExternalPrescription");
// Data validator
const medicineAmountValidator = yup
  .object({
    patientName: yup.string().min(3).max(100).required(),
    age: yup.string().min(1).max(3).required(),
    address: yup.string().min(10).max(200).required(),
    email: yup.string().email().required(),
    phoneNumber: yup.string().min(10).max(10).required(),
    specialNotes: yup.string().min(0).max(200),
  })
  .strict();
// .noUnknown();

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function uploadPrescription(req, res) {
  let data = await medicineAmountValidator.validate(req.body);

  await ExternalPrescription.create({
    name: data.patientName,
    age: data.age,
    address: data.address,
    email: data.email,
    phone: data.phoneNumber,
    notes: data.specialNotes,
    file: req.file.filename,
  });
  res.status(200).json({});
}

module.exports = { uploadPrescription };
