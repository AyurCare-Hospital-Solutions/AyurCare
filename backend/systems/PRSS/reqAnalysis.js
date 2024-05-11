const express = require("express");
const OPDAppointment = require("../../model/OPDAppointment");
const { Op, Sequelize } = require("sequelize");
const { sequelize } = require("../../model");

// get manufacture request analysis
/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

async function appointmentsData(req, res) {
  const pendingCount = await OPDAppointment.count({
    where: {
      status: {
        [Op.or]: [
          { [Op.like]: "pending%" },
          { [Op.like]: "Pending%" },
          { [Op.like]: "PENDING%" },
        ],
      },
    },
  });
  const completedCount = await OPDAppointment.count({
    where: {
      status: {
        [Op.or]: [
          { [Op.like]: "completed%" },
          { [Op.like]: "Completed%" },
          { [Op.like]: "COMPLETED%" },
        ],
      },
    },
  });

  return res.status(200).json({ pendingCount, completedCount });
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

async function dailyAppointementCount(req, res) {
  const today = new Date().setHours(0, 0, 0, 0);
  const tomorrow = new Date(today).setDate(new Date().getDate() + 1);

  const todayAppointments = await OPDAppointment.findAll({
    attributes: [
      [sequelize.fn("DATE", sequelize.col("createdAt")), "appointmentDate"],
      [sequelize.fn("COUNT", sequelize.literal("*")), "appointmentCount"],
    ],
    group: [sequelize.fn("DATE", sequelize.col("createdAt"))],
  });

  return res.status(200).json({ todayAppointments });
}

module.exports = { appointmentsData, dailyAppointementCount };
