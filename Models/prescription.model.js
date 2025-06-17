const mongoose = require('mongoose');

// Prescription Schema
const prescriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    maxlength: [20, 'Phone number cannot exceed 20 characters']
  },
  // For manual prescription entry
  content: {
    type: String,
    required: function() { return this.uploadType === 'manual'; },
    trim: true,
    maxlength: [2000, 'Prescription content cannot exceed 2000 characters']
  },
  // For file uploads
  prescriptionFile: {
    type: String,  // Store file path or URL
    required: function() { return this.uploadType === 'file'; }
  },
  uploadType: {
    type: String,
    enum: ['manual', 'file'],
    required: true,
    default: 'manual'
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'processed', 'completed'],
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Add indexes for commonly queried fields
prescriptionSchema.index({ status: 1 });
prescriptionSchema.index({ createdAt: -1 });
prescriptionSchema.index({ name: 'text', phone: 'text' }); // For text search

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;
