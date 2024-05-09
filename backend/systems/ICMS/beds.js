const Ward = require("../../model/Ward");
const express = require("express");
const yup = require("yup");
const Bed = require("../../model/Bed");

const bedValidator = yup.object({
    WardId: yup.number().required(),
    number: yup.number().required()
}).strict().noUnknown();


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const createBed = async (req, res) => {
    try {
        var data = await bedValidator.validate(req.body);
    } catch (validationError) {
        res.status(400).send({ msg: validationError.errors[0] });
        return;
    }

    // get the ward with the given id
    let ward = await Ward.findByPk(data.WardId);
    if (ward === null) {
        res.status(404).json({ msg: "The ward does not exist" })
        return;
    }

    let bed = await Bed.create({
        WardId: data.WardId,
        number: data.number
    });

    res.status(200).json(await Bed.findByPk(bed.id, { include: Ward }));
}


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const getBeds = async (req, res) => {
    const wardID = Number.parseInt(req.params.ward);
    if (!Number.isInteger(wardID)) {
        res.status(400).json({ msg: "Invalid ward id" });
        return;
    }

    res.status(200).json(await Bed.findAll({ where: { WardId: wardID }, include: Ward }));
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const deleteBed = async (req, res) => {
    const bedID = Number(req.params.bed);
    if (!Number.isInteger(bedID)) {
        res.status(400).json({ msg: "Invalid bed id" });
        return;
    }

    let bed = await Bed.findByPk(bedID);
    if (bed === null) {
        res.status(404).json({ msg: "The bed does not exist" })
        return;
    }

    if (bed.IPDAdmissionId !== null) {
        res.status(400).json({ msg: "Bed is not empty" });
        return;
    }

    await bed.destroy();

    res.sendStatus(204);
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const getAvailableBeds = async (req, res) => {
    const wardID = Number.parseInt(req.params.ward);
    if (!Number.isInteger(wardID)) {
        res.status(400).json({ msg: "Invalid ward id" });
        return;
    }

    res.status(200).json(await Bed.findAll({ where: { WardId: wardID, occupied: false }, include: Ward }));
}


module.exports = { getAvailableBeds, getBeds, createBed, deleteBed }