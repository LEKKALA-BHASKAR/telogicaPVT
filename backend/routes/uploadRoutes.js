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
    console.log('Upload request received:', {
      file: !!req.file,
      body: req.body,
      user: req.user?._id
    });

    if (!req.file) {
      console.log('No file provided in request');
      return res.status(400).json({
        success: false,
        message: 'Please upload a file'
      });
    }
    
    const { category } = req.body;
    console.log('File details:', {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      category
    });
    
    // Determine file type - PDFs should be treated as 'raw' not 'image'
    let resourceType = 'raw';
    let fileType = 'document';
    
    if (req.file.mimetype.includes('image')) {
      resourceType = 'image';
      fileType = 'image';
    } else if (req.file.mimetype.includes('pdf')) {
      resourceType = 'raw'; // PDFs should use 'raw' resource type
      fileType = 'pdf';
    }
    
    // Determine category
    // Remove the validation against predefined categories to allow dynamic sections
    const fileCategory = category || 'other';
    
    console.log('Uploading to Cloudinary with config:', {
      resource_type: resourceType,
      folder: fileCategory || 'uploads'
    });
    
    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      // Extract the file extension and name
      const fileExtension = req.file.originalname.split('.').pop();
      const fileNameWithoutExtension = req.file.originalname.replace(/\.[^/.]+$/, "");
      
      // Create a clean filename (alphanumeric and underscores only)
      const cleanFileName = fileNameWithoutExtension
        .replace(/[^a-zA-Z0-9]/g, '_')
        .replace(/_+/g, '_') // Replace multiple underscores with single underscore
        .replace(/^_|_$/g, ''); // Remove leading/trailing underscores
      
      // Create final filename with extension
      const finalFileName = cleanFileName + (fileExtension ? `.${fileExtension}` : '');
      
      console.log('Uploading file with name:', finalFileName);
      
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: resourceType, // Use correct resource type
          folder: fileCategory || 'uploads',
          public_id: finalFileName, // Use the original filename
          overwrite: true,
          invalidate: true,
          access_mode: 'public'
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            console.error('Cloudinary config at time of upload:', cloudinary.config());
            reject(new Error(`Cloudinary upload failed: ${error.message}`));
          } else {
            console.log('Cloudinary upload success:', result.secure_url);
            resolve(result);
          }
        }
      );
      
      uploadStream.end(req.file.buffer);
    });
    
    // Save file info to database (use the original URL)
    console.log('Saving file to database');
    const file = await File.create({
      name: req.file.originalname,
      url: result.secure_url,
      publicId: result.public_id,
      type: fileType,
      category: fileCategory,
      uploadedBy: req.user._id
    });
    
    console.log('File saved successfully:', file._id);
    
    res.json({
      success: true,
      data: file
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to upload document'
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

// Get single file by ID
router.get('/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    
    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }
    
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

// Download file by ID (Proxy endpoint)
router.get('/download/:id', async (req, res) => {
  try {
    console.log('Download request received for file ID:', req.params.id);
    
    const file = await File.findById(req.params.id);
    
    if (!file) {
      console.log('File not found for ID:', req.params.id);
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }
    
    console.log('Found file:', {
      name: file.name,
      url: file.url,
      type: file.type,
      publicId: file.publicId
    });
    
    // For Cloudinary files, we can simply redirect to the URL since they're public
    // But let's make sure to set the right headers for download
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(file.name)}"`);
    res.redirect(file.url);
  } catch (error) {
    console.error('Download error:', error);
    // Only send error response if headers haven't been sent yet
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to download file'
      });
    }
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