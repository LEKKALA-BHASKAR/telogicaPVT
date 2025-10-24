import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import File from '../models/File.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
});

// Upload file (Admin only)
router.post('/', protect, admin, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file'
      });
    }
    
    const { category } = req.body;
    
    // Determine file type
    const fileType = req.file.mimetype.includes('image') ? 'image' :
                     req.file.mimetype.includes('pdf') ? 'pdf' : 'document';
    
    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: fileType === 'image' ? 'image' : 'raw',
          folder: category || 'uploads'
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      
      uploadStream.end(req.file.buffer);
    });
    
    // Save file info to database
    const file = await File.create({
      name: req.file.originalname,
      url: result.secure_url,
      publicId: result.public_id,
      type: fileType,
      category: category || 'other',
      uploadedBy: req.user._id
    });
    
    res.json({
      success: true,
      data: file
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get all files
router.get('/', async (req, res) => {
  try {
    const { category, type } = req.query;
    let query = {};
    
    if (category) query.category = category;
    if (type) query.type = type;
    
    const files = await File.find(query).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: files
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Delete file (Admin only)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    
    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }
    
    // Delete from Cloudinary
    await cloudinary.uploader.destroy(file.publicId, {
      resource_type: file.type === 'image' ? 'image' : 'raw'
    });
    
    // Delete from database
    await File.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'File deleted'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
