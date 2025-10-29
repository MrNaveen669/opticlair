const mongoose = require('mongoose');

// Prescription Schema with structured data support
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
  // For manual prescription entry (text format - backward compatibility)
  content: {
    type: String,
    trim: true,
    maxlength: [2000, 'Prescription content cannot exceed 2000 characters']
  },
  // Structured prescription data (new format)
  prescriptionDetails: {
    rightEye: {
      sph: { type: String, trim: true, default: '' },
      cyl: { type: String, trim: true, default: '' },
      axis: { type: String, trim: true, default: '' },
      pd: { type: String, trim: true, default: '' }
    },
    leftEye: {
      sph: { type: String, trim: true, default: '' },
      cyl: { type: String, trim: true, default: '' },
      axis: { type: String, trim: true, default: '' },
      pd: { type: String, trim: true, default: '' }
    },
    additional: {
      addPower: { type: String, trim: true, default: '' },
      totalPd: { type: String, trim: true, default: '' }
    }
  },
  // For file uploads
  prescriptionFile: {
    type: String,  // Store file path or URL
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

// Virtual to check if prescription has any data
prescriptionSchema.virtual('hasData').get(function() {
  if (this.prescriptionFile) return true;
  if (this.content && this.content !== 'No prescription details provided') return true;
  if (this.prescriptionDetails) {
    const details = this.prescriptionDetails;
    return !!(
      details.rightEye?.sph || details.rightEye?.cyl || details.rightEye?.axis || details.rightEye?.pd ||
      details.leftEye?.sph || details.leftEye?.cyl || details.leftEye?.axis || details.leftEye?.pd ||
      details.additional?.addPower || details.additional?.totalPd
    );
  }
  return false;
});

// Method to get a summary of the prescription
prescriptionSchema.methods.getSummary = function() {
  if (this.prescriptionFile) {
    return 'Prescription uploaded as file';
  }
  
  if (this.prescriptionDetails) {
    const parts = [];
    const { rightEye, leftEye, additional } = this.prescriptionDetails;
    
    if (rightEye?.sph || rightEye?.cyl) {
      parts.push(`OD: SPH ${rightEye.sph || 'N/A'}, CYL ${rightEye.cyl || 'N/A'}`);
    }
    if (leftEye?.sph || leftEye?.cyl) {
      parts.push(`OS: SPH ${leftEye.sph || 'N/A'}, CYL ${leftEye.cyl || 'N/A'}`);
    }
    if (additional?.totalPd) {
      parts.push(`PD: ${additional.totalPd}`);
    }
    
    return parts.length > 0 ? parts.join(' | ') : 'No prescription data';
  }
  
  return this.content || 'No prescription data';
};

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;