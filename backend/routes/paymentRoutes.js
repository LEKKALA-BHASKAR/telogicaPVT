import express from 'express';
import razorpay from '../config/razorpay.js';
import crypto from 'crypto';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import { protect } from '../middleware/authMiddleware.js';
import PDFDocument from 'pdfkit';
import cloudinary from '../config/cloudinary.js';
import { Readable } from 'stream';

const router = express.Router();

// Create Razorpay order
router.post('/create-order', protect, async (req, res) => {
  try {
    const { amount } = req.body;
    
    const options = {
      amount: amount * 100, // amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`
    };
    
    const order = await razorpay.orders.create(options);
    
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

// Verify payment and create order
router.post('/verify-payment', protect, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      cartItems,
      totalAmount
    } = req.body;
    
    // Verify signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(sign.toString())
      .digest('hex');
    
    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature'
      });
    }
    
    // Create order
    const orderProducts = [];
    
    for (const item of cartItems) {
      const product = await Product.findById(item.product._id);
      
      if (!product) continue;
      
      // Check stock
      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.title}`
        });
      }
      
      // Reduce stock
      product.stock -= item.quantity;
      await product.save();
      
      // Emit socket event for real-time stock update
      const io = req.app.get('io');
      io.emit('stockUpdate', {
        productId: product._id,
        stock: product.stock
      });
      
      orderProducts.push({
        product: product._id,
        title: product.title,
        price: product.price,
        quantity: item.quantity,
        image: product.images[0]?.url || ''
      });
    }
    
    // Generate invoice PDF
    const invoiceUrl = await generateInvoice({
      orderId: razorpay_order_id,
      user: req.user,
      products: orderProducts,
      totalAmount
    });
    
    // Create order record
    const order = await Order.create({
      user: req.user._id,
      products: orderProducts,
      totalAmount,
      paymentStatus: 'completed',
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      invoiceUrl
    });
    
    // Clear user cart
    const user = await User.findById(req.user._id);
    user.cart = [];
    await user.save();
    
    res.json({
      success: true,
      message: 'Payment verified and order created',
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Generate invoice PDF
async function generateInvoice(orderData) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const chunks = [];
    
    doc.on('data', chunk => chunks.push(chunk));
    doc.on('end', async () => {
      const pdfBuffer = Buffer.concat(chunks);
      
      // Upload to Cloudinary
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw',
          folder: 'invoices',
          format: 'pdf'
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        }
      );
      
      Readable.from(pdfBuffer).pipe(stream);
    });
    
    // Invoice content
    doc.fontSize(20).text('INVOICE', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Order ID: ${orderData.orderId}`);
    doc.text(`Date: ${new Date().toLocaleDateString()}`);
    doc.text(`Customer: ${orderData.user.name}`);
    doc.text(`Email: ${orderData.user.email}`);
    doc.moveDown();
    
    doc.fontSize(14).text('Products:', { underline: true });
    doc.moveDown();
    
    orderData.products.forEach((item, index) => {
      doc.fontSize(10).text(
        `${index + 1}. ${item.title} - Qty: ${item.quantity} - Rs.${item.price} = Rs.${item.price * item.quantity}`
      );
    });
    
    doc.moveDown();
    doc.fontSize(14).text(`Total Amount: Rs.${orderData.totalAmount}`, { bold: true });
    
    doc.end();
  });
}

export default router;
