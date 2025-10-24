import dotenv from 'dotenv';
import mongoose from 'mongoose';
import File from './models/File.js';
import Section from './models/Section.js';

dotenv.config();

const fixDocumentCategories = async () => {
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
    
    // Get files with "other" category
    const otherFiles = await File.find({ category: 'other' });
    console.log(`\nFound ${otherFiles.length} files with "other" category`);
    
    if (otherFiles.length === 0) {
      console.log('No files with "other" category found.');
      await mongoose.connection.close();
      return;
    }
    
    // For each "other" file, try to find a matching section by name
    for (const file of otherFiles) {
      console.log(`\nProcessing ${file.name}...`);
      
      // Try to find a section that might match this file
      let matchedSection = null;
      
      // Check if any section name appears in the file name
      for (const section of sections) {
        if (file.name.toLowerCase().includes(section.name.toLowerCase())) {
          matchedSection = section;
          break;
        }
      }
      
      // If no match found by name, assign to the first section
      if (!matchedSection && sections.length > 0) {
        matchedSection = sections[0];
      }
      
      if (matchedSection) {
        console.log(`Assigning to section: ${matchedSection.name} (${matchedSection.category})`);
        await File.findByIdAndUpdate(file._id, { category: matchedSection.category });
        console.log(`  ✓ Updated to category: ${matchedSection.category}`);
      } else {
        console.log('  ! No section found to assign to');
      }
    }
    
    console.log('\n✓ All files processed!');
    
    await mongoose.connection.close();
    console.log('\nDisconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
    await mongoose.connection.close();
  }
};

fixDocumentCategories();