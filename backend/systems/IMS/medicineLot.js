const MedicineLot = require('../../model/MedicineLot');
const Medicine = require('../../model/Medicine');
const Item = require('../../model/Item');
const express = require('express');
const yup = require('yup');

const medicineLotValidator = yup.object(
    {
        manufacturer: yup.string().required(),
        amount: yup.string().required().min(0),
        expireDate: yup.date().required(),
        medicineId: yup.number().required(),
    }
)

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const getMedicineLot = async (req, res) => {
    let id = Number.parseInt(req.params.medId); // TODO: need to validate
    if (!Number.isInteger(id)) {
        res.status(400).json({ msgL: " ID Format error" });
        return;
    }
    const medicineLot = await MedicineLot.findAll({
        include: {
            model: Medicine,
            include: Item
        },
        where: {
            MedicineID: id,
        }
    });
    res.status(200).json(medicineLot);
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const addMedicineLot = async (req, res) => {
    try {
        var medicineLotData = await medicineLotValidator.validate(req.body);

    }
    catch (validationError) {
        res.status(400).json({ msg: validationError.errors[0] });
        return;
    }
    let lot = await MedicineLot.create({ manufacturer: medicineLotData.manufacturer, amount: medicineLotData.amount, expire_date: medicineLotData.expireDate, MedicineId: medicineLotData.medicineId });
    res.status(200).json(lot);
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const upDateMedicineLot = async (req, res) => {
    // get id from route params
    let id = Number.parseInt(req.params.id);

    // check if ward number is valid
    if (!Number.isInteger(id)) {
        res.status(400).json({ msg: "Invalid Medicine ID (format error)" });
        return;
    }

    //validate req body 
    try {
        var medicineLotData = await medicineLotValidator.validate(req.body);
    }
    catch (validationError) {
        res.status(400).json({ msg: validationError.errors[0] });
        return;
    }
    //check exsistance of lot
    const medicineLot = await MedicineLot.findByPk(id);
    if (materialLot === null) {
        res.status(404).json({ msg: "The Medicine Lot does not exist" });
        return;
    }
    medicineLot = await medicineLot.update({ amount: (medicineLot.amout - medicineLotData.amount) });

    res.status(200).json({ data: { medicineLot } });
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const deleteMedicineLot = async (req, res) => {
    // get id from route params
    let id = Number.parseInt(req.body.id);

    // check if ward number is valid
    if (!Number.isInteger(id)) {
        res.status(400).json({ msg: "Invalid Medicine ID (format error)" });
        return;
    }
    const medicineLot = await MedicineLot.findByPk(id);
    if (materialLot === null) {
        res.status(404).json({ msg: "The Medicine Lot does not exist" });
        return;
    }
    await medicineLot.destroy();
    res.sendStatus(204);
}

module.exports = {
    getMedicineLot,
    addMedicineLot,
    upDateMedicineLot,
    deleteMedicineLot,
};