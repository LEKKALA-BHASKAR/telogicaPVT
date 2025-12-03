# Nodemailer Quick Start Guide

## 🚀 Getting Started

This guide will help you get the nodemailer email system up and running quickly.

## Prerequisites

- Node.js (v14 or higher)
- Gmail account with App Password enabled
- MongoDB instance running

## Step 1: Install Dependencies

### Backend
```bash
cd backend
npm install
```

### Email Server
```bash
cd email-server
npm install
```

### Frontend
```bash
cd frontend
npm install
```

## Step 2: Configure Environment Variables

### Backend (`.env`)
```env
MONGO_URI=your_mongodb_connection_string
DB_NAME=telogica
JWT_SECRET=your_jwt_secret
MAIL_SERVICE_BASE_URL=http://localhost:8002
# OR for production:
# MAIL_SERVICE_BASE_URL=https://your-email-server.vercel.app
```

### Email Server (`.env`)
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password-here
ADMIN_EMAIL=admin@telogica.com
PORT=8002
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
```

**⚠️ Important:** Use Gmail App Password, not your regular password!

### How to Get Gmail App Password:
1. Go to Google Account Settings
2. Security → 2-Step Verification (enable if not already)
3. App passwords → Generate new app password
4. Select "Mail" and "Other" (Custom name: "Telogica Email Server")
5. Copy the 16-character password (no spaces)
6. Use this password in `EMAIL_PASSWORD`

### Frontend (`.env`)
```env
REACT_APP_BACKEND_URL=http://localhost:8001
# OR for production:
# REACT_APP_BACKEND_URL=https://your-backend.onrender.com
```

## Step 3: Start the Servers

### Option A: Development Mode (3 terminals)

**Terminal 1 - Email Server:**
```bash
cd email-server
npm run dev
```
Expected output:
```
📧 Email Server running on port 8002
📋 View all endpoints at http://localhost:8002/api/endpoints
✅ Email server is ready to send emails
```

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```
Expected output:
```
✅ MongoDB Connected Successfully
🚀 Server running on port 8001
```

**Terminal 3 - Frontend:**
```bash
cd frontend
npm start
```
Expected output:
```
Compiled successfully!
Local: http://localhost:3000
```

### Option B: Production Mode

Deploy each component separately:

1. **Email Server** → Vercel/Heroku/Railway
2. **Backend** → Render/Heroku/Railway
3. **Frontend** → Vercel/Netlify

Update environment variables accordingly.

## Step 4: Verify Email Setup

### Test Email Server
```bash
cd email-server
curl http://localhost:8002/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Email server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Send Test Email
```bash
curl -X POST http://localhost:8002/api/email/test \
  -H "Content-Type: application/json" \
  -d '{"to": "your-email@example.com"}'
```

Expected response:
```json
{
  "success": true,
  "message": "Test email sent successfully to your-email@example.com"
}
```

### Run Verification Script
```bash
./verify-nodemailer.sh
```

Expected output:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nodemailer Integration Verification
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
...
✅ All checks passed! Nodemailer is fully integrated.
```

## Step 5: Test Email Flows

### 1. Test Contact Form
1. Open http://localhost:3000/contact
2. Fill in the contact form
3. Submit
4. Check admin email for notification

### 2. Test Quote Request
1. Open http://localhost:3000/products
2. Add products to quotation
3. Fill in buyer details
4. Submit quote request
5. Check:
   - User email: Confirmation
   - Admin email: Notification

### 3. Test Order Flow (requires payment setup)
1. Add products to cart
2. Proceed to checkout
3. Complete test payment
4. Check:
   - User email: Order confirmation
   - Admin email: New order notification

### 4. Test Admin Operations
1. Login as admin
2. Go to Manage Quotes
3. Respond to a quote
4. Check user email for quote response
5. Update order status
6. Check user email for status update

## Email Flow Architecture

