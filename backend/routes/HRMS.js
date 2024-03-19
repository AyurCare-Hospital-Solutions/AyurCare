const express = require("express");
const leaveRoutes = require("../systems/HRMS/leave");
const router = express.Router();

router.get("/leave", leaveRoutes.getAllLeaveRequests);
router.get("/leave/:id", leaveRoutes.getLeaveRequest);
router.post("/leave", leaveRoutes.createLeaveRequest);
router.put("/leave/:id", leaveRoutes.updateLeaveRequest);
router.delete("/leave/:id", leaveRoutes.deleteLeaveRequest);

module.exports = router;
