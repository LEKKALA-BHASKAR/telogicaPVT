/**
 * Email Templates for Telogica
 * All email templates are defined here for different notification scenarios
 */

// Common styles for all emails
const commonStyles = `
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background: linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%); padding: 30px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 28px; }
    .header p { color: #E9D5FF; margin: 5px 0 0 0; font-size: 14px; }
    .content { padding: 30px; }
    .content h2 { color: #1F2937; margin-top: 0; }
    .content p { color: #4B5563; line-height: 1.6; }
    .info-box { background-color: #F3F4F6; border-radius: 8px; padding: 20px; margin: 20px 0; }
    .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #E5E7EB; }
    .info-row:last-child { border-bottom: none; }
    .info-label { color: #6B7280; font-weight: 500; }
    .info-value { color: #1F2937; font-weight: 600; }
    .product-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .product-table th { background-color: #7C3AED; color: white; padding: 12px; text-align: left; }
    .product-table td { padding: 12px; border-bottom: 1px solid #E5E7EB; }
    .product-table tr:nth-child(even) { background-color: #F9FAFB; }
    .total-row { background-color: #F3E8FF !important; font-weight: bold; }
    .total-row td { color: #7C3AED; }
    .button { display: inline-block; background-color: #7C3AED; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; }
    .button:hover { background-color: #5B21B6; }
    .status-badge { display: inline-block; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; }
    .status-pending { background-color: #FEF3C7; color: #92400E; }
    .status-quoted { background-color: #DBEAFE; color: #1E40AF; }
    .status-accepted { background-color: #D1FAE5; color: #065F46; }
    .status-rejected { background-color: #FEE2E2; color: #991B1B; }
    .status-ordered { background-color: #D1FAE5; color: #065F46; }
    .footer { background-color: #1F2937; padding: 30px; text-align: center; }
    .footer p { color: #9CA3AF; margin: 5px 0; font-size: 12px; }
    .footer a { color: #A78BFA; text-decoration: none; }
    .highlight { color: #7C3AED; font-weight: 600; }
    .address-box { background-color: #F9FAFB; border-left: 4px solid #7C3AED; padding: 15px; margin: 15px 0; }
  </style>
`;

// Header template
const getHeader = () => `
  <div class="header">
    <h1>TELOGICA</h1>
    <p>Premium Telecom Equipment</p>
  </div>
`;

// Footer template
const getFooter = () => `
  <div class="footer">
    <p>Thank you for choosing Telogica!</p>
    <p>For any queries, contact us at <a href="mailto:telogicaweb@gmail.com">telogicaweb@gmail.com</a></p>
    <p>&copy; ${new Date().getFullYear()} Telogica Ltd. All rights reserved.</p>
  </div>
`;

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(amount);
};

// Generate products table HTML
const getProductsTable = (products) => {
  const rows = products.map(p => `
    <tr>
      <td>${p.title}</td>
      <td style="text-align: center;">${p.quantity}</td>
      <td style="text-align: right;">${formatCurrency(p.price)}</td>
      <td style="text-align: right;">${formatCurrency(p.price * p.quantity)}</td>
    </tr>
  `).join('');

  const total = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);

  return `
    <table class="product-table">
      <thead>
        <tr>
          <th>Product</th>
          <th style="text-align: center;">Qty</th>
          <th style="text-align: right;">Price</th>
          <th style="text-align: right;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
        <tr class="total-row">
          <td colspan="3" style="text-align: right;">Total Amount:</td>
          <td style="text-align: right;">${formatCurrency(total)}</td>
        </tr>
      </tbody>
    </table>
  `;
};

/* -------------------------------------------------------------------------- */
/* QUOTE TEMPLATES */
/* -------------------------------------------------------------------------- */

