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


/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const addAccessory = async (req, res) => {
    try {
        const accessoryData = await accessoryValidator.validate(req.body);
    }
    catch (validationError) {
        res.status(400).json({ msg: validationError.errors[0] })
    }
    let item = await Item.create({ name: accessoryValidator.accessoryName, reOrderbuffer: accessoryValidator.buffer, unit: accessoryValidator.unit })
    let accessory = await Accessory.create({ amout: accessoryValidator.amount, ItemID: item.id });

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
        res.status(400).json({ msg: "Invalid accessory d" });
        return;
    }

    // validate request body
    try {
        const accessoryData = await accessoryValidator.validate(req.body);
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
    item = await item.update({ name: accessoryValidator.accessoryName, reOrderbuffer: accessoryValidator.buffer, unit: accessoryValidator.unit });
    accessory = await accessory({amount : accessoryValidator.amount});

    res.status(200).json(accessory,item);
}