```
┌─────────────┐
│   Frontend  │  (React)
│  Port: 3000 │
└──────┬──────┘
       │
       │ HTTP Requests
       ↓
┌─────────────┐
│   Backend   │  (Express + MongoDB)
│  Port: 8001 │
└──────┬──────┘
       │
       │ HTTP POST to /api/email/*
       ↓
┌─────────────┐
│Email Server │  (Express + Nodemailer)
│  Port: 8002 │
└──────┬──────┘
       │
       │ SMTP Protocol
       ↓
┌─────────────┐
│Gmail Server │  (smtp.gmail.com:465)
│     TLS     │
└──────┬──────┘
       │
       │ Email Delivery
       ↓
  📧 Recipients
```

## Common Issues & Solutions

### Email Server Can't Connect to Gmail
**Error:** `getaddrinfo ENOTFOUND smtp.gmail.com`
**Solution:** 
- Check internet connection
- Verify firewall settings
- Try alternative SMTP server

### Invalid Credentials
**Error:** `Invalid login: 535-5.7.8 Username and Password not accepted`
**Solution:**
- Use App Password, not regular password
- Ensure 2-Step Verification is enabled
- Generate a new App Password

### Emails Not Received
**Possible causes:**
1. Check spam/junk folder
2. Verify recipient email is correct
3. Check email server logs for errors
4. Test with `/api/email/test` endpoint

### MAIL_SERVICE_BASE_URL Not Set
**Error:** `MAIL_SERVICE_BASE_URL is not configured`
**Solution:**
- Add `MAIL_SERVICE_BASE_URL` to backend `.env`
- Set to email server URL
- Restart backend server

## Available Email Templates

1. ✅ Quote Request (User + Admin)
2. ✅ Quote Response (User)
3. ✅ Quote Accepted (User + Admin)
4. ✅ Quote Rejected (Admin)
5. ✅ Order Placed (User + Admin)
6. ✅ Order Status Update (User)
7. ✅ Cart Update (User)
8. ✅ Message to User
9. ✅ Message to Admin
10. ✅ Contact Form (Admin)

## Email Server Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/endpoints` | GET | List all endpoints |
| `/api/email/test` | POST | Send test email |
| `/api/email/quote/request` | POST | Quote request |
| `/api/email/quote/respond` | POST | Quote response |
| `/api/email/quote/accept` | POST | Quote accepted |
| `/api/email/quote/reject` | POST | Quote rejected |
| `/api/email/order/placed` | POST | Order placed |
| `/api/email/order/status-update` | POST | Order status update |
| `/api/email/cart/update` | POST | Cart update |
| `/api/email/message/to-user` | POST | Message to user |
| `/api/email/message/to-admin` | POST | Message to admin |

## Monitoring

### Check Email Server Logs
```bash
cd email-server
npm start
```

Look for:
- ✅ `Email server is ready to send emails`
- ✉️ `Quote Request Email sent to user@example.com`
- ❌ `Quote Request Email failed for user@example.com: error message`

### Check Backend Logs
```bash
cd backend
npm start
```

Look for:
- `[MailService] Quote Request Email sent successfully`
- `[MailService] MAIL_SERVICE_BASE_URL is not configured` (if missing)

## Next Steps

1. ✅ Customize email templates in `email-server/templates/emailTemplates.js`
2. ✅ Add more email types as needed
3. ✅ Set up production deployment
4. ✅ Configure domain email (optional)
5. ✅ Add email analytics (optional)

## Support

For issues or questions:
- Check `NODEMAILER_INTEGRATION.md` for detailed documentation
- Run `./verify-nodemailer.sh` for system check
- Review email server logs
- Check backend integration in `/backend/services/mailService.js`

## Success Checklist

- [ ] Email server starts without errors
- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Verification script passes all checks
- [ ] Test email sent successfully
- [ ] Contact form sends email
- [ ] Quote request sends email
- [ ] Order confirmation sends email
- [ ] All emails have correct branding
- [ ] Admin receives notifications

---

**🎉 Congratulations! Your nodemailer integration is ready!**
