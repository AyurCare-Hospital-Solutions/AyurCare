const express = require("express");
const router = express.Router();

const wardService = require("../systems/ICMS/wards");

router.post("/ward", wardService.createWard);
router.get("/ward", wardService.getWards);
router.get("/ward/:id", wardService.getWard);
router.put("/ward/:id", wardService.renameWard);
router.delete("/ward/:id", wardService.deleteWard);

const carePlanService = require("../systems/ICMS/careplan");

router.get("/careplan/:aid", carePlanService.getCarePlan);
router.post("/careplan/:aid", carePlanService.createCarePlan);

const nursingLogService = require("../systems/ICMS/nursinglog");

router.get("/nursinglog/:aid", nursingLogService.getNursingLog);
router.post("/nursinglog/:aid", nursingLogService.createNursingLog);

const patientAdmissions = require("../systems/ICMS/patients");
router.get("/patients", patientAdmissions.getPatients);
router.post("/patient/:aid/discharge", patientAdmissions.dischargePatient);

const waitListService = require("../systems/ICMS/waitlist");
router.get("/waitlist", waitListService.getWaitList);
router.post("/waitlist/admit/:waitID", waitListService.admitPatient);

const bedService = require("../systems/ICMS/beds");
router.get("/beds/available/:ward", bedService.getAvailableBeds);
router.get("/beds/:ward", bedService.getBeds);
router.delete("/beds/:bed", bedService.deleteBed)
router.post("/beds", bedService.createBed);

const reportService = require("../systems/ICMS/reports");
router.get("/reports", reportService.getReports)

module.exports = router;