const express = require("express")
const CarePlan = require("../../model/CarePlan");
const IPDAdmission = require("../../model/IPDAdmission");
const Patient = require("../../model/Patient");
const Bed = require("../../model/Bed");
const Ward = require("../../model/Ward");
const yup = require("yup");
const { getUserID } = require("../../middleware/auth");

const careplanValidator = yup.object({
    id: yup.number().nullable(),
    condition: yup.string().min(4).max(100).required(),
    diagnosis: yup.string().min(4).max(100).required(),
    treatmentPlan: yup.string().min(4).max(1000).required(),
}).required().noUnknown();

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const getCarePlan = async (req, res) => {
    let admissionId = Number.parseInt(req.params.aid);

    if (!Number.isInteger(admissionId)) {
        res.status(400).json({ msg: "Invalid care plan id" })
    }

    let admission = await IPDAdmission.findOne({
        where: {
            id: admissionId
        },
        include: [{
            model: Patient,
            attributes: ["name", "tracking_no", "dob", "gender", "id"]
        },
        {
            model: Bed,
            include: Ward
        }]
    });

    if (admission === null) {
        res.status(404).json({ msg: "admission not found" })
        return;
    }


    let carePlan = await CarePlan.findOne({
        where: { IPDAdmissionId: admission.id },
    })

    res.status(200).json({ admission, carePlan })
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const createCarePlan = async (req, res) => {
    const admissionID = Number.parseInt(req.params.aid);
    if (!Number.isInteger(admissionID)) {
        res.status(400).json({ msg: "Invalid admission number" });
        return;
    }

    const admission = await IPDAdmission.findByPk(admissionID);
    if (admission == null) {
        res.status(404).json({ msg: "patient is not currently admitted" })
        return;
    }

    try {
        var data = await careplanValidator.validate(req.body)
    } catch (e) {
        res.status(400).send({ msg: e.errors[0] });
        return;
    }

    const userId = getUserID(res);

    if (data.id) {
        var plan = await CarePlan.findOne({ where: { IPDAdmissionId: admission.id } });
        if (plan === null) {
            res.status(404).json({ msg: "care plan not found" })
            return;
        }
        await plan.update({
            condition: data.condition,
            diagnosis: data.diagnosis,
            treatmentPlan: data.treatmentPlan,
        })
    } else {
        var plan = await CarePlan.create({
            condition: data.condition,
            diagnosis: data.diagnosis,
            treatmentPlan: data.treatmentPlan,
            IPDAdmissionId: admission.id,
            StaffId: userId,
        });
    }


    res.status(200).json(plan);
}

module.exports = { getCarePlan, createCarePlan }