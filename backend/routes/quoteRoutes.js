import express from 'express';
import Quote from '../models/Quote.js';
import Product from '../models/Product.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Constants
const DEFAULT_QUOTE_VALIDITY_DAYS = 7;

/* -------------------------------------------------------------------------- */
/* 🟢 CREATE QUOTE REQUEST (POST) - Public endpoint */
/* -------------------------------------------------------------------------- */
router.post('/', async (req, res) => {
  try {
    const { buyer, address, products, userId, userMessage } = req.body;

    // Validate required fields
    if (!buyer?.fullName || !buyer?.email || !buyer?.mobile) {
      return res.status(400).json({
        success: false,
        message: 'Full name, email, and mobile are required'
      });
    }

    if (!address?.houseFlat || !address?.streetArea || !address?.city || !address?.state || !address?.pincode) {
      return res.status(400).json({
        success: false,
        message: 'Complete address is required'
      });
    }

    if (!products || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one product is required'
      });
    }

    // Fetch product details and calculate total
    const productDetails = [];
    let originalTotal = 0;

    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.productId}`
        });
      }

      const productData = {
        product: product._id,
        title: product.title,
        price: product.price,
        quantity: item.quantity,
        image: product.images?.[0]?.url || ''
      };

      productDetails.push(productData);
      originalTotal += product.price * item.quantity;
    }

    // Create quote
    const quote = await Quote.create({
      buyer,
      address,
      products: productDetails,
      originalTotal,
      user: userId || null,
      userMessage: userMessage || null,
      status: 'pending'
    });

    // Populate product details
    await quote.populate('products.product');

    res.status(201).json({
      success: true,
      message: 'Quote request submitted successfully',
      data: quote
    });

  } catch (error) {
    console.error('Create quote error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/* -------------------------------------------------------------------------- */
/* 🔵 GET USER QUOTES - For logged-in users */
/* -------------------------------------------------------------------------- */
router.get('/my-quotes', protect, async (req, res) => {
  try {
    const quotes = await Quote.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate('products.product');

    res.json({
      success: true,
      data: quotes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/* -------------------------------------------------------------------------- */
/* 🔵 GET QUOTES BY EMAIL - For guest users */
/* -------------------------------------------------------------------------- */
router.get('/by-email/:email', async (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email);
    
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }
    
    const quotes = await Quote.find({ 'buyer.email': email.toLowerCase() })
      .sort({ createdAt: -1 })
      .populate('products.product');

    res.json({
      success: true,
      data: quotes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/* -------------------------------------------------------------------------- */
/* 🔵 GET SINGLE QUOTE */
/* -------------------------------------------------------------------------- */
router.get('/:id', async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id)
      .populate('products.product')
      .populate('user', 'name email');

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    res.json({
      success: true,
      data: quote
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/* -------------------------------------------------------------------------- */
/* 🟡 ADMIN: GET ALL QUOTES */
/* -------------------------------------------------------------------------- */
router.get('/admin/all', protect, admin, async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};

    const quotes = await Quote.find(query)
      .sort({ createdAt: -1 })
      .populate('products.product')
      .populate('user', 'name email');

    res.json({
      success: true,
      data: quotes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/* -------------------------------------------------------------------------- */
/* 🟠 ADMIN: RESPOND TO QUOTE - Send quoted price */
/* -------------------------------------------------------------------------- */
router.put('/admin/:id/respond', protect, admin, async (req, res) => {
  try {
    const { quotedTotal, discountPercentage, adminNotes, validUntil } = req.body;

    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    // Calculate quoted total if discount percentage is provided
    let calculatedQuotedTotal = quotedTotal;
    if (discountPercentage && !quotedTotal) {
      calculatedQuotedTotal = quote.originalTotal * (1 - discountPercentage / 100);
    }

    quote.quotedTotal = calculatedQuotedTotal;
    // Avoid division by zero when calculating discount percentage
    quote.discountPercentage = discountPercentage || 
      (quote.originalTotal > 0 ? ((quote.originalTotal - calculatedQuotedTotal) / quote.originalTotal * 100) : 0);
    quote.adminNotes = adminNotes;
    quote.validUntil = validUntil || new Date(Date.now() + DEFAULT_QUOTE_VALIDITY_DAYS * 24 * 60 * 60 * 1000);
    quote.status = 'quoted';

    await quote.save();

    // Populate for response
    await quote.populate('products.product');

    res.json({
      success: true,
      message: 'Quote response sent successfully',
      data: quote
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/* -------------------------------------------------------------------------- */
/* 🟠 UPDATE QUOTE STATUS */
/* -------------------------------------------------------------------------- */
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    // Check if user owns the quote or is admin
    if (quote.user?.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    quote.status = status;
    await quote.save();

    res.json({
      success: true,
      data: quote
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/* -------------------------------------------------------------------------- */
/* 🔴 DELETE QUOTE (Admin only) */
/* -------------------------------------------------------------------------- */
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const quote = await Quote.findByIdAndDelete(req.params.id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    res.json({
      success: true,
      message: 'Quote deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/* -------------------------------------------------------------------------- */
/* 🟠 ADMIN: REJECT QUOTE */
/* -------------------------------------------------------------------------- */
router.put('/admin/:id/reject', protect, admin, async (req, res) => {
  try {
    const { adminNotes } = req.body;

    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    quote.status = 'rejected';
    if (adminNotes) {
      quote.adminNotes = adminNotes;
    }

    await quote.save();

    res.json({
      success: true,
      message: 'Quote rejected successfully',
      data: quote
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/* -------------------------------------------------------------------------- */
/* 🟠 ADMIN: UPDATE QUOTED PRICE - Allow admin to update price on quoted quotes */
/* -------------------------------------------------------------------------- */
router.put('/admin/:id/update-price', protect, admin, async (req, res) => {
  try {
    const { quotedTotal, discountPercentage, adminNotes, validUntil } = req.body;

    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    // Only allow updating price on quoted quotes (user may have requested more discount)
    if (!['quoted', 'pending'].includes(quote.status)) {
      return res.status(400).json({
        success: false,
        message: 'Can only update price on pending or quoted quotes'
      });
    }

    // Calculate quoted total if discount percentage is provided
    let calculatedQuotedTotal = quotedTotal;
    if (discountPercentage && !quotedTotal) {
      calculatedQuotedTotal = quote.originalTotal * (1 - discountPercentage / 100);
    }

    if (!calculatedQuotedTotal) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a quoted price or discount percentage'
      });
    }

    quote.quotedTotal = calculatedQuotedTotal;
    // Avoid division by zero when calculating discount percentage
    quote.discountPercentage = discountPercentage || 
      (quote.originalTotal > 0 ? ((quote.originalTotal - calculatedQuotedTotal) / quote.originalTotal * 100) : 0);
    
    if (adminNotes !== undefined) {
      quote.adminNotes = adminNotes;
    }
    
    quote.validUntil = validUntil || new Date(Date.now() + DEFAULT_QUOTE_VALIDITY_DAYS * 24 * 60 * 60 * 1000);
    quote.status = 'quoted';

    await quote.save();

    // Populate for response
    await quote.populate('products.product');

    res.json({
      success: true,
      message: 'Quote price updated successfully',
      data: quote
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/* -------------------------------------------------------------------------- */
/* 🟠 ADMIN: UPDATE CONVERSATION STATUS - Close/reopen quote conversations */
/* -------------------------------------------------------------------------- */
router.put('/admin/:id/conversation-status', protect, admin, async (req, res) => {
  try {
    const { conversationStatus } = req.body;

    if (!['open', 'closed'].includes(conversationStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid conversation status. Must be "open" or "closed"'
      });
    }

    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    quote.conversationStatus = conversationStatus;
    await quote.save();

    // Populate for response
    await quote.populate('products.product');

    res.json({
      success: true,
      message: `Conversation ${conversationStatus === 'closed' ? 'closed' : 'reopened'} successfully`,
      data: quote
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/* -------------------------------------------------------------------------- */
/* 🟢 ADD MESSAGE TO QUOTE (Admin) */
/* -------------------------------------------------------------------------- */
router.post('/admin/:id/message', protect, admin, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Message content is required'
      });
    }

    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    quote.messages.push({
      sender: 'admin',
      senderName: req.user.name || 'Admin',
      content: content.trim()
    });

    await quote.save();

    res.json({
      success: true,
      message: 'Message sent successfully',
      data: quote
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/* -------------------------------------------------------------------------- */
/* 🟢 ADD MESSAGE TO QUOTE (User - for logged-in users) */
/* -------------------------------------------------------------------------- */
router.post('/:id/message', protect, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Message content is required'
      });
    }

    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    // Check if user owns the quote
    if (quote.user?.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to message on this quote'
      });
    }

    quote.messages.push({
      sender: 'user',
      senderName: req.user.name || quote.buyer?.fullName || 'User',
      content: content.trim()
    });

    await quote.save();

    res.json({
      success: true,
      message: 'Message sent successfully',
      data: quote
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/* -------------------------------------------------------------------------- */
/* 🟢 ADD MESSAGE TO QUOTE (Guest - by email verification) */
/* -------------------------------------------------------------------------- */
router.post('/:id/guest-message', async (req, res) => {
  try {
    const { content, email, fullName } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Message content is required'
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required for verification'
      });
    }

    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    // Verify email matches the quote buyer email
    if (quote.buyer.email.toLowerCase() !== email.toLowerCase()) {
      return res.status(403).json({
        success: false,
        message: 'Email does not match quote owner'
      });
    }

    quote.messages.push({
      sender: 'user',
      senderName: fullName || quote.buyer?.fullName || 'User',
      content: content.trim()
    });

    await quote.save();

    res.json({
      success: true,
      message: 'Message sent successfully',
      data: quote
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/* -------------------------------------------------------------------------- */
/* 🟠 GUEST: UPDATE QUOTE STATUS (accept/reject by email verification) */
/* -------------------------------------------------------------------------- */
router.put('/:id/guest-status', async (req, res) => {
  try {
    const { status, email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required for verification'
      });
    }

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Only accepted or rejected allowed.'
      });
    }

    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    // Verify email matches the quote buyer email
    if (quote.buyer.email.toLowerCase() !== email.toLowerCase()) {
      return res.status(403).json({
        success: false,
        message: 'Email does not match quote owner'
      });
    }

    quote.status = status;
    await quote.save();

    res.json({
      success: true,
      message: `Quote ${status} successfully`,
      data: quote
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
