import express from 'express';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Order from '../models/Order.js';
import File from '../models/File.js';
import Section from '../models/Section.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import cloudinary from '../config/cloudinary.js';
import multer from 'multer';

const router = express.Router();

// Configure multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Get dashboard analytics
router.get('/analytics', protect, admin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const completedOrders = await Order.find({ paymentStatus: 'completed' });
    
    const totalRevenue = completedOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    
    // Recent orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name email');
    
    res.json({
      success: true,
      data: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
        recentOrders
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get all users
router.get('/users', protect, admin, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Delete user
router.delete('/users/:id', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    if (user.role === 'admin') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete admin user'
      });
    }
    
    await User.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'User deleted'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Create product
router.post('/products', protect, admin, upload.array('images', 5), async (req, res) => {
  try {
    const { title, description, category, price, stock, specifications } = req.body;
    
    // Upload images to Cloudinary
    const images = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'products' },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          uploadStream.end(file.buffer);
        });
        
        images.push({
          url: result.secure_url,
          publicId: result.public_id
        });
      }
    }
    
    const product = await Product.create({
      title,
      description,
      category,
      price,
      stock,
      images,
      specifications: specifications ? JSON.parse(specifications) : {}
    });
    
    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Update product
router.put('/products/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    const { title, description, category, price, stock, specifications } = req.body;
    
    if (title) product.title = title;
    if (description) product.description = description;
    if (category) product.category = category;
    if (price !== undefined) product.price = price;
    if (stock !== undefined) product.stock = stock;
    if (specifications) product.specifications = specifications;
    
    await product.save();
    
    // Emit socket event for real-time update
    const io = req.app.get('io');
    io.emit('stockUpdate', {
      productId: product._id,
      stock: product.stock
    });
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Delete product
router.delete('/products/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    // Delete images from Cloudinary
    for (const image of product.images) {
      await cloudinary.uploader.destroy(image.publicId);
    }
    
    // Delete PDFs from Cloudinary
    for (const pdf of product.pdfs) {
      await cloudinary.uploader.destroy(pdf.publicId, { resource_type: 'raw' });
    }
    
    await Product.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Product deleted'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get all orders
router.get('/orders', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate('user', 'name email');
    
    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Update order status
router.put('/orders/:id', protect, admin, async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    order.orderStatus = orderStatus;
    await order.save();
    
    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get all sections (public endpoint for investors page)
router.get('/sections/public', async (req, res) => {
  try {
    const sections = await Section.find({ isActive: true }).sort({ order: 1 });
    
    // If no sections exist, create default ones
    if (sections.length === 0) {
      const defaultSections = [
        { name: 'Annual Reports', category: 'annual_report', order: 1, isActive: true },
        { name: 'Financial Statements', category: 'financial_statement', order: 2, isActive: true },
        { name: 'Corporate Governance', category: 'corporate_governance', order: 3, isActive: true },
        { name: 'Investor Presentations', category: 'investor_presentation', order: 4, isActive: true },
        { name: 'Regulatory Filings', category: 'regulatory_filing', order: 5, isActive: true }
      ];
      
      const createdSections = await Section.insertMany(defaultSections);
      return res.json({
        success: true,
        data: createdSections
      });
    }
    
    res.json({
      success: true,
      data: sections
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get all sections
router.get('/sections', protect, admin, async (req, res) => {
  try {
    const sections = await Section.find().sort({ order: 1 });
    
    // If no sections exist, create default ones
    if (sections.length === 0) {
      const defaultSections = [
        { name: 'Annual Reports', category: 'annual_report', order: 1 },
        { name: 'Financial Statements', category: 'financial_statement', order: 2 },
        { name: 'Corporate Governance', category: 'corporate_governance', order: 3 },
        { name: 'Investor Presentations', category: 'investor_presentation', order: 4 },
        { name: 'Regulatory Filings', category: 'regulatory_filing', order: 5 }
      ];
      
      const createdSections = await Section.insertMany(defaultSections);
      return res.json({
        success: true,
        data: createdSections
      });
    }
    
    res.json({
      success: true,
      data: sections
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Create section
router.post('/sections', protect, admin, async (req, res) => {
  try {
    const { name, order } = req.body;
    
    // Automatically generate category slug from name if not provided
    const categorySlug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/(^_|_$)/g, '');
    
    const section = await Section.create({
      name,
      category: categorySlug,
      order: order || 0
    });
    
    res.status(201).json({
      success: true,
      data: section
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Update section
router.put('/sections/:id', protect, admin, async (req, res) => {
  try {
    const section = await Section.findById(req.params.id);
    
    if (!section) {
      return res.status(404).json({
        success: false,
        message: 'Section not found'
      });
    }
    
    const { name, category, order, isActive } = req.body;
    
    if (name !== undefined) section.name = name;
    if (category !== undefined) section.category = category;
    if (order !== undefined) section.order = order;
    if (isActive !== undefined) section.isActive = isActive;
    
    await section.save();
    
    res.json({
      success: true,
      data: section
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Delete section
router.delete('/sections/:id', protect, admin, async (req, res) => {
  try {
    const section = await Section.findById(req.params.id);
    
    if (!section) {
      return res.status(404).json({
        success: false,
        message: 'Section not found'
      });
    }
    
    // Don't allow deletion of the last section
    const sectionCount = await Section.countDocuments();
    if (sectionCount <= 1) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete the last section'
      });
    }
    
    await Section.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Section deleted'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
