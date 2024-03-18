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
    try{
        const accessoryData = await accessoryValidator.validate(req.body);
    }
    catch(validationError){
        res.status(400).json({ msg: validationError.errors[0] })
    }
    let item = await Item.create({ name: accessoryValidator.accessoryName, reOrderbuffer:accessoryValidator.buffer, unit : accessoryValidator.unit})
    let accessory = await Accessory.create({amout : accessoryValidator.amount , ItemID : item.id});

    res.status(200).json({accessory,item});
}