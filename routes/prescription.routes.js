const express = require('express');
const router = express.Router();
const Prescription = require('../Models/prescription.model');

// POST /prescriptions - Submit a new prescription
router.post('/', async (req, res) => {
  try {
    console.log('Received prescription data:', req.body);

    const { name, phoneNumber, prescriptionDetails, inputMethod } = req.body;

    // Basic validation
    if (!name || !phoneNumber) {
      return res.status(400).json({
        success: false,
        error: 'Name and phone number are required',
        received: req.body
      });
    }

    // Prepare prescription data
    const prescriptionData = {
      name: name.trim(),
      phone: phoneNumber.trim(),
      uploadType: inputMethod || 'manual'
    };

    // Handle structured prescription data
    if (inputMethod === 'manual' && prescriptionDetails) {
      // Store the structured prescription as JSON
      prescriptionData.prescriptionDetails = prescriptionDetails;
      
      // Also create a human-readable text version for backward compatibility
      const textContent = formatPrescriptionText(prescriptionDetails);
      prescriptionData.content = textContent;
      
    } else if (inputMethod === 'file') {
      // For file uploads
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: 'Prescription file is required for file upload'
        });
      }
      prescriptionData.prescriptionFile = req.file.path;
      prescriptionData.content = 'Prescription uploaded via file';
    } else {
      return res.status(400).json({
        success: false,
        error: 'Invalid prescription data'
      });
    }

    const prescription = new Prescription(prescriptionData);
    const savedPrescription = await prescription.save();

    res.status(201).json({
      success: true,
      message: 'Prescription submitted successfully',
      data: {
        id: savedPrescription._id,
        name: savedPrescription.name,
        phone: savedPrescription.phone,
        content: savedPrescription.content,
        prescriptionDetails: savedPrescription.prescriptionDetails,
        timestamp: savedPrescription.createdAt,
        status: savedPrescription.status
      }
    });

  } catch (error) {
    console.error('Error saving prescription:', error);

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Duplicate entry detected'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to save prescription'
    });
  }
});

// Helper function to format prescription details as readable text
function formatPrescriptionText(details) {
  const parts = [];
  
  if (details.rightEye) {
    const re = details.rightEye;
    const rightParts = [];
    if (re.sph) rightParts.push(`SPH ${re.sph}`);
    if (re.cyl) rightParts.push(`CYL ${re.cyl}`);
    if (re.axis) rightParts.push(`Axis ${re.axis}°`);
    if (re.pd) rightParts.push(`PD ${re.pd} mm`);
    if (rightParts.length > 0) {
      parts.push(`Right Eye (OD): ${rightParts.join(', ')}`);
    }
  }
  
  if (details.leftEye) {
    const le = details.leftEye;
    const leftParts = [];
    if (le.sph) leftParts.push(`SPH ${le.sph}`);
    if (le.cyl) leftParts.push(`CYL ${le.cyl}`);
    if (le.axis) leftParts.push(`Axis ${le.axis}°`);
    if (le.pd) leftParts.push(`PD ${le.pd} mm`);
    if (leftParts.length > 0) {
      parts.push(`Left Eye (OS): ${leftParts.join(', ')}`);
    }
  }
  
  if (details.additional) {
    if (details.additional.addPower) {
      parts.push(`ADD Power: ${details.additional.addPower}`);
    }
    if (details.additional.totalPd) {
      parts.push(`Total PD: ${details.additional.totalPd} mm`);
    }
  }
  
  return parts.length > 0 ? parts.join('\n') : 'No prescription details provided';
}

// GET /prescriptions - Admin route to get all prescriptions
router.get('/', async (req, res) => {
  try {
    const prescriptions = await Prescription.find()
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      prescriptions: prescriptions.map(p => ({
        _id: p._id,
        name: p.name,
        phone: p.phone,
        content: p.content,
        prescriptionDetails: p.prescriptionDetails, // Include structured data
        uploadType: p.uploadType,
        prescriptionFile: p.prescriptionFile,
        status: p.status,
        notes: p.notes,
        createdAt: p.createdAt
      }))
    });
  } catch (error) {
    console.error('Error fetching prescriptions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch prescriptions'
    });
  }
});

// GET /prescriptions/:id - Get specific prescription details
router.get('/:id', async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);
    
    if (!prescription) {
      return res.status(404).json({
        success: false,
        error: 'Prescription not found'
      });
    }

    res.json({
      success: true,
      prescription
    });
  } catch (error) {
    console.error('Error fetching prescription:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch prescription details'
    });
  }
});

// PATCH /prescriptions/:id/status - Update prescription status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'reviewed', 'processed', 'completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status value'
      });
    }

    const prescription = await Prescription.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!prescription) {
      return res.status(404).json({
        success: false,
        error: 'Prescription not found'
      });
    }

    res.json({
      success: true,
      prescription
    });
  } catch (error) {
    console.error('Error updating prescription status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update prescription status'
    });
  }
});

module.exports = router;