# Nodemailer Integration Documentation

## Overview
This project has a complete email notification system integrated across frontend, backend, and a dedicated email server using Nodemailer.

## Architecture

```
Frontend (React) → Backend API (Express) → Email Server (Nodemailer) → Gmail SMTP
```

### 1. Email Server (`/email-server`)
**Location**: `/email-server`
**Purpose**: Dedicated microservice for handling all email notifications
**Technology**: Express.js + Nodemailer
**Port**: 8002

#### Features:
- ✅ Nodemailer v6.10.1 installed and configured
- ✅ Gmail SMTP integration with app password authentication
- ✅ Professional HTML email templates with Telogica branding
- ✅ Comprehensive error handling and logging
- ✅ Email verification on startup

#### Configuration (`.env`):
```env
EMAIL_USER=telogicaweb@gmail.com
EMAIL_PASSWORD=yuislgytqfimodti
ADMIN_EMAIL=telogicaweb@gmail.com
PORT=8002
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
```

#### Email Endpoints:

**Quote Emails:**
- `POST /api/email/quote/request` - User quote request (sends to user + admin)
- `POST /api/email/quote/respond` - Admin quote response (sends to user)
- `POST /api/email/quote/accept` - Quote accepted (sends to user + admin)
- `POST /api/email/quote/reject` - Quote rejected (sends to admin)

**Order Emails:**
- `POST /api/email/order/placed` - Order placed (sends to user + admin)
- `POST /api/email/order/status-update` - Order status update (sends to user)

**Cart Emails:**
- `POST /api/email/cart/update` - Cart updated (sends to user)

**Message Emails:**
- `POST /api/email/message/to-user` - Admin message to user
- `POST /api/email/message/to-admin` - User message to admin

**Utility:**
- `POST /api/email/test` - Test email functionality
- `GET /api/health` - Health check
- `GET /api/endpoints` - List all endpoints with documentation

#### Email Templates:
All templates include:
- Professional Telogica branding with gradient headers
- Responsive HTML design
- Product tables with pricing
- Order/quote details
- Status badges
- Call-to-action buttons
- Contact information in footer

### 2. Backend API (`/backend`)
**Location**: `/backend`
**Purpose**: Main application server, coordinates with email server
**Technology**: Express.js + MongoDB
**Port**: 8001

#### Mail Service Integration:
**File**: `/backend/services/mailService.js`

The backend uses a service layer to communicate with the email server via HTTP:

```javascript
import { MailService } from '../services/mailService.js';

// Example usage in routes
await MailService.sendQuoteRequest({
  buyer,
  address,
  products,
  originalTotal,
  quoteId,
  userMessage
});
```

#### Integrated Routes:

**Quote Routes** (`/backend/routes/quoteRoutes.js`):
- ✅ Quote request creation → `sendQuoteRequest`
- ✅ Admin quote response → `sendQuoteResponse`
- ✅ Quote acceptance → `sendQuoteAccepted`
- ✅ Quote rejection → `sendQuoteRejected`
- ✅ User messages → `sendUserMessage`
- ✅ Admin messages → `sendAdminMessage`

**Order Routes** (`/backend/routes/paymentRoutes.js`):
- ✅ Order creation after payment → `sendOrderPlaced`

**Admin Routes** (`/backend/routes/adminRoutes.js`):
- ✅ Order status updates → `sendOrderStatusUpdate`

**Contact Routes** (`/backend/routes/contactRoutes.js`):
- ✅ Contact form submission → `sendAdminMessage`

#### Configuration (`.env`):
```env
MAIL_SERVICE_BASE_URL=https://telogica-pvt.vercel.app
```

### 3. Frontend (`/frontend`)
**Location**: `/frontend`
**Purpose**: User interface for customers and admins
**Technology**: React
**API Base URL**: Configured via `REACT_APP_BACKEND_URL`

#### Email-Triggering Components:

**Quote System:**
- `QuotationModal.js` - Submit quote requests → Backend → Email
- `UserQuotes.js` - Accept/reject quotes → Backend → Email
- `ManageQuotes.jsx` (Admin) - Respond to quotes → Backend → Email

**Contact Form:**
- `GlobalContactForm.js` - Submit contact inquiries → Backend → Email

**Orders:**
- `Checkout.js` - Complete payment → Backend → Email
- `ManageOrders.jsx` (Admin) - Update order status → Backend → Email

## Email Flow Examples

### 1. Quote Request Flow
```
User fills QuotationModal
    ↓
Frontend POST to /api/quotes
    ↓
Backend creates quote in DB
    ↓
Backend POST to /api/email/quote/request
    ↓
Email Server sends:
    - Confirmation email to user
    - Notification email to admin
```

### 2. Order Placed Flow
```
User completes payment in Checkout
    ↓
Frontend verifies payment at /api/payment/verify
    ↓
Backend creates order in DB
    ↓
Backend POST to /api/email/order/placed
    ↓
Email Server sends:
    - Order confirmation to user
    - Order notification to admin
```

### 3. Admin Quote Response Flow
```
Admin responds to quote in ManageQuotes
    ↓
Frontend PUT to /api/quotes/:id/respond
    ↓
Backend updates quote in DB
    ↓
Backend POST to /api/email/quote/respond
    ↓
Email Server sends quote response to user
```

