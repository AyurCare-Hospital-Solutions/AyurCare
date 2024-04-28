const express = require("express");
const router = express.Router();

const staffService = require("../systems/ACS/staff");
const reportService = require("../systems/ACS/reports");


router.get("/reports", reportService.generateReportData)
// Route to get all staff members
router.get("/staff", staffService.getAllStaff);

//Route to get staff by id
router.get("/staff/:id", staffService.getStaffById)

// Route to add a new staff member
router.post("/staff", staffService.addStaff);

// Route to update a staff member by ID
router.put("/staff/:id", staffService.updateStaff);

// Route to delete a staff member by ID
router.delete("/staff/:id", staffService.deleteStaff);

module.exports = router;
