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

// Medicine Validator
const medicineValidator = yup.object({
  name: yup.string().min(3).max(100).required(),
  amount: yup.string().min(1).max(3).required(),
  expire_date: yup.date(),
});

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function getPharmacyMedicines(req, res) {
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

/**
 *get the medicine  names from inventory database
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function getInventoryMedicine(req, res) {
  const inventoryMedicine = await Medicine.findAll({
    include: Item,
  });
  res.status(200).json(inventoryMedicine);
}

// add the medicine to the db
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function setPharmacyMedicine(req, res) {
  try {
    await medicineValidator.validate(req.body);
    var data = medicineAmountValidator.cast(req.body);
  } catch (validationError) {
    res.status(400).send({ msg: validationError.errors[0] });
    return;
  }

  const newPharmacyMedicine = {
    name: data.name,
    amount: data.qty,
    expire_date: data.expDate,
  };

  try {
    const pharmacy = await PharmacyMedicine.create(newPharmacyMedicine);
    res.status(200).send({ msg: "pharmacy medicine added successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "pharmacy medicine not added successfully!" });
  }
}

// //GET TOTAL MEDICINE COUNT
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function getTotalMedicinesCount(req, res) {
  const sum = await PharmacyMedicine.count();
  res.status(200).json({ count: sum });
}

// GET THE MEDICINES' ID AND NAMES FROM MEDICINE TABLE
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function getIdandNameFromMedicineTable(req, res) {
  const sum = await PharmacyMedicine.count();
  res.status(200).json({ count: sum });
}
module.exports = {
  getPharmacyMedicines,
  getSpecificMedicine,
  deleteMedicine,
  changeStockLevel,
  getInventoryMedicine,
  setPharmacyMedicine,
  getTotalMedicinesCount,
};
