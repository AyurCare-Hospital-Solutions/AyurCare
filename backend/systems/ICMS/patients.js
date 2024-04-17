const express = require("express")
const IPDAdmission = require("../../model/IPDAdmission");
const Patient = require("../../model/Patient");
const Bed = require("../../model/Bed");
const Ward = require("../../model/Ward");


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const getAdmittedPatients = async (req, res) => {
    res.status(200).json(await IPDAdmission.findAll({
        where: { discharge_date: null },
        include: [
            {
                model: Patient,
            },
            {
                model: Bed,
                include: {
                    model: Ward,
                }
            }
        ]
    }));
}

module.exports = { getAdmissions: getAdmittedPatients }