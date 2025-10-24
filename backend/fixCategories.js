import dotenv from 'dotenv';
import mongoose from 'mongoose';
import File from './models/File.js';
import Section from './models/Section.js';

dotenv.config();

const fixFileCategories = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME
    });
    
    console.log('Connected to MongoDB');
    
    // Get all sections
    const sections = await Section.find().sort({ order: 1 });
    console.log('Available sections:');
    sections.forEach(section => {
      console.log(`- ${section.name} (${section.category})`);
    });
    
    if (sections.length === 0) {
      console.log('No sections found. Please create sections first.');
      await mongoose.connection.close();
      return;
    }
    
    // Get files with "other" category
    const otherFiles = await File.find({ category: 'other' });
    console.log(`\nFound ${otherFiles.length} files with "other" category`);
    
    if (otherFiles.length === 0) {
      console.log('No files with "other" category found.');
      await mongoose.connection.close();
      return;
    }
    
    // Display files and ask user which section to assign them to
    console.log('\nFiles with "other" category:');
    otherFiles.forEach((file, index) => {
      console.log(`${index + 1}. ${file.name} (Uploaded: ${file.createdAt})`);
    });
    
    // For simplicity, let's assign all "other" files to the first section
    const firstSection = sections[0];
    console.log(`\nAssigning all files to section: ${firstSection.name} (${firstSection.category})`);
    
    for (const file of otherFiles) {
      console.log(`Updating ${file.name}...`);
      await File.findByIdAndUpdate(file._id, { category: firstSection.category });
      console.log(`  ✓ Updated to category: ${firstSection.category}`);
    }
    
    console.log('\n✓ All files updated successfully!');
    
    await mongoose.connection.close();
    console.log('\nDisconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
    await mongoose.connection.close();
  }
};

fixFileCategories();