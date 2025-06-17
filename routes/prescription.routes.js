const express = require('express');
const router = express.Router();
const Prescription = require('../Models/prescription.model');

// POST /prescriptions - Submit a new prescription
router.post('/', async (req, res) => {
  try {
    // Log the received data for debugging
    console.log('Received FormData:', req.body);

    const { name, phoneNumber, prescriptionText, inputMethod } = req.body;

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
      phone: phoneNumber.trim(), // We'll store it as phone in our model
      uploadType: inputMethod || 'manual'
    };

    // Handle prescription content based on input method
    if (inputMethod === 'manual') {
      if (!prescriptionText) {
        return res.status(400).json({
          success: false,
          error: 'Prescription text is required for manual input'
        });
      }
      prescriptionData.content = prescriptionText.trim();
    } else {
      // For file uploads
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: 'Prescription file is required for file upload'
        });
      }
      prescriptionData.prescriptionFile = req.file.path;
      prescriptionData.content = 'Prescription uploaded via file';
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
        timestamp: savedPrescription.timestamp,
        status: savedPrescription.status,
        notes: savedPrescription.notes
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

// GET /prescriptions - Admin route to get all prescriptions
router.get('/', async (req, res) => {
  try {
    const prescriptions = await Prescription.find()
      .sort({ createdAt: -1 })
      .lean(); // Use lean() for better performance

    res.json({
      success: true,
      prescriptions: prescriptions.map(p => ({
        _id: p._id,  // Changed from id to _id for consistency
        name: p.name,
        phone: p.phone,
        content: p.content,
        uploadType: p.uploadType,
        prescriptionFile: p.prescriptionFile,
        status: p.status,
        notes: p.notes,
        createdAt: p.createdAt || p.timestamp
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

// Routes to handle prescription status updates
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
