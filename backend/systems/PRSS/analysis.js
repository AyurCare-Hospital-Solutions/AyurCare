const OPDAppointment = require("../../model/OPDAppointment");
const express = require("express");
const yup = require("yup");
const { Op } = require("sequelize");
const Patient = require("../../model/Patient");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

async function getGenderCount(req, res) {
  // get the male counts from the database
  const malePatientCount = await Patient.count({
    where: {
      gender: {
        [Op.or]: [
          { [Op.like]: "male%" },
          { [Op.like]: "Male%" },
          { [Op.like]: "MALE%" },
        ],
      },
    },
  });
  const femalePatientCount = await Patient.count({
    where: {
      gender: {
        [Op.or]: [
          { [Op.like]: "female%" },
          { [Op.like]: "Female%" },
          { [Op.like]: "FEMALE%" },
        ],
      },
    },
  });

  return res.status(200).json({ malePatientCount, femalePatientCount });
}

module.exports = {
  getGenderCount,
};
