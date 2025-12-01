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
      totalAmount,
      shippingAddress
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
      if (io) {
        io.emit('stockUpdate', {
          productId: product._id,
          stock: product.stock
        });
      }
      
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
      paymentId: razorpay_payment_id,
      user: req.user,
      products: orderProducts,
      totalAmount,
      shippingAddress
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
      shippingAddress,
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

// Generate professional invoice PDF
async function generateInvoice(orderData) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    const chunks = [];
    
    doc.on('data', chunk => chunks.push(chunk));
    doc.on('end', async () => {
      const pdfBuffer = Buffer.concat(chunks);
      
      // Upload to Cloudinary
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw',
          folder: 'invoices',
          format: 'pdf',
          public_id: `invoice_${orderData.orderId}_${Date.now()}`
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        }
      );
      
      Readable.from(pdfBuffer).pipe(stream);
    });
    
    const pageWidth = doc.page.width - 100;
    
    // Header with company branding
    doc.fillColor('#7C3AED')
       .fontSize(28)
       .font('Helvetica-Bold')
       .text('TELOGICA', 50, 50);
    
    doc.fillColor('#6B7280')
       .fontSize(10)
       .font('Helvetica')
       .text('Premium Telecom Equipment', 50, 80);
    
    // Invoice label
    doc.fillColor('#1F2937')
       .fontSize(24)
       .font('Helvetica-Bold')
       .text('INVOICE', 400, 50, { align: 'right' });
    
    // Invoice details box
    doc.fillColor('#6B7280')
       .fontSize(10)
       .font('Helvetica')
       .text(`Invoice No: INV-${orderData.orderId.slice(-8).toUpperCase()}`, 400, 80, { align: 'right' })
       .text(`Date: ${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}`, 400, 95, { align: 'right' })
       .text(`Payment ID: ${orderData.paymentId || 'N/A'}`, 400, 110, { align: 'right' });
    
    // Horizontal line
    doc.strokeColor('#E5E7EB')
       .lineWidth(1)
       .moveTo(50, 140)
       .lineTo(pageWidth + 50, 140)
       .stroke();
    
    // Bill To section
    doc.fillColor('#7C3AED')
       .fontSize(12)
       .font('Helvetica-Bold')
       .text('BILL TO', 50, 160);
    
    doc.fillColor('#1F2937')
       .fontSize(11)
       .font('Helvetica-Bold')
       .text(orderData.user.name, 50, 180);
    
    doc.fillColor('#6B7280')
       .fontSize(10)
       .font('Helvetica')
       .text(orderData.user.email, 50, 195);
    
    // Shipping address
    if (orderData.shippingAddress) {
      doc.fillColor('#7C3AED')
         .fontSize(12)
         .font('Helvetica-Bold')
         .text('SHIP TO', 300, 160);
      
      doc.fillColor('#1F2937')
         .fontSize(10)
         .font('Helvetica')
         .text(orderData.shippingAddress.name || orderData.user.name, 300, 180)
         .text(orderData.shippingAddress.address || '', 300, 195)
         .text(`${orderData.shippingAddress.city || ''}, ${orderData.shippingAddress.pincode || ''}`, 300, 210)
         .text(orderData.shippingAddress.phone || '', 300, 225);
    }
    
    // Products table header
    const tableTop = 270;
    
    // Table header background
    doc.fillColor('#F3F4F6')
       .rect(50, tableTop - 5, pageWidth, 25)
       .fill();
    
    doc.fillColor('#374151')
       .fontSize(10)
       .font('Helvetica-Bold')
       .text('#', 55, tableTop)
       .text('ITEM DESCRIPTION', 80, tableTop)
       .text('QTY', 350, tableTop, { width: 50, align: 'center' })
       .text('PRICE', 400, tableTop, { width: 70, align: 'right' })
       .text('TOTAL', 470, tableTop, { width: 75, align: 'right' });
    
    // Products list
    let yPosition = tableTop + 30;
    let subtotal = 0;
    
    orderData.products.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      
      // Alternate row background
      if (index % 2 === 0) {
        doc.fillColor('#FAFAFA')
           .rect(50, yPosition - 5, pageWidth, 25)
           .fill();
      }
      
      doc.fillColor('#6B7280')
         .fontSize(10)
         .font('Helvetica')
         .text(`${index + 1}`, 55, yPosition);
      
      doc.fillColor('#1F2937')
         .font('Helvetica')
         .text(item.title, 80, yPosition, { width: 250 });
      
      doc.fillColor('#6B7280')
         .text(item.quantity.toString(), 350, yPosition, { width: 50, align: 'center' })
         .text(`₹${item.price.toLocaleString('en-IN')}`, 400, yPosition, { width: 70, align: 'right' });
      
      doc.fillColor('#1F2937')
         .font('Helvetica-Bold')
         .text(`₹${itemTotal.toLocaleString('en-IN')}`, 470, yPosition, { width: 75, align: 'right' });
      
      yPosition += 30;
    });
    
    // Totals section
    const totalsTop = yPosition + 20;
    
    // Line above totals
    doc.strokeColor('#E5E7EB')
       .lineWidth(1)
       .moveTo(350, totalsTop - 10)
       .lineTo(pageWidth + 50, totalsTop - 10)
       .stroke();
    
    const tax = subtotal * 0.18;
    const shipping = subtotal > 10000 ? 0 : 500;
    
    doc.fillColor('#6B7280')
       .fontSize(10)
       .font('Helvetica')
       .text('Subtotal:', 400, totalsTop, { width: 70, align: 'right' })
       .text(`₹${subtotal.toLocaleString('en-IN')}`, 470, totalsTop, { width: 75, align: 'right' });
    
    doc.text('Tax (18% GST):', 400, totalsTop + 18, { width: 70, align: 'right' })
       .text(`₹${tax.toLocaleString('en-IN')}`, 470, totalsTop + 18, { width: 75, align: 'right' });
    
    doc.text('Shipping:', 400, totalsTop + 36, { width: 70, align: 'right' })
       .text(shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString('en-IN')}`, 470, totalsTop + 36, { width: 75, align: 'right' });
    
    // Total line
    doc.strokeColor('#7C3AED')
       .lineWidth(2)
       .moveTo(350, totalsTop + 55)
       .lineTo(pageWidth + 50, totalsTop + 55)
       .stroke();
    
    doc.fillColor('#7C3AED')
       .fontSize(14)
       .font('Helvetica-Bold')
       .text('TOTAL:', 400, totalsTop + 65, { width: 70, align: 'right' })
       .text(`₹${orderData.totalAmount.toLocaleString('en-IN')}`, 470, totalsTop + 65, { width: 75, align: 'right' });
    
    // Payment status badge
    doc.fillColor('#10B981')
       .fontSize(10)
       .font('Helvetica-Bold')
       .text('✓ PAID', 400, totalsTop + 90, { width: 145, align: 'right' });
    
    // Footer
    const footerTop = doc.page.height - 100;
    
    doc.strokeColor('#E5E7EB')
       .lineWidth(1)
       .moveTo(50, footerTop)
       .lineTo(pageWidth + 50, footerTop)
       .stroke();
    
    doc.fillColor('#9CA3AF')
       .fontSize(9)
       .font('Helvetica')
       .text('Thank you for your business!', 50, footerTop + 15, { align: 'center', width: pageWidth })
       .text('For any queries, please contact support@telogica.com', 50, footerTop + 30, { align: 'center', width: pageWidth })
       .text('Telogica Ltd. | Premium Telecom Equipment | www.telogica.com', 50, footerTop + 45, { align: 'center', width: pageWidth });
    
    doc.end();
  });
}

export default router;
