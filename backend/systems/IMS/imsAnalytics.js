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

    const medicineGroup = await sequelize.query(`
        SELECT ML.MedicineId, I.name, COUNT(*) AS count  
        FROM medicinelots ML , medicines M , items I 
        WHERE ML.MedicineID = M.id AND M.ItemId = I.id 
        GROUP BY MedicineId; 
    `)

    console.log(medicineGroup);

    res.status(200).json({ itemCount, medicineCount, materialCount, accessoryCount });
}

const medicineLotGroups = async (req,res)=>{
    const medicineGroup = await sequelize.query(`
        SELECT ML.MedicineId, I.name, COUNT(*) AS count  
        FROM medicinelots ML , medicines M , items I 
        WHERE ML.MedicineID = M.id AND M.ItemId = I.id 
        GROUP BY MedicineId; 
    `);

    res.status(200).json(medicineGroup);
}

module.exports = {
    totalCounts,
    medicineLotGroups,
}