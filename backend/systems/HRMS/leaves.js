const LeaveRequest = require("../../model/LeaveRequest");
const express = require("express");
const yup = require("yup");
const { getUserID } = require("../../middleware/auth");
const leaveRequestValidator = yup
  .object({
    type: yup.number().required(),
    reason: yup.string().required(),
    startDate: yup.date().required(),
    endDate: yup.date().required(),
    registration: yup.string().required(),
    hours: yup.number().required().nullable(),
  })
  .noUnknown();

/**
 * Get all leave requests
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getAllLeaveRequests = async (req, res) => {
  res.status(200).json(await LeaveRequest.findAll());
};

/**
 * Get leave request by id
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getLeaveRequestById = async (req, res) => {
  let id = Number.parseInt(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  let leaveRequest = await LeaveRequest.findByPk(id);
  if (leaveRequest === null) {
    res.status(404).json({ message: "Leave request not found" });
    return;
  }
  res.status(200).json({ ...leaveRequest.toJSON() });
};

/**
 * Create a new leave request
 * @param {express.Request} req
 * @param {express.Response} res
 */
const createLeaveRequest = async (req, res) => {
  try {
    console.log(req.body);
    var data = await leaveRequestValidator.validate(req.body);
  } catch (validationError) {
    res.status(400).send({ msg: validationError.errors[0] });
    return;
  }

  let leaveRequest = await LeaveRequest.create({
    type: data.type,
    reason: data.reason,
    date: data.date,
    registration: data.registration,
    hours: data.hours,
    status: data.status,
    StaffId: getUserID(res),
  });
  res.status(200).json({ data: leaveRequest });
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */

const updateLeaveRequest = async (req, res) => {
  let id = Number.parseInt(req.params.id);

  if (!Number.isInteger(id)) {
    res.status(400).json({ msg: "Invalid leave request number" });
    return;
  }

  try {
    var data = await leaveRequestValidator.validate(req.body);
  } catch (validationError) {
    res.status(400).send({ msg: validationError.errors[0] });
    return;
  }

  let leaveRequest = await LeaveRequest.findByPk(id);
  if (leaveRequest === null) {
    res.status(404).json({ msg: "The leave request does not exist" });
    return;
  }

  await leaveRequest.update(data);
  res.sendStatus(204);
};

/**
 * Delete leave request by id
 * @param {express.Request} req
 * @param {express.Response} res
 */

const deleteLeaveRequest = async (req, res) => {
  let id = Number.parseInt(req.params.id);

  if (!Number.isInteger(id)) {
    res.status(400).json({ msg: "Invalid leave request number" });
    return;
  }

  let leaveRequest = await LeaveRequest.findByPk(id);
  if (leaveRequest === null) {
    res.status(404).json({ msg: "The leave request does not exist" });
    return;
  }

  await leaveRequest.destroy();
  res.sendStatus(204);
};

/**
 * Get leave request by id
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getLeaveRequestByUser = async (req, res) => {
  const userId = getUserID(res);

  let leaveRequest = await LeaveRequest.findAll({ where: { StaffId: userId } });
  if (leaveRequest === null) {
    res.status(404).json({ message: "Leave request not found" });
    return;
  }
  res.status(200).json(leaveRequest);
};

module.exports = {
  getAllLeaveRequests,
  getLeaveRequestById,
  createLeaveRequest,
  updateLeaveRequest,
  deleteLeaveRequest,
  getLeaveRequestByUser,
};
