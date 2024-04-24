const express = require("express")
const CarePlan = require("../../model/CarePlan");
const IPDAdmission = require("../../model/IPDAdmission");
const Patient = require("../../model/Patient");
const Bed = require("../../model/Bed");
const Ward = require("../../model/Ward");
const yup = require("yup");

const careplanValidator = yup.object({
    condition: yup.string().min(4).max(50).required(),
    diagnosis: yup.string().min(4).max(50).required(),
    treatmentPlan: yup.string().min(4).max(1000).required(),
}).required().noUnknown();

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const getCarePlan = async (req, res) => {
    let patientID = Number.parseInt(req.params.pid);

    let admission = await IPDAdmission.findOne({
        where: {
            patientID: patientID,
            discharge_date: null,
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
        res.status(404).json({ msg: "patient is not currently admitted" })
        return;
    }


    let carePlan = await CarePlan.findOne({
        where: { IPDAdmissionId: admission.id },
        order: [["id", "DESC"]]
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
        res.status(400).send({ msg: validationError.errors[0] });
        return;
    }

    // TODO: load user id from jwt
    const userId = 1

    let plan = await CarePlan.create({
        condition: data.condition,
        diagnosis: data.diagnosis,
        treatmentPlan: data.treatmentPlan,
        IPDAdmissionId: admission.id,
        StaffId: userId,
    });

    res.status(200).json(plan);
}

module.exports = { getCarePlan, createCarePlan }