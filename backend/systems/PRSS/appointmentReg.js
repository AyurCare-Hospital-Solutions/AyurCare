const OPDAppointment = require("../../model/OPDAppointment");
const express = require("express");
const yup = require("yup");
const { Op } = require("sequelize");
const Patient = require("../../model/Patient");

const validateRequestDetails = yup
  .object({
    PatientId: yup.number().required(),
  })
  .noUnknown();

const validateStatus = yup
  .object({
    status: yup.string().required(),
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

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

async function getAppointments(req, res) {
  const data = await OPDAppointment.findAll({
    include: Patient,
  });
  return res.status(200).json(data);
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

async function editAppointment(req, res) {
  // gettting the details from the request
  try {
    var data = await validateStatus.validate(req.body);
  } catch (validationError) {
    res.status(400).send({ msg: validationError.errors[0] });
    return;
  }

  // getting the appointment id from the API
  const id = Number.parseInt(req.params.id);

  // updatre the details from the
  if (id == null) {
    return res.status(400).json({ msg: "Invalid appointment id" });
  }

  // find the patient by id
  const result = await OPDAppointment.findByPk(id);
  if (!result) {
    return res.status(404).json({ msg: "The patient does not exist" });
  }

  const final = await result.update({
    status: data.status,
  });
  return res.status(200).json(final);
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

async function deleteAppointment(req, res) {
  // getting the patient id from the request
  const id = Number.parseInt(req.params.id);

  // delete the appointment
  const appointment = await OPDAppointment.findByPk(id);
  await appointment.destroy();
  return res.status(200).json({ msg: "Appointment deleted successfully" });
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

async function getpendingAppointment(req, res) {
  // today starts from the 12:00 AM
  const todayStartTime = new Date().setHours(0, 0, 0, 0);

  const getTomorrow = new Date(todayStartTime).setDate(
    new Date().getDate() + 1
  );

  // get hte all appointments for today
  const data = await OPDAppointment.findAll({
    where: {
      createdAt: {
        [Op.gte]: new Date(todayStartTime),
        [Op.lt]: new Date(getTomorrow),
      },
    },
  });

  const pendingAppointments = data.filter((appointment) => {
    return appointment.status.toLowerCase() === "pending";
  });

  // get the all data lenght
  const allAppointments = data.length;

  // get the pending appointment count
  const pendingAppointmentCount = pendingAppointments.length;

  return res.status(200).json({ allAppointments, pendingAppointmentCount });
}

module.exports = {
  createAppointment,
  getAppointments,
  editAppointment,
  deleteAppointment,
  getpendingAppointment,
};
