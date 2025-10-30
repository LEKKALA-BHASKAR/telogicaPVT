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
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and PDF are allowed.'));
    }
  }
});

// Upload multiple files (Admin only)
router.post('/', protect, admin, upload.fields([
  { name: 'images', maxCount: 5 },
  { name: 'pdfs', maxCount: 3 }
]), async (req, res) => {
  try {
    console.log('Upload request received:', {
      files: req.files,
      body: req.body,
      user: req.user?._id
    });

    if (!req.files || (!req.files.images && !req.files.pdfs)) {
      console.log('No files provided in request');
      return res.status(400).json({
        success: false,
        message: 'Please upload at least one image or PDF'
      });
    }

    const { category } = req.body;
    const fileCategory = category || 'other';
    const uploadedFiles = [];

    // Process images
    if (req.files.images) {
      for (const file of req.files.images) {
        const fileExtension = file.originalname.split('.').pop();
        const fileNameWithoutExtension = file.originalname.replace(/\.[^/.]+$/, "");
        const cleanFileName = fileNameWithoutExtension
          .replace(/[^a-zA-Z0-9]/g, '_')
          .replace(/_+/g, '_')
          .replace(/^_|_$/g, '');
        const finalFileName = cleanFileName + (fileExtension ? `.${fileExtension}` : '');

        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              resource_type: 'image',
              folder: fileCategory || 'Uploads',
              public_id: finalFileName,
              overwrite: true,
              invalidate: true,
              access_mode: 'public'
            },
            (error, result) => {
              if (error) reject(new Error(`Cloudinary upload failed: ${error.message}`));
              else resolve(result);
            }
          );
          uploadStream.end(file.buffer);
        });

        const savedFile = await File.create({
          name: file.originalname,
          url: result.secure_url,
          publicId: result.public_id,
          type: 'image',
          category: fileCategory,
          uploadedBy: req.user._id
        });

        uploadedFiles.push({
          name: file.originalname,
          url: result.secure_url,
          publicId: result.public_id
        });
      }
    }

    // Process PDFs
    if (req.files.pdfs) {
      for (const file of req.files.pdfs) {
        const fileExtension = file.originalname.split('.').pop();
        const fileNameWithoutExtension = file.originalname.replace(/\.[^/.]+$/, "");
        const cleanFileName = fileNameWithoutExtension
          .replace(/[^a-zA-Z0-9]/g, '_')
          .replace(/_+/g, '_')
          .replace(/^_|_$/g, '');
        const finalFileName = cleanFileName + (fileExtension ? `.${fileExtension}` : '');

        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              resource_type: 'raw',
              folder: fileCategory || 'Uploads',
              public_id: finalFileName,
              overwrite: true,
              invalidate: true,
              access_mode: 'public'
            },
            (error, result) => {
              if (error) reject(new Error(`Cloudinary upload failed: ${error.message}`));
              else resolve(result);
            }
          );
          uploadStream.end(file.buffer);
        });

        const savedFile = await File.create({
          name: file.originalname,
          url: result.secure_url,
          publicId: result.public_id,
          type: 'pdf',
          category: fileCategory,
          uploadedBy: req.user._id
        });

        uploadedFiles.push({
          name: file.originalname,
          url: result.secure_url,
          publicId: result.public_id
        });
      }
    }

    console.log('Files saved successfully:', uploadedFiles);

    res.json({
      success: true,
      files: uploadedFiles
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to upload files'
    });
  }
});

// Add external link (Admin only)
router.post('/external-link', protect, admin, async (req, res) => {
  try {
    const { name, url, category, linkType } = req.body;
    
    if (!name || !url || !category) {
      return res.status(400).json({
        success: false,
        message: 'Name, URL, and category are required'
      });
    }

    // Validate URL format based on link type
    if (linkType === 'cloudinary' && !url.includes('cloudinary.com')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Cloudinary URL'
      });
    }
    
    if (linkType === 'drive' && !url.includes('drive.google.com')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Google Drive URL'
      });
    }

    // Determine file type from URL or name
    let fileType = 'document';
    if (url.toLowerCase().endsWith('.pdf')) {
      fileType = 'pdf';
    } else if (url.match(/\.(jpg|jpeg|png|gif)$/i)) {
      fileType = 'image';
    }

    const savedFile = await File.create({
      name,
      url,
      publicId: `external_${Date.now()}`, // Generate a unique publicId for external links
      type: fileType,
      category,
      uploadedBy: req.user._id,
      isExternalLink: true,
      linkType // 'cloudinary' or 'drive'
    });

    res.json({
      success: true,
      file: {
        _id: savedFile._id,
        name: savedFile.name,
        url: savedFile.url,
        type: savedFile.type,
        category: savedFile.category,
        isExternalLink: savedFile.isExternalLink,
        linkType: savedFile.linkType
      }
    });
  } catch (error) {
    console.error('External link error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to add external link'
    });
  }
});

// Other routes (GET, GET/:id, DELETE) remain unchanged
router.get('/', async (req, res) => {
  try {
    const { category, type } = req.query;
    let query = {};
    if (category) query.category = category;
    if (type) query.type = type;
    const files = await File.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: files });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ success: false, message: 'File not found' });
    }
    res.json({ success: true, data: file });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/download/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ success: false, message: 'File not found' });
    }
    
    // For external links, redirect to the original URL
    if (file.isExternalLink) {
      return res.redirect(file.url);
    }
    
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(file.name)}"`);
    res.redirect(file.url);
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
});

router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ success: false, message: 'File not found' });
    }
    
    // Only delete from Cloudinary if it's not an external link
    if (!file.isExternalLink) {
      await cloudinary.uploader.destroy(file.publicId, {
        resource_type: file.type === 'image' ? 'image' : 'raw'
      });
    }
    
    await File.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'File deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;