// Quote Request - User Confirmation
export const quoteRequestUserTemplate = (data) => {
  const { buyer, products, originalTotal, quoteId, userMessage } = data;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>${commonStyles}</head>
    <body>
      <div class="container">
        ${getHeader()}
        <div class="content">
          <h2>Quote Request Received! 🎉</h2>
          <p>Dear <strong>${buyer.fullName}</strong>,</p>
          <p>Thank you for your quote request. We have received your request and our team will review it shortly.</p>
          
          <div class="info-box">
            <h3 style="margin-top: 0; color: #7C3AED;">Quote Details</h3>
            <p><strong>Quote ID:</strong> ${quoteId}</p>
            <p><strong>Status:</strong> <span class="status-badge status-pending">Pending Review</span></p>
          </div>

          ${getProductsTable(products)}

          <div class="info-box">
            <p><strong>Original Total:</strong> <span class="highlight">${formatCurrency(originalTotal)}</span></p>
          </div>

          ${userMessage ? `
          <div class="address-box">
            <p style="margin: 0;"><strong>Your Message:</strong></p>
            <p style="margin: 10px 0 0 0; color: #4B5563;">${userMessage}</p>
          </div>
          ` : ''}

          <p>We will send you a customized quote with the best possible pricing within 24-48 hours.</p>
          
          <p style="margin-top: 30px;">Best regards,<br><strong>The Telogica Team</strong></p>
        </div>
        ${getFooter()}
      </div>
    </body>
    </html>
  `;
};

// Quote Request - Admin Notification
export const quoteRequestAdminTemplate = (data) => {
  const { buyer, address, products, originalTotal, quoteId, userMessage } = data;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>${commonStyles}</head>
    <body>
      <div class="container">
        ${getHeader()}
        <div class="content">
          <h2>🔔 New Quote Request</h2>
          <p>A new quote request has been submitted and requires your attention.</p>
          
          <div class="info-box">
            <h3 style="margin-top: 0; color: #7C3AED;">Customer Details</h3>
            <table style="width: 100%;">
              <tr><td style="padding: 5px 0;"><strong>Name:</strong></td><td>${buyer.fullName}</td></tr>
              <tr><td style="padding: 5px 0;"><strong>Email:</strong></td><td><a href="mailto:${buyer.email}">${buyer.email}</a></td></tr>
              <tr><td style="padding: 5px 0;"><strong>Mobile:</strong></td><td>${buyer.mobile}</td></tr>
              ${buyer.companyName ? `<tr><td style="padding: 5px 0;"><strong>Company:</strong></td><td>${buyer.companyName}</td></tr>` : ''}
            </table>
          </div>

          <div class="address-box">
            <p style="margin: 0;"><strong>Shipping Address:</strong></p>
            <p style="margin: 10px 0 0 0;">
              ${address.houseFlat}, ${address.streetArea}<br>
              ${address.landmark ? address.landmark + '<br>' : ''}
              ${address.city}, ${address.state} - ${address.pincode}
            </p>
          </div>

          <div class="info-box">
            <p><strong>Quote ID:</strong> ${quoteId}</p>
            <p><strong>Total Value:</strong> <span class="highlight">${formatCurrency(originalTotal)}</span></p>
          </div>

          ${getProductsTable(products)}

          ${userMessage ? `
          <div class="address-box">
            <p style="margin: 0;"><strong>Customer's Message:</strong></p>
            <p style="margin: 10px 0 0 0; color: #4B5563;">${userMessage}</p>
          </div>
          ` : ''}

          <p><strong>Action Required:</strong> Please review this quote request and respond with your best offer.</p>
        </div>
        ${getFooter()}
      </div>
    </body>
    </html>
  `;
};

