const express = require("express")
const CarePlan = require("../../model/CarePlan");
const IPDAdmission = require("../../model/IPDAdmission");
const Patient = require("../../model/Patient");
const Bed = require("../../model/Bed");
const Ward = require("../../model/Ward");

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

module.exports = { getCarePlan }