import cloudinary from './config/cloudinary.js';

// Test Cloudinary connection
console.log('Testing Cloudinary connection...');

cloudinary.api.ping()
  .then(result => {
    console.log('Cloudinary connection successful:', result);
  })
  .catch(error => {
    console.error('Cloudinary connection failed:', error);
  });