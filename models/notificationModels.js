const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    enum: ['appointment', 'system', 'message'],
    default: 'system'
  },
  relatedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'appointments',
    default: null
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  }
}, { timestamps: true });

const notificationModel = mongoose.model("notifications", notificationSchema);

module.exports = notificationModel; 