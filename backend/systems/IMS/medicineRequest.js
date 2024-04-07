const express = require("express");
const yup = require("yup");
const MedicineRequest = require("../../model/MedicineRequest");
const Medicine = require("../../model/Medicine");
const Item = require("../../model/Item");

const medicineRequestValidator = yup.object(
    {
        medicineId: yup.number().required(),
        amount: yup.number().required().min(1),
    }
);

// get medicine requests
/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const getMedicineRequests = async (req, res) => {
    const medicineRequests = await MedicineRequest.findAll(
        {
            include: {
                model: Medicine,
                include: Item
            }
        }
    );
    res.status(200).json(medicineRequests);
}


// add medicine request
/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const addMeicicneRequest = async (req, res) => {
    try {
        var medicineRequestData = await medicineRequestValidator.validate(req.body);
    }
    catch (validationError) {
        res.status(400).json({ msg: validationError.errors[0] });
        return;
    }

    let medicineRequest = await MedicineRequest.create({ amount: medicineRequestData.amount, MedicineId: medicineRequestData.medicineId });

    res.status(200).json(medicineRequest);
}

// update medicine request
/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const updateMedicineRequest = async (req, res) => {
    // get id from route params
    let id = Number.parseInt(req.params.id);
    // get status
    const status = req.body.status;

    // check if medicine number is valid
    if (!Number.isInteger(id)) {
        res.status(400).json({ msg: "Invalid Medicine request ID (format error)" });
        return;
    }

    // check exsistance of medicine request
    let medicineRequest = await MedicineRequest.findByPk(id);
    if (medicineRequest === null) {
        res.status(404).json({ msg: "The Medicine Request does not exist" });
        return;
    }
    // update request
    medicineRequest = await medicineRequest.update({ status: status });

    res.status(200).json(medicineRequest);
}

// delete medicine request
/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const deleteMedicneRequest = async (req, res) => {
    // get id from route params
    const id = Number.parseInt(req.params.id);
    // validate id format
    if (!Number.isInteger(id)) {
        res.status(400).json({ msg: "Invalid Medicine Request ID (format error)" });
        return;
    }
    // check existance
    var medicineRequest = await MedicineRequest.findByPk(id);
    if (medicineRequest === null) {
        res.status(404).json({ msg: "The Medicine Request does not exist" });
        return;
    }
    // delete medicine request 
    await medicineRequest.destroy();
    res.sendStatus(203);
}


module.exports = {
    getMedicineRequests,
    addMeicicneRequest,
    updateMedicineRequest,
    deleteMedicneRequest,
}