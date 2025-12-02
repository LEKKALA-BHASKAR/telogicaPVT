import express from 'express';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Order from '../models/Order.js';
import File from '../models/File.js';
import Section from '../models/Section.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import cloudinary from '../config/cloudinary.js';
import multer from 'multer';
import { MailService } from '../services/mailService.js';

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

    await order.populate('user', 'name email');

    if (order.user?.email) {
      await MailService.sendOrderStatusUpdate({
        user: {
          email: order.user.email,
          name: order.user.name
        },
        orderId: order._id.toString(),
        orderStatus,
        products: order.products.map(item => ({
          title: item.title,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: order.totalAmount,
        trackingNumber: order.trackingNumber,
        estimatedDelivery: order.estimatedDelivery
      });
    }
    
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
    
    // Add document count to each section
    const sectionsWithCounts = await Promise.all(sections.map(async (section) => {
      const documentCount = await File.countDocuments({ category: section.category });
      return {
        ...section.toObject(),
        documentCount
      };
    }));
    
    res.json({
      success: true,
      data: sectionsWithCounts
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
    
    // Add document count to each section
    const sectionsWithCounts = await Promise.all(sections.map(async (section) => {
      const documentCount = await File.countDocuments({ category: section.category });
      return {
        ...section.toObject(),
        documentCount
      };
    }));
    
    res.json({
      success: true,
      data: sectionsWithCounts
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
