const express = require("express");
const router = express.Router();

const leaveService = require("../systems/HRMS/leaves");
router.get("/leave", leaveService.getAllLeaveRequests);
router.get("/leave/:id", leaveService.getLeaveRequestById);
router.post("/leave", leaveService.createLeaveRequest);
router.put("/leave/:id", leaveService.updateLeaveRequest);
router.delete("/leave/:id", leaveService.deleteLeaveRequest);

module.exports = router;
