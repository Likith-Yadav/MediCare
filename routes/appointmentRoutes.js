const express = require("express");
const {
  createAppointmentController,
  getPatientAppointmentsController,
  getDoctorAppointmentsController,
  updateAppointmentStatusController
} = require("../controllers/appointmentCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

// Router object
const router = express.Router();

// Routes
// CREATE APPOINTMENT || POST
router.post("/create", authMiddleware, createAppointmentController);

// GET PATIENT APPOINTMENTS || GET
router.get("/patient", authMiddleware, getPatientAppointmentsController);

// GET DOCTOR APPOINTMENTS || GET
router.get("/doctor", authMiddleware, getDoctorAppointmentsController);

// UPDATE APPOINTMENT STATUS || PUT
router.put("/status", authMiddleware, updateAppointmentStatusController);

module.exports = router; 