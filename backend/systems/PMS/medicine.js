const express = require("express");
const PharmacyMedicine = require("../../model/PharmacyMedicine");
const Item = require("../../model/Item");
const Medicine = require("../../model/Medicine");
const yup = require("yup");

// Data validator
const medicineAmountValidator = yup
  .object({
    amount: yup.number().min(0).max(100).required(),
  })
  .strict()
  .noUnknown();

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function getMedicines(req, res) {
  res.status(200).json(
    await PharmacyMedicine.findAll({
      include: [{ model: Medicine, include: Item }],
    })
  );
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function getSpecificMedicine(req, res) {
  const value = Number.parseInt(req.params.id);

  if (!Number.isInteger(value)) {
    res.status(400).json({ msg: "Invalid Medicine Number" });
    return;
  }

  const medicine = await PharmacyMedicine.findByPk(value, {
    include: [{ model: Medicine, include: Item }],
  });

  if (medicine == null) {
    res.status(404).json({ msg: "Medicine not found" });
    return;
  }

  res.status(200).json(medicine);
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function deleteMedicine(req, res) {
  const value = Number.parseInt(req.params.id);

  if (!Number.isInteger(value)) {
    res.status(400).json({ msg: "Invalid Medicine Number" });
    return;
  }

  const medicine = await PharmacyMedicine.findByPk(value);

  if (medicine == null) {
    res.status(404).json({ msg: "Medicine not found" });
    return;
  }

  await medicine.destroy();

  res.sendStatus(204);
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function changeStockLevel(req, res) {
  const value = Number.parseInt(req.params.id);
  const amount = Number.parseInt(req.body.amount);

  if (!Number.isInteger(value)) {
    res.status(400).json({ msg: "Invalid medicine number" });
    return;
  }

  if (!Number.isInteger(amount) && amount >= 0) {
    res.status(400).json({ msg: "Invalid stock count" });
    return;
  }

  const medicine = await PharmacyMedicine.findByPk(value);

  if (medicine == null) {
    res.sendStatus(404).json({ msg: "Medicine not found" });
    return;
  }

  medicine.update({ amount: amount });

  res.sendStatus(200);
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function changeStockLevel(req, res) {
  const value = Number.parseInt(req.params.id);
  const amount = Number.parseInt(req.body.amount);

  if (!Number.isInteger(value)) {
    res.status(400).json({ msg: "Invalid medicine number" });
    return;
  }

  if (!Number.isInteger(amount) && amount >= 0) {
    res.status(400).json({ msg: "Invalid stock count" });
    return;
  }

  const medicine = await PharmacyMedicine.findByPk(value);

  if (medicine == null) {
    res.sendStatus(404).json({ msg: "Medicine not found" });
    return;
  }

  medicine.update({ amount: amount });

  res.sendStatus(200);
}

module.exports = {
  getMedicines,
  getSpecificMedicine,
  deleteMedicine,
  changeStockLevel,
};