// Quote Response - User Notification (Admin responded with price)
export const quoteResponseUserTemplate = (data) => {
  const { buyer, products, originalTotal, quotedTotal, discountPercentage, adminNotes, validUntil, quoteId } = data;
  
  const savings = originalTotal - quotedTotal;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>${commonStyles}</head>
    <body>
      <div class="container">
        ${getHeader()}
        <div class="content">
          <h2>Your Quote is Ready! 💰</h2>
          <p>Dear <strong>${buyer.fullName}</strong>,</p>
          <p>Great news! We have reviewed your quote request and are pleased to offer you the following pricing:</p>
          
          <div class="info-box">
            <h3 style="margin-top: 0; color: #7C3AED;">Quote Summary</h3>
            <p><strong>Quote ID:</strong> ${quoteId}</p>
            <p><strong>Status:</strong> <span class="status-badge status-quoted">Quoted</span></p>
          </div>

          ${getProductsTable(products)}

          <div class="info-box" style="background-color: #F3E8FF;">
            <table style="width: 100%;">
              <tr><td style="padding: 5px 0;"><strong>Original Price:</strong></td><td style="text-align: right;">${formatCurrency(originalTotal)}</td></tr>
              <tr><td style="padding: 5px 0;"><strong>Discount:</strong></td><td style="text-align: right; color: #059669;">${discountPercentage?.toFixed(1) || 0}%</td></tr>
              <tr><td style="padding: 5px 0;"><strong>Your Savings:</strong></td><td style="text-align: right; color: #059669;">${formatCurrency(savings)}</td></tr>
              <tr style="border-top: 2px solid #7C3AED;"><td style="padding: 10px 0;"><strong style="font-size: 18px;">Your Price:</strong></td><td style="text-align: right; font-size: 24px; color: #7C3AED; font-weight: bold;">${formatCurrency(quotedTotal)}</td></tr>
            </table>
          </div>

          ${adminNotes ? `
          <div class="address-box">
            <p style="margin: 0;"><strong>Message from Admin:</strong></p>
            <p style="margin: 10px 0 0 0; color: #4B5563;">${adminNotes}</p>
          </div>
          ` : ''}

          <div class="info-box" style="background-color: #FEF3C7; border-left: 4px solid #F59E0B;">
            <p style="margin: 0; color: #92400E;">
              <strong>⏰ Valid Until:</strong> ${new Date(validUntil).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <p>To proceed with this quote, please accept it from your account or contact us.</p>
          
          <p style="margin-top: 30px;">Best regards,<br><strong>The Telogica Team</strong></p>
        </div>
        ${getFooter()}
      </div>
    </body>
    </html>
  `;
};

// Quote Accepted - User Confirmation
export const quoteAcceptedUserTemplate = (data) => {
  const { buyer, products, quotedTotal, quoteId } = data;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>${commonStyles}</head>
    <body>
      <div class="container">
        ${getHeader()}
        <div class="content">
          <h2>Quote Accepted! ✅</h2>
          <p>Dear <strong>${buyer.fullName}</strong>,</p>
          <p>Your quote has been successfully accepted. You can now proceed to checkout and complete your purchase.</p>
          
          <div class="info-box">
            <h3 style="margin-top: 0; color: #7C3AED;">Quote Details</h3>
            <p><strong>Quote ID:</strong> ${quoteId}</p>
            <p><strong>Status:</strong> <span class="status-badge status-accepted">Accepted</span></p>
            <p><strong>Total Amount:</strong> <span class="highlight">${formatCurrency(quotedTotal)}</span></p>
          </div>

          ${getProductsTable(products)}

          <p>You can proceed to payment from your dashboard to complete this order.</p>
          
          <p style="margin-top: 30px;">Best regards,<br><strong>The Telogica Team</strong></p>
        </div>
        ${getFooter()}
      </div>
    </body>
    </html>
  `;
};

// Quote Accepted - Admin Notification
export const quoteAcceptedAdminTemplate = (data) => {
  const { buyer, products, quotedTotal, quoteId } = data;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>${commonStyles}</head>
    <body>
      <div class="container">
        ${getHeader()}
        <div class="content">
          <h2>✅ Quote Accepted by Customer</h2>
          <p>A customer has accepted their quote and may proceed to payment soon.</p>
          
          <div class="info-box">
            <h3 style="margin-top: 0; color: #7C3AED;">Quote Details</h3>
            <p><strong>Quote ID:</strong> ${quoteId}</p>
            <p><strong>Customer:</strong> ${buyer.fullName} (${buyer.email})</p>
            <p><strong>Status:</strong> <span class="status-badge status-accepted">Accepted</span></p>
            <p><strong>Total Amount:</strong> <span class="highlight">${formatCurrency(quotedTotal)}</span></p>
          </div>

          ${getProductsTable(products)}
        </div>
        ${getFooter()}
      </div>
    </body>
    </html>
  `;
};

// Quote Rejected - Admin Notification
export const quoteRejectedAdminTemplate = (data) => {
  const { buyer, products, quoteId, originalTotal } = data;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>${commonStyles}</head>
    <body>
      <div class="container">
        ${getHeader()}
        <div class="content">
          <h2>❌ Quote Rejected by Customer</h2>
          <p>A customer has rejected their quote.</p>
          
          <div class="info-box">
            <h3 style="margin-top: 0; color: #7C3AED;">Quote Details</h3>
            <p><strong>Quote ID:</strong> ${quoteId}</p>
            <p><strong>Customer:</strong> ${buyer.fullName} (${buyer.email})</p>
            <p><strong>Status:</strong> <span class="status-badge status-rejected">Rejected</span></p>
            <p><strong>Quote Value:</strong> ${formatCurrency(originalTotal)}</p>
          </div>

          ${getProductsTable(products)}
        </div>
        ${getFooter()}
      </div>
    </body>
    </html>
  `;
};

/* -------------------------------------------------------------------------- */
/* ORDER TEMPLATES */
/* -------------------------------------------------------------------------- */

// Order Placed - User Confirmation
export const orderPlacedUserTemplate = (data) => {
  const { user, products, totalAmount, orderId, paymentId, shippingAddress, invoiceUrl } = data;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>${commonStyles}</head>
    <body>
      <div class="container">
        ${getHeader()}
        <div class="content">
          <h2>Order Confirmed! 🎉</h2>
          <p>Dear <strong>${user.name}</strong>,</p>
          <p>Thank you for your purchase! Your order has been successfully placed and payment has been received.</p>
          
          <div class="info-box" style="background-color: #D1FAE5;">
            <h3 style="margin-top: 0; color: #065F46;">Order Summary</h3>
            <p><strong>Order ID:</strong> ${orderId}</p>
            <p><strong>Payment ID:</strong> ${paymentId}</p>
            <p><strong>Status:</strong> <span class="status-badge status-ordered">Confirmed</span></p>
          </div>

          ${getProductsTable(products)}

          <div class="info-box">
            <p><strong>Total Paid:</strong> <span class="highlight" style="font-size: 20px;">${formatCurrency(totalAmount)}</span></p>
          </div>

          ${shippingAddress ? `
          <div class="address-box">
            <p style="margin: 0;"><strong>Shipping Address:</strong></p>
            <p style="margin: 10px 0 0 0;">
              ${shippingAddress.name}<br>
              ${shippingAddress.address}<br>
              ${shippingAddress.city}, ${shippingAddress.pincode}<br>
              Phone: ${shippingAddress.phone}
            </p>
          </div>
          ` : ''}

          ${invoiceUrl ? `
          <p style="text-align: center;">
            <a href="${invoiceUrl}" class="button">📄 Download Invoice</a>
          </p>
          ` : ''}

          <p>We'll notify you once your order has been shipped.</p>
          
          <p style="margin-top: 30px;">Best regards,<br><strong>The Telogica Team</strong></p>
        </div>
        ${getFooter()}
      </div>
    </body>
    </html>
  `;
};

// Order Placed - Admin Notification
export const orderPlacedAdminTemplate = (data) => {
  const { user, products, totalAmount, orderId, paymentId, shippingAddress } = data;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>${commonStyles}</head>
    <body>
      <div class="container">
        ${getHeader()}
        <div class="content">
          <h2>🛒 New Order Received!</h2>
          <p>A new order has been placed and payment has been received.</p>
          
          <div class="info-box">
            <h3 style="margin-top: 0; color: #7C3AED;">Customer Details</h3>
            <table style="width: 100%;">
              <tr><td style="padding: 5px 0;"><strong>Name:</strong></td><td>${user.name}</td></tr>
              <tr><td style="padding: 5px 0;"><strong>Email:</strong></td><td><a href="mailto:${user.email}">${user.email}</a></td></tr>
            </table>
          </div>

          <div class="info-box" style="background-color: #D1FAE5;">
            <h3 style="margin-top: 0; color: #065F46;">Order Details</h3>
            <p><strong>Order ID:</strong> ${orderId}</p>
            <p><strong>Payment ID:</strong> ${paymentId}</p>
            <p><strong>Total Amount:</strong> <span class="highlight">${formatCurrency(totalAmount)}</span></p>
          </div>

          ${getProductsTable(products)}

          ${shippingAddress ? `
          <div class="address-box">
            <p style="margin: 0;"><strong>Shipping Address:</strong></p>
            <p style="margin: 10px 0 0 0;">
              ${shippingAddress.name}<br>
              ${shippingAddress.address}<br>
              ${shippingAddress.city}, ${shippingAddress.pincode}<br>
              Phone: ${shippingAddress.phone}
            </p>
          </div>
          ` : ''}

          <p><strong>Action Required:</strong> Please process this order for shipping.</p>
        </div>
        ${getFooter()}
      </div>
    </body>
    </html>
  `;
};

// Order Status Update - User Notification
export const orderStatusUpdateTemplate = (data) => {
  const { user, orderId, orderStatus, products, totalAmount, trackingNumber, estimatedDelivery } = data;
  
  const statusMessages = {
    processing: 'Your order is being processed',
    confirmed: 'Your order has been confirmed',
    shipped: 'Great news! Your order has been shipped',
    out_for_delivery: 'Your order is out for delivery',
    delivered: 'Your order has been delivered',
    cancelled: 'Your order has been cancelled',
    returned: 'Your return request has been processed'
  };
  
  const statusEmojis = {
    processing: '⏳',
    confirmed: '✅',
    shipped: '📦',
    out_for_delivery: '🚚',
    delivered: '🎉',
    cancelled: '❌',
    returned: '↩️'
  };
  
  return `
    <!DOCTYPE html>
    <html>
    <head>${commonStyles}</head>
    <body>
      <div class="container">
        ${getHeader()}
        <div class="content">
          <h2>${statusEmojis[orderStatus] || '📋'} Order Update</h2>
          <p>Dear <strong>${user.name}</strong>,</p>
          <p>${statusMessages[orderStatus] || 'Your order status has been updated'}.</p>
          
          <div class="info-box">
            <h3 style="margin-top: 0; color: #7C3AED;">Order Details</h3>
            <p><strong>Order ID:</strong> ${orderId}</p>
            <p><strong>Status:</strong> <span class="status-badge status-${orderStatus === 'delivered' ? 'accepted' : orderStatus === 'cancelled' ? 'rejected' : 'quoted'}">${orderStatus.replace('_', ' ').toUpperCase()}</span></p>
            ${trackingNumber ? `<p><strong>Tracking Number:</strong> ${trackingNumber}</p>` : ''}
            ${estimatedDelivery ? `<p><strong>Estimated Delivery:</strong> ${new Date(estimatedDelivery).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>` : ''}
          </div>

          ${getProductsTable(products)}

          <div class="info-box">
            <p><strong>Order Total:</strong> <span class="highlight">${formatCurrency(totalAmount)}</span></p>
          </div>
          
          <p style="margin-top: 30px;">Best regards,<br><strong>The Telogica Team</strong></p>
        </div>
        ${getFooter()}
      </div>
    </body>
    </html>
  `;
};

/* -------------------------------------------------------------------------- */
/* CART TEMPLATES */
/* -------------------------------------------------------------------------- */

// Cart Update - User Notification
export const cartUpdateUserTemplate = (data) => {
  const { user, cartItems, cartTotal, action } = data;
  
  const actionMessages = {
    add: 'Item added to your cart',
    remove: 'Item removed from your cart',
    update: 'Your cart has been updated',
    clear: 'Your cart has been cleared'
  };
  
  return `
    <!DOCTYPE html>
    <html>
    <head>${commonStyles}</head>
    <body>
      <div class="container">
        ${getHeader()}
        <div class="content">
          <h2>🛒 Cart Updated</h2>
          <p>Dear <strong>${user.name}</strong>,</p>
          <p>${actionMessages[action] || 'Your cart has been updated'}.</p>
          
          ${cartItems && cartItems.length > 0 ? `
          <div class="info-box">
            <h3 style="margin-top: 0; color: #7C3AED;">Your Cart</h3>
            ${getProductsTable(cartItems)}
            <p style="text-align: right; font-size: 18px;"><strong>Cart Total:</strong> <span class="highlight">${formatCurrency(cartTotal)}</span></p>
          </div>
          
          <p style="text-align: center;">
            <a href="#" class="button">Complete Your Purchase</a>
          </p>
          ` : `
          <div class="info-box">
            <p style="text-align: center; color: #6B7280;">Your cart is empty</p>
          </div>
          `}
          
          <p style="margin-top: 30px;">Best regards,<br><strong>The Telogica Team</strong></p>
        </div>
        ${getFooter()}
      </div>
    </body>
    </html>
  `;
};

/* -------------------------------------------------------------------------- */
/* MESSAGE TEMPLATES */
/* -------------------------------------------------------------------------- */

// New Message - User Notification (Admin sent a message)
export const newMessageUserTemplate = (data) => {
  const { buyer, quoteId, messageContent, senderName } = data;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>${commonStyles}</head>
    <body>
      <div class="container">
        ${getHeader()}
        <div class="content">
          <h2>💬 New Message on Your Quote</h2>
          <p>Dear <strong>${buyer.fullName}</strong>,</p>
          <p>You have received a new message regarding your quote.</p>
          
          <div class="info-box">
            <p><strong>Quote ID:</strong> ${quoteId}</p>
            <p><strong>From:</strong> ${senderName}</p>
          </div>

          <div class="address-box">
            <p style="margin: 0;"><strong>Message:</strong></p>
            <p style="margin: 10px 0 0 0; color: #4B5563;">${messageContent}</p>
          </div>

          <p>Please log in to your account to reply to this message.</p>
          
          <p style="margin-top: 30px;">Best regards,<br><strong>The Telogica Team</strong></p>
        </div>
        ${getFooter()}
      </div>
    </body>
    </html>
  `;
};

// New Message - Admin Notification (User sent a message)
export const newMessageAdminTemplate = (data) => {
  const { buyer, quoteId, messageContent } = data;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>${commonStyles}</head>
    <body>
      <div class="container">
        ${getHeader()}
        <div class="content">
          <h2>💬 New Customer Message</h2>
          <p>A customer has sent a new message on their quote.</p>
          
          <div class="info-box">
            <p><strong>Quote ID:</strong> ${quoteId}</p>
            <p><strong>Customer:</strong> ${buyer.fullName} (${buyer.email})</p>
          </div>

          <div class="address-box">
            <p style="margin: 0;"><strong>Message:</strong></p>
            <p style="margin: 10px 0 0 0; color: #4B5563;">${messageContent}</p>
          </div>

          <p><strong>Action Required:</strong> Please respond to this customer message.</p>
        </div>
        ${getFooter()}
      </div>
    </body>
    </html>
  `;
};

export default {
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
};
