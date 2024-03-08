const Ward = require("../../model/ward");
const express = require("express");

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
    let name = req.query.name;
    // TODO: validate name

    await Ward.create({ name: name });
    res.status(200).json({ ok: true, msg: "Ward created successfully" });
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
async function renameWard(req, res) {
    let id = req.params.id;
    let name = req.body.name;
    // TODO: validate


    let ward = await Ward.findByPk(id);
    if (ward === null) {
        res.status(404).json({ ok: false, msg: "The ward does not exist" })
        return;
    }

    ward.name = name;
    await ward.save();
    res.status(200).json({ ok: true, msg: "Ward renamed successfully" });
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
async function deleteWard(req, res) {
    let id = req.params.id;
    // TODO: validate

    let ward = await Ward.findByPk(id);
    if (ward === null) {
        res.status(404).json({ ok: false, msg: "The ward does not exist" })
        return;
    }

    await ward.destroy();
    res.status(200).json({ ok: true, msg: "Ward deleted successfully" });
}

module.exports = { create: createWard, get: getWards, renameWard: renameWard, delete: deleteWard }