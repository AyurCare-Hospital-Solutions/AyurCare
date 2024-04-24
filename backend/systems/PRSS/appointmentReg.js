const OPDAppointment = require("../../model/OPDAppointment");
const express = require("express");
const yup = require("yup");
const { Op } = require("sequelize");

const validateRequestDetails = yup
  .object({
    PatientId: yup.number().required(),
  })
  .noUnknown();

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

// create the appointment
async function createAppointment(req, res) {
  try {
    // validate the reqest
    await validateRequestDetails.validate(req.body);
    var appointmentDetails = validateRequestDetails.cast(req.body);

    // add the default status as the pending
    const status = "pending";
    const final = { status, ...appointmentDetails };

    console.log(final);

    // check the patient is already have an appointment
    const oldPatient = await OPDAppointment.findOne({
      where: {
        PatientId: final.PatientId,
      },
    });

    if (oldPatient) {
      return res
        .status(400)
        .json({ msg: "Patient already have an appointment" });
    }

    // create the appointment
    const appointment = await OPDAppointment.create(final);
    return res.status(201).json(appointment.toJSON());
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: err.errors[0] });
  }
}

module.exports = {
  createAppointment,
};
