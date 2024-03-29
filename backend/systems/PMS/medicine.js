const express = require("express");
const PharmacyMedicine = require("../../model/PharmacyMedicine");
const Item = require("../../model/Item");
const Medicine = require("../../model/Medicine");

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
async function getMedicines(req, res) {
        res.status(200).json(await PharmacyMedicine.findAll({include:[
        {model: Medicine, include: Item}
    ]}));
}




module.exports = {getMedicines}