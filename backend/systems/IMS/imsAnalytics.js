const express = require('express');
const Item = require('../../model/Item');
const Medicine = require('../../model/Medicine');
const Material = require('../../model/Material');
const Accessory = require('../../model/Accessory');
const MedicineLot = require('../../model/MedicineLot');
const MedicineRequest = require('../../model/MedicineRequest');
const MaterialRequest = require('../../model/MaterialRequest');
const { sequelize } = require('../../model');

// get total counts 
/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const totalCounts = async (req, res) => {
    const itemCount = await Item.count();
    const medicineCount = await Medicine.count();
    const materialCount = await Material.count();
    const accessoryCount = await Accessory.count();

    res.status(200).json({ itemCount, medicineCount, materialCount, accessoryCount });
}

// get madicine groups 
/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const medicineLotGroups = async (req,res)=>{
    const [medicineGroup,metadata] = await sequelize.query(`
        SELECT ML.MedicineId, I.name, COUNT(*) AS count  
        FROM medicinelots ML , medicines M , items I 
        WHERE ML.MedicineID = M.id AND M.ItemId = I.id 
        GROUP BY MedicineId; 
    `);

    res.status(200).json(medicineGroup);
}

// get material groups 
/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const materialGroups = async (req,res)=>{
    const [materialGroup,metadata] = await sequelize.query(`
        SELECT I.unit , COUNT(*) AS count
        FROM materials M , items I
        WHERE M.ItemId = I.id
        GROUP BY I.unit
    `);

    res.status(200).json(materialGroup);
}

// get material re-Order analysis 
/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const 

module.exports = {
    totalCounts,
    medicineLotGroups,
    materialGroups,
}