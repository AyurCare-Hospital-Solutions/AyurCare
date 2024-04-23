const express = require("express");
const NursingLog = require("../../model/NursingLog");
const IPDAdmission = require("../../model/IPDAdmission");
const yup = require("yup");
const Staff = require("../../model/Staff");

// TODO: allow editing/deleting ?

const nursingLogValidator = yup.object({
    note: yup.string().min(2).max(500).required()
}).strict().noUnknown();

/**
 *  gets the nursing log for the admission
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const getNursingLog = async (req, res) => {
    let admissionID = Number.parseInt(req.params.aid);

    if (!Number.isInteger(admissionID)) {
        res.status(400).json({ msg: "Invalid admission number" });
        return;
    }

    let logs = await NursingLog.findAll({
        where: { IPDAdmissionId: admissionID }, include: {
            model: Staff,
            attributes: ["name"]
        }
    });
    res.status(200).json(logs);
}

/**
 *  creates a new nursing log
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const createNursingLog = async (req, res) => {
    let admissionID = Number.parseInt(req.params.aid);

    if (!Number.isInteger(admissionID)) {
        res.status(400).json({ msg: "Invalid admission number" });
        return;
    }



    try {
        var data = await nursingLogValidator.validate(req.body);
    } catch (validationError) {
        res.status(400).send({ msg: validationError.errors[0] });
        return;
    }

    // TODO: add staff info
    data.staffID = 1;

    let admission = await IPDAdmission.findByPk(admissionID);
    if (!admission) {
        res.status(400).json({ msg: "Admission does not exist" });
        return;
    }

    let created = await NursingLog.create({ note: data.note, IPDAdmissionId: admission.id, StaffId: data.staffID });

    let note = await NursingLog.findByPk(created.id, {
        include: {
            model: Staff,
            attributes: ["name"]
        }
    });
    res.status(200).json(note.toJSON());
}

module.exports = { getNursingLog, createNursingLog }