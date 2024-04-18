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
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const dischargePatient = async (req, res) => {
    let admissionID = Number.parseInt(req.params.aid);

    if (!Number.isInteger(admissionID)) {
        res.status(400).json({ msg: "Invalid admission number" });
        return;
    }

    let admission = await IPDAdmission.findByPk(admissionID);
    if (!admission) {
        res.status(400).json({ msg: "Admission does not exist" });
        return;
    }

    if (admission.discharge_date !== null) {
        res.status(400).json({ msg: "Patient has already been discharged" });
        return;
    }

    admission.discharge_date = new Date();

    await admission.save();

    res.status(204).json({ msg: "Patient discharged successfully" });
}

module.exports = { getAdmissions: getAdmittedPatients, dischargePatient }