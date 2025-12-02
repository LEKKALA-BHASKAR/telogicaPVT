import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import emailRoutes from './routes/emailRoutes.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/email', emailRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Email server is running',
    timestamp: new Date().toISOString()
  });
});

// List all available endpoints
app.get('/api/endpoints', (req, res) => {
  res.json({
    success: true,
    message: 'Available Email API Endpoints',
    endpoints: {
      health: {
        method: 'GET',
        path: '/api/health',
        description: 'Check if email server is running'
      },
      test: {
        method: 'POST',
        path: '/api/email/test',
        description: 'Send a test email',
        body: { to: 'optional - email address' }
      },
      quote: {
        request: {
          method: 'POST',
          path: '/api/email/quote/request',
          description: 'Send quote request notification (to user + admin)',
          body: {
            buyer: { email: 'required', fullName: 'required', mobile: 'optional', companyName: 'optional' },
            address: { houseFlat: 'optional', streetArea: 'optional', landmark: 'optional', city: 'optional', state: 'optional', pincode: 'optional' },
            products: [{ title: 'required', quantity: 'required', price: 'required' }],
            originalTotal: 'required',
            quoteId: 'required',
            userMessage: 'optional'
          }
        },
        respond: {
          method: 'POST',
          path: '/api/email/quote/respond',
          description: 'Send quote response notification (to user)',
          body: {
            buyer: { email: 'required', fullName: 'required' },
            products: [{ title: 'required', quantity: 'required', price: 'required' }],
            originalTotal: 'required',
            quotedTotal: 'required',
            discountPercentage: 'optional',
            adminNotes: 'optional',
            validUntil: 'optional',
            quoteId: 'required'
          }
        },
        accept: {
          method: 'POST',
          path: '/api/email/quote/accept',
          description: 'Send quote accepted notification (to user + admin)',
          body: {
            buyer: { email: 'required', fullName: 'required' },
            products: [{ title: 'required', quantity: 'required', price: 'required' }],
            quotedTotal: 'required',
            quoteId: 'required'
          }
        },
        reject: {
          method: 'POST',
          path: '/api/email/quote/reject',
          description: 'Send quote rejected notification (to admin)',
          body: {
            buyer: { email: 'required', fullName: 'required' },
            products: [{ title: 'required', quantity: 'required', price: 'required' }],
            quoteId: 'required',
            originalTotal: 'optional'
          }
        }
      },
      order: {
        placed: {
          method: 'POST',
          path: '/api/email/order/placed',
          description: 'Send order placed notification (to user + admin)',
          body: {
            user: { email: 'required', name: 'required' },
            products: [{ title: 'required', quantity: 'required', price: 'required' }],
            totalAmount: 'required',
            orderId: 'required',
            paymentId: 'optional',
            shippingAddress: { name: 'optional', address: 'optional', city: 'optional', pincode: 'optional', phone: 'optional' },
            invoiceUrl: 'optional'
          }
        },
        statusUpdate: {
          method: 'POST',
          path: '/api/email/order/status-update',
          description: 'Send order status update notification (to user)',
          body: {
            user: { email: 'required', name: 'required' },
            orderId: 'required',
            orderStatus: 'required (processing|confirmed|shipped|out_for_delivery|delivered|cancelled|returned)',
            products: [{ title: 'required', quantity: 'required', price: 'required' }],
            totalAmount: 'optional',
            trackingNumber: 'optional',
            estimatedDelivery: 'optional'
          }
        }
      },
      cart: {
        update: {
          method: 'POST',
          path: '/api/email/cart/update',
          description: 'Send cart update notification (to user)',
          body: {
            user: { email: 'required', name: 'required' },
            cartItems: [{ title: 'required', quantity: 'required', price: 'required' }],
            cartTotal: 'optional',
            action: 'optional (add|remove|update|clear)'
          }
        }
      },
      message: {
        toUser: {
          method: 'POST',
          path: '/api/email/message/to-user',
          description: 'Send message notification (to user) when admin replies',
          body: {
            buyer: { email: 'required', fullName: 'required' },
            quoteId: 'required',
            messageContent: 'required',
            senderName: 'optional'
          }
        },
        toAdmin: {
          method: 'POST',
          path: '/api/email/message/to-admin',
          description: 'Send message notification (to admin) when user sends message',
          body: {
            buyer: { email: 'required', fullName: 'required' },
            quoteId: 'required',
            messageContent: 'required'
          }
        }
      }
    }
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found. Visit /api/endpoints for available endpoints.'
  });
});

const PORT = process.env.PORT || 8002;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`📧 Email Server running on port ${PORT}`);
  console.log(`📋 View all endpoints at http://localhost:${PORT}/api/endpoints`);
});
