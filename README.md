# Telogica PVT - E-commerce Platform

A full-stack MERN (MongoDB, Express, React, Node.js) e-commerce platform for Telogica, a premium telecom equipment provider.

## 🎉 Latest Update: Complete Nodemailer Integration

All email functionality has been fully integrated across the application! See [COMPLETION_REPORT.md](COMPLETION_REPORT.md) for details.

## 📧 Email System

### Email Server
Standalone email microservice with Nodemailer:
- 12 professional HTML email templates
- 11 API endpoints for different email types
- Gmail SMTP integration with TLS/SSL
- See [email-server/README.md](email-server/README.md)

### Email Workflows
- ✅ Quote requests and responses
- ✅ Order confirmations and updates
- ✅ Contact form notifications
- ✅ Admin-user messaging
- ✅ Cart updates

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- MongoDB
- Gmail account with App Password

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/LEKKALA-BHASKAR/telogicaPVT.git
cd telogicaPVT
```

2. **Install dependencies**
```bash
# Backend
cd backend
npm install

# Email Server
cd ../email-server
npm install

# Frontend
cd ../frontend
npm install
```

3. **Configure environment variables**

Create `.env` files in each directory. See [QUICK_START.md](QUICK_START.md) for details.

4. **Start the servers**
```bash
# Terminal 1 - Email Server
cd email-server
npm start

# Terminal 2 - Backend
cd backend
npm start

# Terminal 3 - Frontend
cd frontend
npm start
```

## 📚 Documentation

- **[QUICK_START.md](QUICK_START.md)** - Step-by-step setup guide
- **[NODEMAILER_INTEGRATION.md](NODEMAILER_INTEGRATION.md)** - Complete email integration docs
- **[EMAIL_FLOW_DIAGRAM.md](EMAIL_FLOW_DIAGRAM.md)** - Visual architecture diagrams
- **[INTEGRATION_SUMMARY.md](INTEGRATION_SUMMARY.md)** - Comprehensive summary
- **[COMPLETION_REPORT.md](COMPLETION_REPORT.md)** - Integration completion report

## 🧪 Testing

### Verify Integration
```bash
./verify-nodemailer.sh
```

### Test Email System
```bash
cd email-server
npm test
```

## 🏗️ Architecture

```
Frontend (React) → Backend (Express + MongoDB) → Email Server (Nodemailer) → Gmail SMTP
```

### Components
- **Frontend**: React application (port 3000)
- **Backend**: Express API server (port 8001)
- **Email Server**: Nodemailer microservice (port 8002)
- **Database**: MongoDB

## 🔒 Security

- ✅ Gmail App Password authentication
- ✅ Environment variables for sensitive data
- ✅ TLS/SSL encryption
- ✅ Input validation
- ✅ 0 security vulnerabilities (CodeQL verified)

## 📊 Features

### Customer Features
- Product browsing and search
- Quote requests
- Shopping cart
- Checkout and payment (Razorpay)
- Order tracking
- Email notifications

### Admin Features
- Product management
- Quote management
- Order management
- User management
- Investor document management
- Email notifications

## 🛠️ Tech Stack

### Frontend
- React
- TailwindCSS
- Framer Motion
- Axios

### Backend
- Express.js
- MongoDB + Mongoose
- JWT authentication
- Cloudinary (file storage)
- Razorpay (payments)

### Email
- Nodemailer
- Gmail SMTP
- HTML email templates

## 📝 License

All rights reserved © 2024 Telogica Ltd.

## 🤝 Contributing

This is a private project. For access or questions, contact the repository owner.

## 📞 Support

For setup help or issues:
1. Check documentation files listed above
2. Run verification script: `./verify-nodemailer.sh`
3. Review email server logs
4. Contact repository administrators

---

**Status**: ✅ Production Ready
**Latest Version**: Complete Nodemailer Integration
**Last Updated**: December 2024

