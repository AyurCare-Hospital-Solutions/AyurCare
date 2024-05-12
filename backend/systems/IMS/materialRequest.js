const express = require('express');
const yup = require('yup');
const MaterialRequest = require('../../model/MaterialRequest');
const Material = require('../../model/Material');
const Item = require('../../model/Item');

const materialRequestValidator = yup.object({
    materialId: yup.number().required(),
    amount: yup.number().required().min(1),
});

// get material requests
/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const getMaterialRequests = async (req, res) => {
    const materialRequests = await MaterialRequest.findAll({
        include: {
            model: Material,
            include: Item
        }
    });
    res.status(200).json(materialRequests);
}

// add material request
/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const addMaterialRequest = async (req, res) => {
    try {
        var materialRequestData = await materialRequestValidator.validate(req.body);
    }
    catch (validationError) {
        res.status(400).json({ msg: validationError.errors[0] });
        return;
    }

    const materialRequest = await MaterialRequest.create({ MaterialId: materialRequestData.materialId, amount: materialRequestData.amount });

    res.status(200).json(materialRequest);
}

// update material request
/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const updateMaterialRequest = async (req, res) => {
    // get id from route params
    let id = Number.parseInt(req.params.id);
    // get status
    const status = req.body.status;

    // check if medicine number is valid
    if (!Number.isInteger(id)) {
        res.status(400).json({ msg: "Invalid Medicine request ID (format error)" });
        return;
    }

    // check exsistance of material request
    let materialRequest = await MaterialRequest.findByPk(id);
    if (materialRequest == null) {
        res.status(404).json({ msg: "The Material Request does not exist" });
        return;
    }
    // update
    materialRequest = await materialRequest.update({ status: status });
    res.status(200).json(materialRequest);
}

// delete material request
/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const deleteMaterialRequest = async (req, res) => {
    // get id from route params
    const id = Number.parseInt(req.params.id);
    // validate id format
    if (!Number.isInteger(id)) {
        res.status(400).json({ msg: "Invalid Medicine Request ID (format error)" });
        return;
    }
    // check existance
    var materialRequest = await MaterialRequest.findByPk(id);
    if (materialRequest == null) {
        res.status(404).json({ msg: "The Material Request does not exist" });
        return;
    }
    // delete 
    await materialRequest.destroy();
    res.sendStatus(203);
}

module.exports = {
    getMaterialRequests,
    addMaterialRequest,
    updateMaterialRequest,
    deleteMaterialRequest,
}