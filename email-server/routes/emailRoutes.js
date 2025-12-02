import express from 'express';
import transporter from '../config/emailConfig.js';
import {
  quoteRequestUserTemplate,
  quoteRequestAdminTemplate,
  quoteResponseUserTemplate,
  quoteAcceptedUserTemplate,
  quoteAcceptedAdminTemplate,
  quoteRejectedAdminTemplate,
  orderPlacedUserTemplate,
  orderPlacedAdminTemplate,
  orderStatusUpdateTemplate,
  cartUpdateUserTemplate,
  newMessageUserTemplate,
  newMessageAdminTemplate
} from '../templates/emailTemplates.js';

const router = express.Router();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'telogicaweb@gmail.com';

/**
 * Helper function to send email
 */
const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: `"Telogica" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
  };
  
  return transporter.sendMail(mailOptions);
};

/* -------------------------------------------------------------------------- */
/* QUOTE EMAIL ENDPOINTS */
/* -------------------------------------------------------------------------- */

/**
 * POST /api/email/quote/request
 * Send email when user submits a quote request
 * Sends to: User (confirmation) + Admin (notification)
 */
router.post('/quote/request', async (req, res) => {
  try {
    const { buyer, address, products, originalTotal, quoteId, userMessage } = req.body;

    // Validate required fields
    if (!buyer?.email || !buyer?.fullName || !products || !quoteId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: buyer (email, fullName), products, quoteId'
      });
    }

    // Send email to user
    const userEmailHtml = quoteRequestUserTemplate({
      buyer,
      products,
      originalTotal,
      quoteId,
      userMessage
    });

    await sendEmail(
      buyer.email,
      'Quote Request Received - Telogica',
      userEmailHtml
    );

    // Send email to admin
    const adminEmailHtml = quoteRequestAdminTemplate({
      buyer,
      address,
      products,
      originalTotal,
      quoteId,
      userMessage
    });

    await sendEmail(
      ADMIN_EMAIL,
      `New Quote Request from ${buyer.fullName} - Telogica`,
      adminEmailHtml
    );

    res.json({
      success: true,
      message: 'Quote request emails sent successfully to user and admin'
    });
  } catch (error) {
    console.error('Quote request email error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * POST /api/email/quote/respond
 * Send email when admin responds to a quote with pricing
 * Sends to: User
 */
router.post('/quote/respond', async (req, res) => {
  try {
    const { buyer, products, originalTotal, quotedTotal, discountPercentage, adminNotes, validUntil, quoteId } = req.body;

    // Validate required fields
    if (!buyer?.email || !buyer?.fullName || !quoteId || !quotedTotal) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: buyer (email, fullName), quoteId, quotedTotal'
      });
    }

    const emailHtml = quoteResponseUserTemplate({
      buyer,
      products,
      originalTotal,
      quotedTotal,
      discountPercentage,
      adminNotes,
      validUntil,
      quoteId
    });

    await sendEmail(
      buyer.email,
      'Your Quote is Ready! - Telogica',
      emailHtml
    );

    res.json({
      success: true,
      message: 'Quote response email sent successfully to user'
    });
  } catch (error) {
    console.error('Quote respond email error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * POST /api/email/quote/accept
 * Send email when user accepts a quote
 * Sends to: User (confirmation) + Admin (notification)
 */
router.post('/quote/accept', async (req, res) => {
  try {
    const { buyer, products, quotedTotal, quoteId } = req.body;

    // Validate required fields
    if (!buyer?.email || !buyer?.fullName || !quoteId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: buyer (email, fullName), quoteId'
      });
    }

    // Send email to user
    const userEmailHtml = quoteAcceptedUserTemplate({
      buyer,
      products,
      quotedTotal,
      quoteId
    });

    await sendEmail(
      buyer.email,
      'Quote Accepted - Telogica',
      userEmailHtml
    );

    // Send email to admin
    const adminEmailHtml = quoteAcceptedAdminTemplate({
      buyer,
      products,
      quotedTotal,
      quoteId
    });

    await sendEmail(
      ADMIN_EMAIL,
      `Quote Accepted by ${buyer.fullName} - Telogica`,
      adminEmailHtml
    );

    res.json({
      success: true,
      message: 'Quote accepted emails sent successfully to user and admin'
    });
  } catch (error) {
    console.error('Quote accept email error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * POST /api/email/quote/reject
 * Send email when user rejects a quote
 * Sends to: Admin (notification)
 */
router.post('/quote/reject', async (req, res) => {
  try {
    const { buyer, products, quoteId, originalTotal } = req.body;

    // Validate required fields
    if (!buyer?.email || !buyer?.fullName || !quoteId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: buyer (email, fullName), quoteId'
      });
    }

    // Send email to admin
    const adminEmailHtml = quoteRejectedAdminTemplate({
      buyer,
      products,
      quoteId,
      originalTotal
    });

    await sendEmail(
      ADMIN_EMAIL,
      `Quote Rejected by ${buyer.fullName} - Telogica`,
      adminEmailHtml
    );

    res.json({
      success: true,
      message: 'Quote rejected notification sent to admin'
    });
  } catch (error) {
    console.error('Quote reject email error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/* -------------------------------------------------------------------------- */
/* ORDER EMAIL ENDPOINTS */
/* -------------------------------------------------------------------------- */

/**
 * POST /api/email/order/placed
 * Send email when order is placed (payment verified)
 * Sends to: User (confirmation) + Admin (notification)
 */
router.post('/order/placed', async (req, res) => {
  try {
    const { user, products, totalAmount, orderId, paymentId, shippingAddress, invoiceUrl } = req.body;

    // Validate required fields
    if (!user?.email || !user?.name || !orderId || !products) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: user (email, name), orderId, products'
      });
    }

    // Send email to user
    const userEmailHtml = orderPlacedUserTemplate({
      user,
      products,
      totalAmount,
      orderId,
      paymentId,
      shippingAddress,
      invoiceUrl
    });

    await sendEmail(
      user.email,
      'Order Confirmed! - Telogica',
      userEmailHtml
    );

    // Send email to admin
    const adminEmailHtml = orderPlacedAdminTemplate({
      user,
      products,
      totalAmount,
      orderId,
      paymentId,
      shippingAddress
    });

    await sendEmail(
      ADMIN_EMAIL,
      `New Order Received from ${user.name} - Telogica`,
      adminEmailHtml
    );

    res.json({
      success: true,
      message: 'Order placed emails sent successfully to user and admin'
    });
  } catch (error) {
    console.error('Order placed email error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * POST /api/email/order/status-update
 * Send email when order status is updated
 * Sends to: User
 */
router.post('/order/status-update', async (req, res) => {
  try {
    const { user, orderId, orderStatus, products, totalAmount, trackingNumber, estimatedDelivery } = req.body;

    // Validate required fields
    if (!user?.email || !user?.name || !orderId || !orderStatus) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: user (email, name), orderId, orderStatus'
      });
    }

    const emailHtml = orderStatusUpdateTemplate({
      user,
      orderId,
      orderStatus,
      products,
      totalAmount,
      trackingNumber,
      estimatedDelivery
    });

    const statusLabels = {
      processing: 'Order Processing',
      confirmed: 'Order Confirmed',
      shipped: 'Order Shipped',
      out_for_delivery: 'Out for Delivery',
      delivered: 'Order Delivered',
      cancelled: 'Order Cancelled',
      returned: 'Return Processed'
    };

    await sendEmail(
      user.email,
      `${statusLabels[orderStatus] || 'Order Update'} - Telogica`,
      emailHtml
    );

    res.json({
      success: true,
      message: 'Order status update email sent successfully'
    });
  } catch (error) {
    console.error('Order status update email error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/* -------------------------------------------------------------------------- */
/* CART EMAIL ENDPOINTS */
/* -------------------------------------------------------------------------- */

/**
 * POST /api/email/cart/update
 * Send email when cart is updated
 * Sends to: User
 */
router.post('/cart/update', async (req, res) => {
  try {
    const { user, cartItems, cartTotal, action } = req.body;

    // Validate required fields
    if (!user?.email || !user?.name) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: user (email, name)'
      });
    }

    const emailHtml = cartUpdateUserTemplate({
      user,
      cartItems,
      cartTotal,
      action
    });

    await sendEmail(
      user.email,
      'Cart Updated - Telogica',
      emailHtml
    );

    res.json({
      success: true,
      message: 'Cart update email sent successfully'
    });
  } catch (error) {
    console.error('Cart update email error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/* -------------------------------------------------------------------------- */
/* MESSAGE EMAIL ENDPOINTS */
/* -------------------------------------------------------------------------- */

/**
 * POST /api/email/message/to-user
 * Send email when admin sends a message on quote
 * Sends to: User
 */
router.post('/message/to-user', async (req, res) => {
  try {
    const { buyer, quoteId, messageContent, senderName } = req.body;

    // Validate required fields
    if (!buyer?.email || !buyer?.fullName || !quoteId || !messageContent) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: buyer (email, fullName), quoteId, messageContent'
      });
    }

    const emailHtml = newMessageUserTemplate({
      buyer,
      quoteId,
      messageContent,
      senderName: senderName || 'Admin'
    });

    await sendEmail(
      buyer.email,
      'New Message on Your Quote - Telogica',
      emailHtml
    );

    res.json({
      success: true,
      message: 'Message notification email sent to user'
    });
  } catch (error) {
    console.error('Message to user email error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * POST /api/email/message/to-admin
 * Send email when user sends a message on quote
 * Sends to: Admin
 */
router.post('/message/to-admin', async (req, res) => {
  try {
    const { buyer, quoteId, messageContent } = req.body;

    // Validate required fields
    if (!buyer?.email || !buyer?.fullName || !quoteId || !messageContent) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: buyer (email, fullName), quoteId, messageContent'
      });
    }

    const emailHtml = newMessageAdminTemplate({
      buyer,
      quoteId,
      messageContent
    });

    await sendEmail(
      ADMIN_EMAIL,
      `New Message from ${buyer.fullName} - Telogica`,
      emailHtml
    );

    res.json({
      success: true,
      message: 'Message notification email sent to admin'
    });
  } catch (error) {
    console.error('Message to admin email error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/* -------------------------------------------------------------------------- */
/* TEST EMAIL ENDPOINT */
/* -------------------------------------------------------------------------- */

/**
 * POST /api/email/test
 * Send a test email to verify email configuration
 */
router.post('/test', async (req, res) => {
  try {
    const { to } = req.body;
    const testEmail = to || ADMIN_EMAIL;

    await sendEmail(
      testEmail,
      'Test Email - Telogica Email Server',
      `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h1 style="color: #7C3AED;">✅ Email Server Working!</h1>
          <p>This is a test email from the Telogica Email Server.</p>
          <p>Time: ${new Date().toLocaleString()}</p>
        </div>
      `
    );

    res.json({
      success: true,
      message: `Test email sent successfully to ${testEmail}`
    });
  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
