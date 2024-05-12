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


module.exports = { getWaitList, addToWaitList };