const express = require('express');
const {
    listDoctors,
    getDoctorAvailability,
    requestAppointment,
    checkAppointmentStatus
} = require('../controllers/apiController');

const router = express.Router();

// GET /api/doctors - List doctors (filter by specialty optional)
router.get('/doctors', listDoctors);

// GET /api/doctors/:doctorId/availability - Get doctor availability
router.get('/doctors/:doctorId/availability', getDoctorAvailability);

// POST /api/appointments - Request a new appointment
router.post('/appointments', requestAppointment);

// GET /api/appointments/:appointmentId/status - Check appointment status
router.get('/appointments/:appointmentId/status', checkAppointmentStatus);

module.exports = router; 