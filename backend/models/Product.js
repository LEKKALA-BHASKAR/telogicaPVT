import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Telecommunication', 'Defence', 'Manufacturing']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  images: [{
    url: String,
    publicId: String
  }],
  pdfs: [{
    name: String,
    url: String,
    publicId: String
  }],
  specifications: {
    type: Map,
    of: String
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Index for search
productSchema.index({ title: 'text', description: 'text' });

export default mongoose.model('Product', productSchema);
