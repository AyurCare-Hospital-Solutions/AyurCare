const express = require("express");
const router = express.Router();

const leaveService = require("../systems/HRMS/leaves");
const leaveTypeService = require("../systems/HRMS/leaveType");
const reportService = require("../systems/HRMS/reports");
const shiftService = require("../systems/HRMS/shift")
const shiftTypeService = require("../systems/HRMS/shiftTypes")

router.get("/leave", leaveService.getAllLeaveRequests);

router.put("/leave/approve/:id", leaveService.updateLeaveRequestStatus);
router.get("/leave/user", leaveService.getLeaveRequestByUser);
router.get("/leave/:id", leaveService.getLeaveRequestById);
router.post("/leave", leaveService.createLeaveRequest);
router.put("/leave/:id", leaveService.updateLeaveRequest);
router.delete("/leave/:id", leaveService.deleteLeaveRequest);

router.post("/leaveType", leaveTypeService.createLeaveType);
router.get("/leaveType", leaveTypeService.getAllLeaveTypes);
router.get("/leaveType/:id", leaveTypeService.getLeaveTypeById);
router.delete("/leaveType/:id", leaveTypeService.deleteLeaveType);
router.put("/leaveType/:id", leaveTypeService.updateLeaveType);

router.get("/shift/employee/my", shiftService.getAllShiftsByEmpId);
router.get("/shift", shiftService.getAllShifts);
router.post("/shift", shiftService.createShift);
router.get("/shift/:id", shiftService.getShiftById);
router.put("/shift/:id", shiftService.updateShift);
router.delete("/shift/:id", shiftService.deleteShift);

router.get("/employees", shiftService.getAllEmployees)


router.get("/shiftType", shiftTypeService.getAllShiftTypes)
router.get("/shiftType/:id", shiftTypeService.getShiftTypeById)
router.post("/shiftType", shiftTypeService.createShiftType)
router.put("/shiftType/:id", shiftTypeService.updateShiftType)
router.delete("/shiftType/:id", shiftTypeService.deleteShiftType)


router.get("/reports", reportService.generateReportData);

module.exports = router;
