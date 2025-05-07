const appointmentModel = require("../models/appointmentModels");
const userModel = require("../models/userModels");
const notificationModel = require("../models/notificationModels");
const moment = require("moment");

// Create appointment
const createAppointmentController = async (req, res) => {
  try {
    // User should be available from auth middleware
    if (!req.user?._id) {
      return res.status(200).send({
        success: false,
        message: "User not authenticated"
      });
    }
    
    // Check if user is a patient
    if (req.user.userType !== 'patient') {
      return res.status(200).send({
        success: false,
        message: "Only patients can book appointments"
      });
    }
    
    const { doctorId, date, time, reason, symptoms } = req.body;
    
    if (!doctorId || !date || !time) {
      return res.status(200).send({
        success: false,
        message: "Doctor ID, date, and time are required"
      });
    }
    
    // Check if doctor exists
    const doctor = await userModel.findOne({ _id: doctorId, userType: 'doctor' });
    if (!doctor) {
      return res.status(200).send({
        success: false,
        message: "Doctor not found"
      });
    }
    
    // Check if doctor is available
    if (doctor.isAvailable === false) {
      return res.status(200).send({
        success: false,
        message: "Doctor is not available for appointments"
      });
    }
    
    // Check if the appointment slot is available
    const existingAppointment = await appointmentModel.findOne({
      doctorId,
      date: new Date(date),
      time,
      status: { $in: ['pending', 'approved'] }
    });
    
    if (existingAppointment) {
      return res.status(200).send({
        success: false,
        message: "This appointment slot is already booked"
      });
    }
    
    // Create appointment
    const appointment = await appointmentModel.create({
      doctorId,
      patientId: req.user._id,
      date,
      time,
      status: 'pending',
      reason: reason || '',
      symptoms: symptoms || '',
      fee: doctor.feePerConsultation
    });
    
    // Create notification for doctor
    await notificationModel.create({
      userId: doctorId,
      title: 'New Appointment Request',
      message: `You have a new appointment request from ${req.user.name} on ${moment(date).format('MMMM Do, YYYY')} at ${time}.`,
      read: false,
      type: 'appointment',
      relatedTo: appointment._id
    });
    
    res.status(201).send({
      success: true,
      message: "Appointment booked successfully",
      data: appointment
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while booking appointment",
      error
    });
  }
};

// Get patient appointments
const getPatientAppointmentsController = async (req, res) => {
  try {
    // User should be available from auth middleware
    if (!req.user?._id) {
      return res.status(200).send({
        success: false,
        message: "User not authenticated",
        data: []
      });
    }
    
    const appointments = await appointmentModel
      .find({ patientId: req.user._id })
      .populate('doctorId', 'name specialization phone email')
      .sort({ date: -1, time: -1 });
    
    res.status(200).send({
      success: true,
      message: "Appointments Fetched Successfully",
      data: appointments || [],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching appointments",
      error,
    });
  }
};

// Get doctor appointments
const getDoctorAppointmentsController = async (req, res) => {
  try {
    // User should be available from auth middleware
    if (!req.user?._id) {
      return res.status(200).send({
        success: false,
        message: "User not authenticated",
        data: []
      });
    }
    
    // Check if user is a doctor
    if (req.user.userType !== 'doctor') {
      return res.status(200).send({
        success: false,
        message: "Not authorized as doctor",
        data: []
      });
    }
    
    const appointments = await appointmentModel
      .find({ doctorId: req.user._id })
      .populate('patientId', 'name email phone dateOfBirth')
      .sort({ date: -1, time: -1 });
    
    res.status(200).send({
      success: true,
      message: "Doctor Appointments Fetched Successfully",
      data: appointments || [],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching doctor appointments",
      error,
    });
  }
};

// Update appointment status
const updateAppointmentStatusController = async (req, res) => {
  try {
    // User should be available from auth middleware
    if (!req.user?._id) {
      return res.status(200).send({
        success: false,
        message: "User not authenticated"
      });
    }
    
    // Check if user is a doctor
    if (req.user.userType !== 'doctor') {
      return res.status(200).send({
        success: false,
        message: "Not authorized as doctor"
      });
    }
    
    const { appointmentId, status, diagnosis, prescription, followUp, notes } = req.body;
    
    if (!appointmentId || !status) {
      return res.status(200).send({
        success: false,
        message: "Appointment ID and status are required"
      });
    }
    
    // Prepare update data
    const updateData = { status };
    
    // Add optional fields if provided
    if (diagnosis) updateData.diagnosis = diagnosis;
    if (prescription) updateData.prescription = prescription;
    if (followUp) updateData.followUp = followUp;
    if (notes) updateData.notes = notes;
    
    // If status is completed, mark as paid
    if (status === 'completed') {
      updateData.isPaid = true;
    }
    
    const appointment = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      updateData,
      { new: true }
    ).populate('patientId', 'name');
    
    if (!appointment) {
      return res.status(200).send({
        success: false,
        message: "Appointment not found"
      });
    }
    
    // Create notification for patient
    if (appointment.patientId) {
      await notificationModel.create({
        userId: appointment.patientId._id,
        title: `Appointment ${status}`,
        message: `Your appointment on ${moment(appointment.date).format('MMMM Do, YYYY')} at ${appointment.time} has been ${status} by the doctor.`,
        read: false,
        type: 'appointment',
        relatedTo: appointment._id,
        priority: status === 'rejected' ? 'high' : 'medium'
      });
    }
    
    res.status(200).send({
      success: true,
      message: `Appointment ${status} successfully`,
      data: appointment
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating appointment status",
      error
    });
  }
};

module.exports = {
  createAppointmentController,
  getPatientAppointmentsController,
  getDoctorAppointmentsController,
  updateAppointmentStatusController
};