const express = require("express");
const ManufactureRequest = require('../../model/ManufactureRequest');
const { sequelize } = require('../../model');

// get manufacture request analysis
/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const manufactureRequestData = async (req, res) => {
    var [completedCount, metadata1] = await sequelize.query(`
        SELECT progress, COUNT(*) AS count
        FROM manufacturerequests
        WHERE progress = 'Completed'
        GROUP BY progress
    `);
    var [rejectCount, metadata2] = await sequelize.query(`
        SELECT progress, COUNT(*) AS count
        FROM manufacturerequests
        WHERE progress = 'Rejected'
        GROUP BY progress
    `);
    var [pendingCount, metadata3] = await sequelize.query(`
        SELECT progress, COUNT(*) AS count
        FROM manufacturerequests
        WHERE progress = 'Pending'
        GROUP BY progress
    `);
    var [inprogressCount, metadata4] = await sequelize.query(`
        SELECT progress, COUNT(*) AS count
        FROM manufacturerequests
        WHERE progress = 'In Progress'
        GROUP BY progress
    `);
    var [manufactureerrorCount, metadata5] = await sequelize.query(`
        SELECT progress, COUNT(*) AS count
        FROM manufacturerequests
        WHERE progress = 'Manufacture Error'
        GROUP BY progress
    `);
    var [totalCount, metadata6] = await sequelize.query(`
        SELECT COUNT(*) AS count
        FROM manufacturerequests
    `);

    completedCount = completedCount[0] ? completedCount[0].count : 0;
    rejectCount = rejectCount[0] ? rejectCount[0].count : 0;
    pendingCount = pendingCount[0] ? pendingCount[0].count : 0;
    inprogressCount = inprogressCount[0] ? inprogressCount[0].count : 0;
    manufactureerrorCount = manufactureerrorCount[0] ? manufactureerrorCount[0].count : 0;
    totalCount = totalCount[0] ? totalCount[0].count : 0;

    res.status(200).json({ completedCount, rejectCount, pendingCount, inprogressCount, manufactureerrorCount, totalCount });
}

module.exports = { manufactureRequestData }