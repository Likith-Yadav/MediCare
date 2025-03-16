const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  userType: {
    type: String,
    enum: ['patient', 'doctor', 'admin'],
    required: [true, "user type is required"],
  },
  phone: {
    type: String,
    required: [true, "phone number is required"],
  },
  address: {
    type: String,
    default: ""
  },
  // Doctor specific fields
  specialization: {
    type: String,
    required: function() { return this.userType === 'doctor'; }
  },
  experience: {
    type: Number,
    required: function() { return this.userType === 'doctor'; }
  },
  feePerConsultation: {
    type: Number,
    required: function() { return this.userType === 'doctor'; }
  },
  timings: {
    type: [String],
    required: function() { return this.userType === 'doctor'; }
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  // Patient specific fields
  dateOfBirth: {
    type: Date,
    required: function() { return this.userType === 'patient'; }
  },
  bloodGroup: {
    type: String,
    default: ""
  },
  medicalHistory: [{
    disease: String,
    year: Number
  }],
  // Common fields
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
