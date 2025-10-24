import dotenv from 'dotenv';
import mongoose from 'mongoose';
import File from './models/File.js';
import Section from './models/Section.js';

dotenv.config();

const checkData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME
    });
    
    console.log('Connected to MongoDB');
    
    // Check sections
    const sections = await Section.find().sort({ order: 1 });
    console.log('\nSections:');
    console.log('=========');
    sections.forEach(section => {
      console.log(`ID: ${section._id}`);
      console.log(`Name: ${section.name}`);
      console.log(`Category: ${section.category}`);
      console.log(`Order: ${section.order}`);
      console.log(`Active: ${section.isActive}`);
      console.log('---');
    });
    
    // Check files
    const files = await File.find().sort({ createdAt: -1 });
    console.log('\nFiles:');
    console.log('======');
    files.forEach(file => {
      console.log(`ID: ${file._id}`);
      console.log(`Name: ${file.name}`);
      console.log(`Category: ${file.category}`);
      console.log(`Type: ${file.type}`);
      console.log(`URL: ${file.url}`);
      console.log(`Public ID: ${file.publicId}`);
      console.log(`Uploaded by: ${file.uploadedBy}`);
      console.log(`Created at: ${file.createdAt}`);
      console.log('---');
    });
    
    console.log(`\nTotal sections: ${sections.length}`);
    console.log(`Total files: ${files.length}`);
    
    // Check if files match sections
    if (sections.length > 0 && files.length > 0) {
      console.log('\nFile categorization check:');
      console.log('========================');
      sections.forEach(section => {
        const sectionFiles = files.filter(file => file.category === section.category);
        console.log(`${section.name} (${section.category}): ${sectionFiles.length} files`);
      });
      
      // Check for files with "other" category
      const otherFiles = files.filter(file => file.category === 'other');
      if (otherFiles.length > 0) {
        console.log(`\nFiles with "other" category: ${otherFiles.length}`);
        console.log('These files might not appear in any section because their category doesn\'t match any section.');
      }
    }
    
    // Check for duplicate categories
    const categories = sections.map(s => s.category);
    const duplicateCategories = categories.filter((category, index) => categories.indexOf(category) !== index);
    if (duplicateCategories.length > 0) {
      console.log('\nWarning: Duplicate categories found:');
      console.log(duplicateCategories);
    }
    
    await mongoose.connection.close();
    console.log('\nDisconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
    await mongoose.connection.close();
  }
};

checkData();