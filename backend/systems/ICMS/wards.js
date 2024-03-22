const Ward = require("../../model/Ward");
const express = require("express");
const yup = require("yup");

const wardValidator = yup.object({
    name: yup.string().min(2).max(100).required()
}).strict().noUnknown();

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
async function getWards(req, res) {
    res.status(200).json(await Ward.findAll());
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
async function createWard(req, res) {
    try {
        var data = await wardValidator.validate(req.body);
    } catch (validationError) {
        res.status(400).send({ msg: validationError.errors[0] });
        return;
    }

    let ward = await Ward.create({ name: data.name });
    res.status(200).json(ward.toJSON());
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
async function renameWard(req, res) {
    let id = Number.parseInt(req.params.id);

    // check if ward number is valid
    if (!Number.isInteger(id)) {
        res.status(400).json({ msg: "Invalid ward number" });
        return;
    }

    // validate request body
    try {
        var data = await wardValidator.validate(req.body);
    } catch (validationError) {
        res.status(400).send({ msg: validationError.errors[0] });
        return;
    }

    // get the ward with the given id
    let ward = await Ward.findByPk(id);
    if (ward === null) {
        res.status(404).json({ msg: "The ward does not exist" })
        return;
    }

    await ward.update({ name: data.name });
    res.sendStatus(204);
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
async function deleteWard(req, res) {
    let id = Number.parseInt(req.params.id);

    // check if ward number is valid
    if (!Number.isInteger(id)) {
        res.status(400).json({ msg: "Invalid ward number" });
        return;
    }

    // get the ward with the given id
    let ward = await Ward.findByPk(id);
    if (ward === null) {
        res.status(404).json({ msg: "The ward does not exist" })
        return;
    }

    await ward.destroy();
    res.sendStatus(204);
}

module.exports = { createWard, getWards, renameWard, deleteWard }