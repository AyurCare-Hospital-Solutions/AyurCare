const express = require("express");
const yup = require("yup");
const ManufactureRequest = require("../../model/ManufactureRequest");
const Medicine = require("../../model/Medicine");


const requestValidator = yup.object({
    amount: yup.number().integer().min(1).max(500).required(),
    isPriority: yup.boolean().required(),
    MedicineId: yup.number().integer().required(),

}).strict().noUnknown();

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */


async function getRequests(req, res) {
    res.status(200).json(await ManufactureRequest.findAll());
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */


async function createRequest(req, res) {
    try {
        var data = await requestValidator.validate(req.body);
    } catch (validationError) {
        res.status(400).send({ msg: validationError.errors[0] });
        return;
    }

    let medicine = await Medicine.findByPk(data.MedicineId);
    if (medicine === null) {
        res.status(400).json({ msg: "Invalid Medicine Id" });
        return;
    }

    let requ = await ManufactureRequest.create({
        amount: data.amount,
        isPriority: data.isPriority,
        MedicineId: data.MedicineId
    })

    res.status(200).json({ data: requ.toJSON() });
}


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */


async function deleteRequest(req, res) {
    let reqId = Number.parseInt(req.params.id);

    // check if Request number is valid
    if (!Number.isInteger(reqId)) {
        res.status(400).json({ msg: "Invalid Request number" });
        return;
    }

    // get the Request with the given id
    let request = await ManufactureRequest.findByPk(id);
    if (request === null) {
        res.status(404).json({ msg: "The Request does not exist" })
        return;
    }

    await request.destroy();
    res.sendStatus(204);
}

module.exports = { getRequests, createRequest, deleteRequest }
