const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: function() { return !this.externalPatient; }
  },
  externalPatient: {
    name: {
      type: String,
      default: ""
    },
    email: {
      type: String,
      default: ""
    },
    phone: {
      type: String,
      default: ""
    },
    externalId: {
      type: String,
      default: ""
    }
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'completed', 'cancelled', 'rejected'],
    default: 'pending'
  },
  reason: {
    type: String,
    default: ""
  },
  symptoms: {
    type: String,
    default: ""
  },
  diagnosis: {
    type: String,
    default: ""
  },
  prescription: [{
    medicine: String,
    dosage: String,
    duration: String
  }],
  followUp: {
    type: Date,
    default: null
  },
  fee: {
    type: Number,
    default: 0
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String,
    default: ""
  }
}, { timestamps: true });

const appointmentModel = mongoose.model("appointments", appointmentSchema);

module.exports = appointmentModel; 