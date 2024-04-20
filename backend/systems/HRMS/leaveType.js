const LeaveType = require("../../model/LeaveType");
const express = require("express");
const yup = require("yup");

const leaveTypeValidator = yup
  .object({
    name: yup.string().required(),
    hours: yup.number().required(),
  })
  .noUnknown();

/**
 * Get all leave types
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getAllLeaveTypes = async (req, res) => {
  res.status(200).json(await LeaveType.findAll());
};

/**
 * Get leave type by id
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getLeaveTypeById = async (req, res) => {
  let id = Number.parseInt(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  let leaveType = await LeaveType.findByPk(id);
  if (leaveType === null) {
    res.status(404).json({ message: "Leave type not found" });
    return;
  }
  res.status(200).json({ ...leaveType.toJSON() });
};

/**
 * Create a new leave type
 * @param {express.Request} req
 * @param {express.Response} res
 */

const createLeaveType = async (req, res) => {
  try {
    console.log(req.body);
    var data = await leaveTypeValidator.validate(req.body);
  } catch (validationError) {
    res.status(400).send({ msg: validationError.errors[0] });
    return;
  }

  let leaveType = await LeaveType.create({
    name: data.name,
    hours: data.hours,
  });

  res.status(201).json({ ...leaveType.toJSON() });
};

/**
 * Update leave type by id
 * @param {express.Request} req
 * @param {express.Response} res
 */

const updateLeaveType = async (req, res) => {
  let id = Number.parseInt(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }

  let leaveType = await LeaveType.findByPk(id);
  if (leaveType === null) {
    res.status(404).json({ message: "Leave type not found" });
    return;
  }

  try {
    var data = await leaveTypeValidator.validate(req.body);
  } catch (validationError) {
    res.status(400).send({ msg: validationError.errors[0] });
    return;
  }

  await leaveType.update({
    name: data.name,
    hours: data.hours,
  });

  res.status(200).json({ ...leaveType.toJSON() });
};

/**
 * Delete leave type by id
 * @param {express.Request} req
 * @param {express.Response} res
 */
const deleteLeaveType = async (req, res) => {
  let id = Number.parseInt(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  let leaveType = await LeaveType.findByPk(id);
  if (leaveType === null) {
    res.status(404).json({ message: "Leave type not found" });
    return;
  }

  await leaveType.destroy();
  res.status(204).send();
};

module.exports = {
  getAllLeaveTypes,
  getLeaveTypeById,
  createLeaveType,
  updateLeaveType,
  deleteLeaveType,
};
