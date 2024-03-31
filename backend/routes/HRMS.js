const express = require("express");
const router = express.Router();

const leaveService = require("../systems/HRMS/leaves");
const leaveTypeService = require("../systems/HRMS/leaveType");

router.get("/leave", leaveService.getAllLeaveRequests);
router.get("/leave/:id", leaveService.getLeaveRequestById);
router.post("/leave", leaveService.createLeaveRequest);
router.put("/leave/:id", leaveService.updateLeaveRequest);
router.delete("/leave/:id", leaveService.deleteLeaveRequest);

router.post("/leaveType", leaveTypeService.createLeaveType);

module.exports = router;
