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

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

// get the new registered patient count
async function getNewPatientCount(req, res) {
  // today
  const today = new Date().setHours(0, 0, 0, 0);

  // tomorrow
  const tomorrow = new Date(today).setDate(new Date().getDate() + 1);

  const newPatientCount = await Patient.count({
    where: {
      createdAt: {
        [Op.gte]: new Date(today),
        [Op.lt]: new Date(tomorrow),
      },
    },
  });

  // get the total patient count for this year
  const totalPatientCount = await Patient.count({
    where: {
      createdAt: {
        [Op.gte]: new Date(new Date().getFullYear(), 0, 1),
        [Op.lt]: new Date(new Date().getFullYear() + 1, 0, 1),
      },
    },
  });

  return res
    .status(200)
    .json({ todayCount: newPatientCount, totalCount: totalPatientCount });
}

module.exports = {
  getGenderCount,
  getNewPatientCount,
};
