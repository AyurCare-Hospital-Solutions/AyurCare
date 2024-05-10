const express = require("express");
const IPDWaitList = require("../../model/IPDWaitList");
const Patient = require("../../model/Patient");
const IPDAdmission = require("../../model/IPDAdmission");
const Bed = require("../../model/Bed");
const { sequelize } = require("../../model");
const yup = require("yup");

const waitListValidator = yup.object({
    reason: yup.string().min(4).max(100).required(),
    priority: yup.boolean().required(),
    patient: yup.number().required(),
}).strict().noUnknown();

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const getWaitList = async (req, res) => {
    res.status(200).json(await IPDWaitList.findAll({
        where: { was_admitted: false },
        include: {
            model: Patient,
            attributes: ["name", "tracking_no", "dob", "gender", "id"]
        },
    }));
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const addToWaitList = async (req, res) => {
    try {
        var data = await waitListValidator.validate(req.body)
    } catch (e) {
        res.status(400).send({ msg: e.errors[0] });
        return;
    }

    let patient = await Patient.findByPk(data.patient);
    if (!patient) {
        res.status(404).json({ msg: "patient not found" })
        return;
    }

    let created = await IPDWaitList.create({
        is_priority: data.priority,
        reason: data.reason,
        PatientId: patient.id
    })

    return res.status(200).json(await IPDWaitList.findByPk(created.id, {
        include: {
            model: Patient,
            attributes: ["name", "tracking_no", "dob", "gender", "id"]
        },
    }))
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const admitPatient = async (req, res) => {
    const waitListId = Number.parseInt(req.params.waitID);
    const bedId = Number.parseInt(req.body.bedId);

    if (!Number.isInteger(waitListId)) {
        res.status(400).json({ msg: "Invalid waitlist id" });
        return;
    }

    if (!Number.isInteger(bedId)) {
        res.status(400).json({ msg: "Invalid bed id" });
        return;
    }

    const waitList = await IPDWaitList.findByPk(waitListId, { include: Patient });
    if (!waitList) {
        res.status(404).json({ msg: "Waitlist entry not found" });
        return;
    }
    const bed = await Bed.findOne({ where: { id: bedId, occupied: false } });
    if (!bed) {
        res.status(404).json({ msg: "Bed not found" });
        return;
    }

    await sequelize.transaction(async t => {
        let admission = await IPDAdmission.create({
            BedId: bed.id,
            PatientId: waitList.Patient.id,
        }, { transaction: t });


        await bed.update({ occupied: true }, { transaction: t });
        await waitList.update({ was_admitted: true }, { transaction: t });
    });

    res.sendStatus(204);
}

module.exports = { getWaitList, admitPatient, addToWaitList };