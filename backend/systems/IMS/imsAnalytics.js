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
const medicineLotGroups = async (req, res) => {
    const [medicineGroup, metadata] = await sequelize.query(`
        SELECT ML.MedicineId, I.name, COUNT(*) AS count  
        FROM medicinelots ML , medicines M , items I 
        WHERE ML.MedicineID = M.id AND M.ItemId = I.id 
        GROUP BY MedicineId; 
    `);

    res.status(200).json(medicineGroup);
}

// get medicine stock analysis 
/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const medicineStockLevel = async (req, res) => {
    const [expiredStock, metadata1] = await sequelize.query(`
        SELECT COUNT(*) count
        FROM medicinelots
        WHERE expire_date <= CURDATE()
    `);
    const [outOfStock, metadata2] = await sequelize.query(`
        SELECT COUNT(*) AS count
        FROM medicinelots 
        WHERE amount = 0
    `)
    const [otherStock, metadata3] = await sequelize.query(`
        SELECT COUNT(*) AS count
        FROM medicinelots 
        WHERE amount != 0 AND expire_date > CURDATE()
    `)
    const [totalLot, metadata4] = await sequelize.query(`
        SELECT COUNT(*) AS count
        FROM medicinelots
    `)

    res.status(200).json({ expiredStock, outOfStock, otherStock, totalLot });
}

// get material groups 
/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const materialGroups = async (req, res) => {
    const [materialGroup, metadata] = await sequelize.query(`
        SELECT I.unit , COUNT(*) AS count
        FROM materials M , items I
        WHERE M.ItemId = I.id
        GROUP BY I.unit
    `);

    res.status(200).json(materialGroup);
}

// get material stock analysis 
/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const materialStockLevel = async (req, res) => {
    const [reOrderLevelReached, metadata1] = await sequelize.query(`
        SELECT COUNT(*) AS count
        FROM materials M, items I
        WHERE M.ItemId = I.id AND I.reOrderBuffer >= M.amount AND M.amount > 0 
    `);
    const [outOfStock, metadata2] = await sequelize.query(`
        SELECT COUNT(*) AS count
        FROM materials
        WHERE amount = 0
    `);
    const [otherStock, metadata3] = await sequelize.query(`
        SELECT COUNT(*) AS count
        FROM materials M, items I
        WHERE M.ItemId = I.id AND I.reOrderBuffer < M.amount
    `);
    const [totalLOt, metadata4] = await sequelize.query(`
        SELECT COUNT(*) AS count
        FROM materials 
    `)

    res.status(200).json({ reOrderLevelReached, outOfStock, otherStock, totalLOt });
}

// get accssory groups
/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const accessoryGroups = async (req, res) => {
    const [accessoryGroup, metadata] = await sequelize.query(`
        SELECT I.unit, COUNT(*) AS count
        FROM accessories A, items I
        WHERE A.ItemId = I.id
        GROUP BY I.unit
    `);

    res.status(200).json(accessoryGroup);
}

// get accssory Stock level
/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const accessoryStockLevel = async (req, res) => {
    const [reOrderLevelReached, metadata1] = await sequelize.query(`
        SELECT COUNT(*) AS count
        FROM accessories A, items I
        WHERE A.ItemId = I.id AND I.reOrderBuffer >= A.amount AND A.amount > 0 
    `);
    const [outOfStock, metadata2] = await sequelize.query(`
        SELECT COUNT(*) AS count
        FROM accessories 
        WHERE amount = 0
    `);
    const [otherStock, metadata3] = await sequelize.query(`
        SELECT COUNT(*) AS count
        FROM accessories A, items I
        WHERE A.ItemId = I.id AND I.reOrderBuffer < A.amount
    `);
    const [totalLOt, metadata4] = await sequelize.query(`
        SELECT COUNT(*) AS count
        FROM accessories 
    `)

    res.status(200).json({ reOrderLevelReached, outOfStock, otherStock, totalLOt });
}

module.exports = {
    totalCounts,
    medicineLotGroups,
    medicineStockLevel,
    materialGroups,
    materialStockLevel,
    accessoryGroups,
    accessoryStockLevel,
}