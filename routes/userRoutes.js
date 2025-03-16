const express = require("express");
const {
  loginController,
  registerController,
  getDoctorsController,
  getAppointmentsController,
  getNotificationsController,
  getDoctorAppointmentsController,
  updateAppointmentStatusController,
  createAppointmentController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

//router object
const router = express.Router();

//PUBLIC ROUTES
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

//GET DOCTORS || GET
router.get("/doctors", getDoctorsController);

//PROTECTED ROUTES
//GET APPOINTMENTS || GET
router.get("/appointments", authMiddleware, getAppointmentsController);

//CREATE APPOINTMENT || POST
router.post("/appointments", authMiddleware, createAppointmentController);

//GET DOCTOR APPOINTMENTS || GET
router.get("/doctor-appointments", authMiddleware, getDoctorAppointmentsController);

//UPDATE APPOINTMENT STATUS || PUT
router.put("/appointment-status", authMiddleware, updateAppointmentStatusController);

//GET NOTIFICATIONS || GET
router.get("/notifications", authMiddleware, getNotificationsController);

module.exports = router;
