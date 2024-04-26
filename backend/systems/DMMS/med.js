const express = require("express");
const yup = require("yup");
const ManufactureRequest = require("../../model/ManufactureRequest");
const Medicine = require("../../model/Medicine");
const Item = require("../../model/Item");


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
    res.status(200).json(await ManufactureRequest.findAll({ include: { model: Medicine, include: Item } }));
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


async function updateRequest(req, res) {
    // get id from route params
    let id = Number.parseInt(req.params.id);
    // get status
    const progress = req.body.progress;

    // check if medicine number is valid
    if (!Number.isInteger(id)) {
        res.status(400).json({ msg: "Invalid Manufacture request ID (format error)" });
        return;
    }

    // check exsistance of medicine request
    let manufactureRequest = await ManufactureRequest.findByPk(id);
    if (manufactureRequest === null) {
        res.status(404).json({ msg: "The Medicine Request does not exist" });
        return;
    }
    // update request
    await manufactureRequest.update({ progress: progress });

    res.status(200).json(manufactureRequest);
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */


async function deleteRequest(req, res) {
    let id = Number.parseInt(req.params.id);

    // check if Request number is valid
    if (!Number.isInteger(id)) {
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

module.exports = { getRequests, createRequest, updateRequest, deleteRequest }
