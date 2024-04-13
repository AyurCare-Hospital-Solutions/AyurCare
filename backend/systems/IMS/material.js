const Material = require("../../model/Material");
const Item = require("../../model/Item");
const express = require("express");
const yup = require("yup");

const materialValidator = yup.object(
    {
        materialName: yup.string().required(),
        amount: yup.number().required(),
        buffer: yup.number().required(),
        unit: yup.string().required(),
    }
);

// get Material
/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const getMaterial = async (req, res) => {
    const material = await Material.findAll({
        include: Item
    });

    res.status(200).json(material);
}

// add Material
/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const addMaterial = async (req, res) => {
    try {
        var materialData = await materialValidator.validate(req.body);
    }
    catch (validationError) {
        res.status(400).json({ msg: validationError.errors[0] });
        return;
    }

    let item = await Item.create({ name: materialData.materialName, reOrderBuffer: materialData.buffer, unit: materialData.unit });
    let material = await Material.create({ amount: materialData.amount, ItemId: item.id });
    res.status(200).json({ data: { material, item } });
}

// update material
/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const updateMaterial = async (req, res) => {
    // get id from route params
    let id = Number.parseInt(req.params.id);

    // check if ward number is valid
    if (!Number.isInteger(id)) {
        res.status(400).json({ msg: "Invalid Material ID (format error)" });
        return;
    }
    //validate req body 
    try {
        var materialData = await materialValidator.validate(req.body);
    }
    catch (validationError) {
        res.status(400).json({ msg: validationError.errors[0] });
        return;
    }
    // check existance of medicine
    let material = await Material.findByPk(id);
    if (material === null) {
        res.status(404).json({ msg: "The Material does not exist" });
        return;
    }

    let item = await Item.findByPk(material.ItemId);

    await item.update({ name: materialData.materialName, reOrderBuffer: materialData.buffer, unit: materialData.unit });
    await material.update({ amount: (Number(material.amount) + Number(materialData.amount)) }); //need to recheck
    res.status(200).json({ item, material });
}

// delete material
/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const deleteMaterial = async (req, res) => {
    let id = req.body.id;

    // validate id format
    if (!Number.isInteger(id)) {
        res.status(400).json({ msg: "Invalid Material ID (format error)" });
        return;
    }

    // check existance of medicine
    let material = await Material.findByPk(id);
    let item = await material.getItem();
    if (material === null) {
        res.status(404).json({ msg: "The Material does not exist" });
        return;
    }
    await item.destroy();
    res.sendStatus(204);
}

module.exports = {
    getMaterial,
    addMaterial,
    updateMaterial,
    deleteMaterial,
}
