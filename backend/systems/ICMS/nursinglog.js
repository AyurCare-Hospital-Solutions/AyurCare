const express = require("express")
const NursingLog = require("../../model/NursingLog");
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const getNursingLog = async (req, res) => {
    let admissionID = Number.parseInt(req.params.aid);

    let logs = await NursingLog.findAll({ where: { IPDAdmissionId: admissionID } });
    res.status(200).json(logs);
}

module.exports = { getNursingLog }