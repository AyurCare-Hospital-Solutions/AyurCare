const express = require("express");
const IPDWaitList = require("../../model/IPDWaitList");
const Patient = require("../../model/Patient");
const IPDAdmission = require("../../model/IPDAdmission");
const Bed = require("../../model/Bed");
const { sequelize } = require("../../model");
const { Op } = require("sequelize");

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
    const bed = await Bed.findOne({ where: { id: bedId, IPDAdmissionId: null } });
    if (!bed) {
        res.status(404).json({ msg: "Bed not found" });
        return;
    }

    await sequelize.transaction(async t => {
        let admission = await IPDAdmission.create({
            BedId: bed.id,
            PatientId: waitList.Patient.id,
        }, { transaction: t });


        await bed.update({ IPDAdmissionId: admission.id }, { transaction: t });
        await waitList.update({ was_admitted: true }, { transaction: t });
    });

    res.sendStatus(204);
}

module.exports = { getWaitList, admitPatient };