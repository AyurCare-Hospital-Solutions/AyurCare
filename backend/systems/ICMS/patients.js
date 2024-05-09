const express = require("express")
const IPDAdmission = require("../../model/IPDAdmission");
const Patient = require("../../model/Patient");
const Bed = require("../../model/Bed");
const Ward = require("../../model/Ward");
const { sequelize } = require("../../model");


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const getAllPatients = async (req, res) => {
    res.status(200).json(await Patient.findAll());
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const getPatients = async (req, res) => {
    let where = undefined;
    if (req.query.admitted === "true") {
        where = { discharge_date: null }
    }

    res.status(200).json(await IPDAdmission.findAll({
        where: where,
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

    let admission = await IPDAdmission.findByPk(admissionID, { include: Bed });
    if (!admission) {
        res.status(400).json({ msg: "Admission does not exist" });
        return;
    }

    if (admission.discharge_date !== null) {
        res.status(400).json({ msg: "Patient has already been discharged" });
        return;
    }

    await sequelize.transaction(async t => {
        await admission.Bed.update({ occupied: false }, { transaction: t });
        await admission.update({ discharge_date: new Date() }, { transaction: t });
    })



    res.status(204).json({ msg: "Patient discharged successfully" });
}

module.exports = { getPatients, dischargePatient, getAllPatients }