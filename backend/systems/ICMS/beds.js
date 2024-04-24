const Ward = require("../../model/Ward");
const express = require("express");
const yup = require("yup");
const Bed = require("../../model/Bed");


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

    res.status(200).json(await Bed.findAll({ where: { WardId: wardID, IPDAdmissionId: null }, include: Ward }));
}


module.exports = { getAvailableBeds }