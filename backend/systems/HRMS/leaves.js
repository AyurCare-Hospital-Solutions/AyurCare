const LeaveRequest = require("../../model/LeaveRequest");
const express = require("express");
const yup = require("yup");

const leaveRequestValidator = yup
  .object({
    type: yup.string().required(),
    reason: yup.string().required(),
    date: yup.date().required(),
    registration: yup.string().required(),
    hours: yup.number().required(),
    status: yup.string().required(),
  })
  .noUnknown();

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getAllLeaveRequests = async (req, res) => {
  res.status(200).json(await LeaveRequest.findAll());
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */

const getLeaveRequest = async (req, res) => {
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
  res.status(200).json({ ...leaveRequest.toJSON() });
};

/**
 *
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
    StaffId: 1,
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
 *
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

module.exports = {
  getAllLeaveRequests,
  getLeaveRequest,
  createLeaveRequest,
  updateLeaveRequest,
  deleteLeaveRequest,
};
