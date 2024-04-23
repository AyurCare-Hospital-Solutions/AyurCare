const express = require("express");
const yup = require("yup");
const ManufactureRequest = require("../../model/MedicineMaterial");
const Medicine = require("../../model/Medicine");
const Material = require("../../model/Material");
const MedicineMaterial = require("../../model/MedicineMaterial");
const { Sequelize } = require("sequelize");


const requestValidator = yup.object({
    medicineId: yup.number().required(),
    materials: yup.array(yup.object({
        itemId : yup.number().integer().required(),
        amount : yup.number().integer().min(1).max(500).required(),
    })).required(),
}).strict().noUnknown();



//FIND ALL MATERIALS AND MMEDICINES FUNCTION
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 */
async function getMedicineMaterials(req, res) {
    res.status(200).json(await MedicineMaterial.findAll({include:[Medicine, Material]}));
}


//CREATE FUNCTION
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
async function createMedicineMaterials(req, res) {
    try {
        var data = await requestValidator.validate(req.body);
    } catch (validationError) {
        res.status(400).send({ msg: validationError.errors[0] });
        return;
    }

    let medicine = await Medicine.findByPk(data.itemId);
    if(medicine === null){
        res.status(400).json({ msg: "Invalid Medicine Id" });
        return;
    }
    
    let materials =  [];
    for (let i = 0; i < data.materials.length; i++){
        let material = await Material.findByPk(data.itemId);
        if(material === null){
            res.status(400).json({ msg: "Invalid Material Id" });
            return;
        }

        materials.push(material);
    }
    
    for (let  i = 0; i < materials.length; i++){
        await MedicineMaterial.create({amount: data.materials[i].amount, MedicineId: medicine.id, MaterialId: materials[i].id})
    }
    

    res.status(200).json({msg: "success"});
}


//DELETE FUNCTION
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
async function deleteMedicineMaterials(req, res) {
    let medID = Number.parseInt(req.params.id);

    // check if Request number is valid
    if (!Number.isInteger(medID)) {
        res.status(400).json({ msg: "Invalid Medicine number" });
        return;
    }

    // get the Request with the given id
    let materials = await MedicineMaterial.findAll({where:{MedicineID:medID}});
    
    if (materials.length === 0) {
        res.status(404).json({ msg: "The Medicine does not exist" })
        return;
    }

    for (let i =0; i < materials.length; i++){
        await materials[i].destroy();
    }

    res.sendStatus(204);
}

module.exports = { getMedicineMaterials, createMedicineMaterials, deleteMedicineMaterials}