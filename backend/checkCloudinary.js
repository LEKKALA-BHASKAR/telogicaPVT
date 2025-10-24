import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

console.log('Environment variables:');
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY);
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? '**** (exists)' : 'undefined');

console.log('\nCloudinary config:');
console.log(cloudinary.config());

// Test the configuration
cloudinary.api.ping()
  .then(result => {
    console.log('\nCloudinary connection test result:', result);
  })
  .catch(error => {
    console.error('\nCloudinary connection test error:', error);
  });