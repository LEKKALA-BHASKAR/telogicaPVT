import express from 'express';
import multer from 'multer';
import cloudinary from './config/cloudinary.js';

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

// Test the upload functionality
const testUpload = async () => {
  console.log('Testing upload functionality...');
  
  // Create a mock file buffer for testing
  const mockFileBuffer = Buffer.from('This is a test PDF file content', 'utf-8');
  
  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw',
          folder: 'test',
          public_id: 'test_file',
          overwrite: true,
          invalidate: true,
          access_mode: 'public'
        },
        (error, result) => {
          if (error) reject(new Error(`Cloudinary upload failed: ${error.message}`));
          else resolve(result);
        }
      );
      uploadStream.end(mockFileBuffer);
    });
    
    console.log('Upload successful:', result);
  } catch (error) {
    console.error('Upload failed:', error);
  }
};

testUpload();