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
router.get("/leaveType", leaveTypeService.getAllLeaveTypes);
router.get("/leaveType/:id", leaveTypeService.getLeaveTypeById);
router.delete("/leaveType/:id", leaveTypeService.deleteLeaveType);
router.put("/leaveType/:id", leaveTypeService.updateLeaveType);

module.exports = router;
