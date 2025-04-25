const userModel = require('../models/userModels');
const appointmentModel = require('../models/appointmentModels');
const moment = require('moment'); // Assuming moment.js is used for date/time

// Helper function for error responses
const sendErrorResponse = (res, statusCode, message) => {
    return res.status(statusCode).json({ success: false, message });
};

// GET /api/doctors
const listDoctors = async (req, res) => {
    try {
        const { specialty } = req.query;
        const query = { userType: 'doctor' };
        if (specialty) {
            query.specialization = specialty;
        }
        const doctors = await userModel.find(query).select('-password'); // Exclude password
        res.status(200).json(doctors);
    } catch (error) {
        console.error("Error fetching doctors:", error);
        sendErrorResponse(res, 500, "Server error fetching doctors");
    }
};

// GET /api/doctors/:doctorId/availability
const getDoctorAvailability = async (req, res) => {
    try {
        const doctorId = req.params.doctorId;
        const doctor = await userModel.findById(doctorId);

        if (!doctor || doctor.userType !== 'doctor') {
            return sendErrorResponse(res, 404, "Doctor not found");
        }

        // Basic availability based on doctor's timings field (assuming format like "HH:MM-HH:MM")
        // More sophisticated logic would check existing appointments
        const availableSlots = [];
        const today = moment().startOf('day');

        // Example: Generate slots for the next 7 days based on timings
        for (let i = 0; i < 7; i++) {
            const currentDate = moment(today).add(i, 'days');
            doctor.timings.forEach(timing => {
                // This is a simplified placeholder. Real logic would parse timing ranges
                // and potentially check against existing appointments for that day.
                // Example: Assuming timings are single slots like "10:00", "11:00"
                availableSlots.push({
                    date: currentDate.format('YYYY-MM-DD'),
                    time: timing // Assuming timing is directly the available slot time
                });
            });
        }

        // Placeholder: Returning doctor's defined timings directly
        // In a real app, this needs refinement: parse timings, check against booked appointments
        // For now, we return the raw timings array as a proxy for availability
        // res.status(200).json(availableSlots);

        // Let's return the doctor's defined timings as availability for now
        // It's assumed timings represent available start times
        const availability = doctor.timings.map(time => ({
            // Assuming we show availability for today, adjust date logic as needed
            date: moment().format('YYYY-MM-DD'),
            time: time
        }));

        res.status(200).json(availability);

    } catch (error) {
        console.error("Error fetching doctor availability:", error);
        if (error.kind === 'ObjectId') {
            return sendErrorResponse(res, 400, "Invalid Doctor ID format");
        }
        sendErrorResponse(res, 500, "Server error fetching availability");
    }
};

// POST /api/appointments
const requestAppointment = async (req, res) => {
    try {
        const { patientId, doctorId, date, time, reason, symptoms } = req.body;

        // Basic validation
        if (!patientId || !doctorId || !date || !time) {
            return sendErrorResponse(res, 400, "Missing required appointment details");
        }

        // Check if doctor exists
        const doctor = await userModel.findById(doctorId);
        if (!doctor || doctor.userType !== 'doctor') {
            return sendErrorResponse(res, 404, "Doctor not found");
        }

        // Check if patient exists
        const patient = await userModel.findById(patientId);
        if (!patient || patient.userType !== 'patient') {
            return sendErrorResponse(res, 404, "Patient not found");
        }

        // TODO: Add logic to check if the requested slot is actually available
        // This would involve checking doctor.timings and existing appointments

        const newAppointment = new appointmentModel({
            patientId,
            doctorId,
            date: moment(date, 'YYYY-MM-DD').toDate(), // Ensure date format
            time,
            status: 'pending', // Initial status
            reason: reason || "",
            symptoms: symptoms || ""
        });

        await newAppointment.save();

        res.status(201).json({
            success: true,
            message: "Appointment requested successfully",
            appointmentId: newAppointment._id,
            status: newAppointment.status
        });

    } catch (error) {
        console.error("Error requesting appointment:", error);
        if (error.name === 'ValidationError') {
            return sendErrorResponse(res, 400, `Validation Error: ${error.message}`);
        }
        if (error.kind === 'ObjectId') {
            return sendErrorResponse(res, 400, "Invalid ID format used");
        }
        sendErrorResponse(res, 500, "Server error requesting appointment");
    }
};

// GET /api/appointments/:appointmentId/status
const checkAppointmentStatus = async (req, res) => {
    try {
        const appointmentId = req.params.appointmentId;
        const appointment = await appointmentModel.findById(appointmentId).select('status');

        if (!appointment) {
            return sendErrorResponse(res, 404, "Appointment not found");
        }

        res.status(200).json({ status: appointment.status });
    } catch (error) {
        console.error("Error checking appointment status:", error);
        if (error.kind === 'ObjectId') {
            return sendErrorResponse(res, 400, "Invalid Appointment ID format");
        }
        sendErrorResponse(res, 500, "Server error checking status");
    }
};

module.exports = {
    listDoctors,
    getDoctorAvailability,
    requestAppointment,
    checkAppointmentStatus
}; 