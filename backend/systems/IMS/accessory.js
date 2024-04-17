const Accessory = require("../../model/Accessory");
const express = require("express");
const yup = require("yup");
const Item = require("../../model/Item");

const accessoryValidator = yup.object(
    {
        accessoryName: yup.string().required(),
        buffer: yup.number().required(),
        unit: yup.string().required(),
        amount: yup.string().required(),
    }
)

// get accessory
/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const getAccessory = async (req, res) => {
    const accessory = await Accessory.findAll({
        include: Item
    });
    res.status(200).json(accessory);
}

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const addAccessory = async (req, res) => {
    try {
        var accessoryData = await accessoryValidator.validate(req.body);
    }
    catch (validationError) {
        res.status(400).json({ msg: validationError.errors[0] })
    }
    let item = await Item.create({ name: accessoryData.accessoryName, reOrderBuffer: accessoryData.buffer, unit: accessoryData.unit });
    let accessory = await Accessory.create({ amount: accessoryData.amount, ItemId: item.id });

    res.status(200).json({ accessory, item });
}

// update accessory
/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const updateAccessory = async (req, res) => {
    const id = Number.parseInt(req.params.id);
    // check if accessory id is valid
    if (!Number.isInteger(id)) {
        res.status(400).json({ msg: "Invalid accessory id (format)" });
        return;
    }

    // validate request body
    try {
        var accessoryData = await accessoryValidator.validate(req.body);
    }
    catch (validationError) {
        res.status(400).json({ msg: validationError.errors[0] })
    }

    // check existance of accessory
    let accessory = await Accessory.findByPk(id);
    if (accessory === null) {
        res.status(404).json({ msg: "The accessory does not exist" });
        return;
    }
    var item = await Item.findByPk(accessory.ItemId)
    // update
    item = await item.update({ name: accessoryData.accessoryName, reOrderbuffer: accessoryData.buffer, unit: accessoryData.unit });
    accessory = await accessory.update({ amount: (accessory.amount + Number(accessoryData.amount)) }); // need to recheck

    res.status(200).json({accessory, item});
}

// delete accessory
/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const deleteAccessory = async (req, res) => {
    const id = req.body.id;
    // check if accessory id is valid
    if (!Number.isInteger(id)) {
        res.status(400).json({ msg: "Invalid accessory id (format)" });
    }

    // check existance of accessory
    let accessory = await Accessory.findByPk(id);
    if (accessory === null) {
        res.status(404).json({ msg: "The accessory does not exist" });
        return;
    }
    var item = await Item.findByPk(accessory.ItemId)
    // delete
    await item.destroy();
    res.sendStatus(204);
}

module.exports = {
    getAccessory,
    addAccessory,
    updateAccessory,
    deleteAccessory,
};