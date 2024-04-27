const { express } = require("express");
const LeaveType = require("../../model/LeaveType");
const LeaveRequest = require("../../model/LeaveRequest");
const Staff = require("../../model/Staff");
const { sequelize } = require("../../model");
const { QueryTypes } = require("sequelize");
/**
 * Get all leave types
 * @param {express.Request} req
 * @param {express.Response} res
 */
const generateReportData = async (req, res) => {
  const leaveCountById = await fetchLeaveCountByType();
  const allLeaves = await fetchAllLeaveReqs();
  res.status(200).json({ leaveCountById, allLeaves });
};

const fetchLeaveCountByType = async () => {
  const leaveRequests = await sequelize.query(
    `SELECT lt.name AS label, COUNT(lr.id) AS value FROM LeaveRequests lr JOIN
  LeaveTypes lt ON lr.LeaveTypeId = lt.id GROUP BY lt.name;`,
    { type: QueryTypes.SELECT }
  );

  return leaveRequests;
};

const fetchAllLeaveReqs = async () => {
  const leaveRequests = await LeaveRequest.findAll();
  return leaveRequests;
};

module.exports = { generateReportData };
