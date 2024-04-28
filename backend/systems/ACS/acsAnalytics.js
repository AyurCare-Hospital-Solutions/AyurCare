const Staff = require("../../model/Staff");
const express = require("express");


// get staff counts 
/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const totalCounts = async (req, res) => {
    const doctorsCount = await Staff.count();
    const ManagementCount = await Staff.count();
    const NursesCount = await Staff.count();
    const MinorStaffCount = await Staff.count();
    const AttendantCount = await Staff.count();

    res.status(200).json({ doctorsCount, ManagementCount, NursesCount, MinorStaffCount,AttendantCount });
}