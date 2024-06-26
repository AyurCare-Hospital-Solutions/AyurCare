const LeaveRequest = require("../../model/LeaveRequest");
const express = require("express");
const yup = require("yup");
const { getUserID } = require("../../middleware/auth");
const LeaveType = require("../../model/LeaveType");
const Staff = require("../../model/Staff");
const leaveRequestValidator = yup
  .object({
    type: yup.number().required(),
    reason: yup.string().required(),
    startDate: yup.date().required(),
    endDate: yup.date().required().nullable(),
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
  res
    .status(200)
    .json(await LeaveRequest.findAll({ include: [LeaveType, Staff] }));
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

  let leaveType = await LeaveType.findByPk(data.type);
  if (leaveType === null) {
    res.status(400).send({ msg: "Invalid leave type" });
    return;
  }

  let leaveRequest = await LeaveRequest.create({
    LeaveTypeId: leaveType.id,
    reason: data.reason,
    start_date: data.startDate,
    end_date: data.endDate,
    registration: data.registration,
    hours: data.hours,
    status: data.status,
    StaffId: getUserID(res),
  });
  res.status(200).json({ ...leaveRequest.toJSON(), LeaveType: leaveType });
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

  let leaveType = await LeaveType.findByPk(data.type);
  if (leaveType === null) {
    res.status(400).send({ msg: "Invalid leave type" });
    return;
  }

  await leaveRequest.update({
    LeaveTypeId: data.type,
    reason: data.reason,
    start_date: data.startDate,
    end_date: data.endDate,
    registration: data.registration,
    hours: data.hours,
  });
  res.status(200).json({ ...leaveRequest.toJSON(), LeaveType: leaveType });
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */

const updateLeaveRequestStatus = async (req, res) => {
  let id = Number.parseInt(req.params.id);

  if (!Number.isInteger(id)) {
    res.status(400).json({ msg: "Invalid leave request number" });
    return;
  }

  let leaveRequest = await LeaveRequest.findByPk(id, { include: LeaveType });
  if (leaveRequest === null) {
    res.status(404).json({ msg: "The leave request does not exist" });
    return;
  }

  const status = req.body.status;

  await leaveRequest.update({
    status: status,
  });
  res.status(200).json({ ...leaveRequest.toJSON() });
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

  let leaveRequest = await LeaveRequest.findAll({
    where: { StaffId: userId },
    include: LeaveType,
  });
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
  updateLeaveRequestStatus,
};
