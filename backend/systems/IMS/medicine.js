const Medicine = require('../../model/Medicine');
const Item = require('../../model/Item');
const express = require("express");
const yup = require("yup");

const medicineValidator = yup.object(
    {
        medicineName: yup.string().required(),
        inHouse: yup.boolean().required(),
        buffer: yup.number().required(),
        unit: yup.string().required(),
    }
);

// get medicine
/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const getMedicine = async (req, res) => {
    const medicine = await Medicine.findAll({
        include: Item
    });
    res.status(200).json(medicine);
}

// add medicine
/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const addMedicine = async (req, res) => {
    try {
        var medicineData = await medicineValidator.validate(req.body);
    }
    catch (validationError) {
        res.status(400).json({ msg: validationError.errors[0] });
        return;
    }
    let item = await Item.create({ name: medicineData.medicineName, reOrderBuffer: medicineData.buffer, unit: medicineData.unit })
    let medicine = await Medicine.create({ inHouse: medicineData.inHouse, ItemId: item.id });
    res.status(200).json({ data: { medicine, item } });
}


// update medicine
/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const updateMedicine = async (req, res) => {
    // get id from route params
    let id = Number.parseInt(req.params.id);

    // check if ward number is valid
    if (!Number.isInteger(id)) {
        res.status(400).json({ msg: "Invalid Medicine ID (format error)" });
        return;
    }

    //validate req body 
    try {
        var medicineData = await medicineValidator.validate(req.body);
    }
    catch (validationError) {
        res.status(400).json({ msg: validationError.errors[0] });
        return;
    }

    // check existance of medicine
    let medicine = await Medicine.findByPk(id);
    if (medicine === null) {
        res.status(404).json({ msg: "The Medicine does not exist" });
        return;
    }

    let item = await Item.findByPk(medicine.ItemId);

    item = await item.update({ name: medicineData.medicineName, reOrderBuffer: medicineData.buffer, unit: medicineData.unit });
    medicine = await medicine.update({ inHouse: medicineData.inHouse });
    res.status(200).json({ data: { medicine, item } });
}

// delete medicine
/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const deleteMedicine = async (req, res) => {
    let id = req.body.id;  // get id from request body
    // validate id format
    if (!Number.isInteger(id)) {
        res.status(400).json({ msg: "Invalid Medicine ID (format error)" });
        return;
    }

    // check existance of medicine
    let medicine = await Medicine.findByPk(id);
    let item = await medicine.getItem();
    if (medicine === null) {
        res.status(404).json({ msg: "The Medicine does not exist" });
        return;
    }
    await item.destroy();
    res.sendStatus(204);
}

module.exports = {
    getMedicine,
    addMedicine,
    updateMedicine,
    deleteMedicine,
}