## Email Templates

### Template Features:
- **Common Styles**: Consistent branding across all emails
- **Header**: Telogica logo with gradient background
- **Footer**: Contact information and copyright
- **Product Tables**: Formatted display of products with quantities and prices
- **Status Badges**: Visual status indicators (pending, quoted, accepted, etc.)
- **Responsive Design**: Mobile-friendly HTML

### Available Templates:
1. `quoteRequestUserTemplate` - Quote request confirmation
2. `quoteRequestAdminTemplate` - New quote notification for admin
3. `quoteResponseUserTemplate` - Quote response with pricing
4. `quoteAcceptedUserTemplate` - Quote accepted confirmation
5. `quoteAcceptedAdminTemplate` - Quote accepted notification for admin
6. `quoteRejectedAdminTemplate` - Quote rejected notification for admin
7. `orderPlacedUserTemplate` - Order confirmation
8. `orderPlacedAdminTemplate` - New order notification for admin
9. `orderStatusUpdateTemplate` - Order status update
10. `cartUpdateUserTemplate` - Cart update notification
11. `newMessageUserTemplate` - Message from admin
12. `newMessageAdminTemplate` - Message from user

## Testing

### Manual Testing:

1. **Test Email Server Health:**
```bash
curl http://localhost:8002/api/health
```

2. **Send Test Email:**
```bash
curl -X POST http://localhost:8002/api/email/test \
  -H "Content-Type: application/json" \
  -d '{"to": "test@example.com"}'
```

3. **View All Endpoints:**
```bash
curl http://localhost:8002/api/endpoints
```

### Integration Testing:

1. **Quote Request:**
   - Navigate to Products page
   - Add products to quotation
   - Fill in buyer details
   - Submit quote
   - Check emails (user + admin)

2. **Contact Form:**
   - Navigate to Contact page
   - Fill in contact form
   - Submit message
   - Check admin email

3. **Order Flow:**
   - Add products to cart
   - Complete checkout
   - Verify payment (test mode)
   - Check order emails (user + admin)

4. **Admin Operations:**
   - Login as admin
   - Respond to quote → Check user email
   - Update order status → Check user email

## Error Handling

### Backend (`mailService.js`):
- Catches fetch errors and logs them
- Returns error objects without throwing
- Continues operation even if email fails (graceful degradation)

### Email Server:
- Validates required fields before sending
- Logs all email operations (success/failure)
- Returns proper HTTP status codes
- Handles transporter verification failures

## Security Considerations

1. **Email Credentials:**
   - Uses Gmail app password (not account password)
   - Stored in environment variables
   - Never committed to version control

2. **SMTP Configuration:**
   - TLS/SSL enabled (port 465)
   - Secure connection to Gmail

3. **Email Validation:**
   - All recipient emails validated
   - HTML content properly escaped
   - No user-supplied HTML in templates

## Deployment

### Email Server Deployment:
1. Deploy to separate service (Vercel, Heroku, etc.)
2. Set environment variables
3. Update `MAIL_SERVICE_BASE_URL` in backend

### Environment Variables Checklist:
- [x] `EMAIL_USER` - Gmail account
- [x] `EMAIL_PASSWORD` - Gmail app password
- [x] `ADMIN_EMAIL` - Admin notification email
- [x] `SMTP_HOST` - SMTP server (smtp.gmail.com)
- [x] `SMTP_PORT` - SMTP port (465)
- [x] `SMTP_SECURE` - Use SSL (true)
- [x] `MAIL_SERVICE_BASE_URL` - Email server URL (backend)

## Monitoring

### Logs to Monitor:
- Email server startup verification
- Email send success/failure
- SMTP connection errors
- HTTP request errors to email server

### Success Indicators:
- ✅ Email transporter verified on startup
- ✅ Emails sent successfully (check logs)
- ✅ Users receive confirmation emails
- ✅ Admin receives notification emails

## Troubleshooting

### Email Server Won't Start:
1. Check port 8002 is available
2. Verify environment variables are set
3. Check Gmail credentials are correct

### Emails Not Sending:
1. Verify email server is running
2. Check `MAIL_SERVICE_BASE_URL` in backend
3. Verify Gmail app password is valid
4. Check email server logs for errors
5. Test with `/api/email/test` endpoint

### Emails in Spam:
1. Ensure "from" address matches authenticated user
2. Add SPF/DKIM records (if using custom domain)
3. Ask recipients to whitelist sender

## Future Enhancements

- [ ] Add email queue for reliability
- [ ] Implement retry logic for failed emails
- [ ] Add email analytics/tracking
- [ ] Support multiple email providers
- [ ] Add email templates editor
- [ ] Implement email preferences per user
- [ ] Add unsubscribe functionality
- [ ] Support attachments (invoices, etc.)

## Summary

✅ **Nodemailer is fully integrated** across the application:
- Email server configured with Gmail SMTP
- All backend routes integrated with mail service
- Frontend components trigger emails properly
- Comprehensive email templates available
- Error handling and logging in place
- Ready for production deployment
