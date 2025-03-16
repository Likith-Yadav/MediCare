const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const appointmentModel = require("../models/appointmentModels");
const notificationModel = require("../models/notificationModels");
const moment = require("moment");

//register callback
const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exists", success: false });
    }
    
    // Validate required fields based on user type
    const { userType, name, email, password, phone } = req.body;
    
    if (!userType || !name || !email || !password || !phone) {
      return res.status(200).send({
        message: "Please provide all required fields",
        success: false
      });
    }
    
    // Validate doctor-specific fields
    if (userType === 'doctor') {
      const { specialization, experience, feePerConsultation, timings } = req.body;
      if (!specialization || !experience || !feePerConsultation || !timings) {
        return res.status(200).send({
          message: "Please provide all required doctor fields",
          success: false
        });
      }
    }
    
    // Validate patient-specific fields
    if (userType === 'patient') {
      const { dateOfBirth } = req.body;
      if (!dateOfBirth) {
        return res.status(200).send({
          message: "Please provide date of birth",
          success: false
        });
      }
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    
    // Create new user
    const newUser = new userModel(req.body);
    await newUser.save();
    
    res.status(201).send({ 
      message: "Registration Successful", 
      success: true 
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller Error: ${error.message}`,
    });
  }
};

// login callback
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid Email or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Remove password from user object
    const userData = user.toObject();
    delete userData.password;

    // Format date fields if needed
    if (userData.dateOfBirth) {
      userData.dateOfBirth = userData.dateOfBirth.toISOString();
    }

    res.status(200).send({ 
      message: "Login Success", 
      success: true, 
      token,
      data: userData
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};

// get doctors list
const getDoctorsController = async (req, res) => {
  try {
    const doctors = await userModel.find({ userType: 'doctor' }).select('-password');
    res.status(200).send({
      success: true,
      message: "Doctors List Fetched Successfully",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching doctors",
      error,
    });
  }
};

// get appointments
const getAppointmentsController = async (req, res) => {
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
      .populate('doctorId', 'name specialization')
      .sort({ date: -1 });
    
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

// get notifications
const getNotificationsController = async (req, res) => {
  try {
    // User should be available from auth middleware
    if (!req.user?._id) {
      return res.status(200).send({
        success: false,
        message: "User not authenticated",
        data: []
      });
    }
    
    const notifications = await notificationModel
      .find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    
    res.status(200).send({
      success: true,
      message: "Notifications Fetched Successfully",
      data: notifications || [],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching notifications",
      error,
    });
  }
};

// get doctor appointments
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
      .populate('patientId', 'name email phone')
      .sort({ date: -1 });
    
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

// update appointment status
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
    
    const { appointmentId, status } = req.body;
    
    if (!appointmentId || !status) {
      return res.status(200).send({
        success: false,
        message: "Appointment ID and status are required"
      });
    }
    
    const appointment = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );
    
    if (!appointment) {
      return res.status(200).send({
        success: false,
        message: "Appointment not found"
      });
    }
    
    // Create notification for patient
    await notificationModel.create({
      userId: appointment.patientId,
      title: `Appointment ${status}`,
      message: `Your appointment on ${moment(appointment.date).format('MMMM Do, YYYY')} at ${appointment.time} has been ${status} by the doctor.`,
      read: false
    });
    
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

// create appointment
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
    
    const { doctorId, date, time } = req.body;
    
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
    
    // Create appointment
    const appointment = await appointmentModel.create({
      doctorId,
      patientId: req.user._id,
      date,
      time,
      status: 'pending'
    });
    
    // Create notification for doctor
    await notificationModel.create({
      userId: doctorId,
      title: 'New Appointment Request',
      message: `You have a new appointment request from ${req.user.name} on ${moment(date).format('MMMM Do, YYYY')} at ${time}.`,
      read: false
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

module.exports = { 
  loginController, 
  registerController,
  getDoctorsController,
  getAppointmentsController,
  getNotificationsController,
  getDoctorAppointmentsController,
  updateAppointmentStatusController,
  createAppointmentController,
};
