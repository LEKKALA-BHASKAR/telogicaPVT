# Telogica Email Server

A dedicated Node.js/Express email notification server for the Telogica e-commerce platform.

## Features

- 📧 Email notifications for all operations (quotes, orders, cart, messages)
- 🎨 Professional HTML email templates
- 👥 Sends to both admin and user when applicable
- 🔒 Gmail SMTP integration with app password

## Installation

```bash
cd email-server
npm install
```

## Configuration

The email server uses the following environment variables (already configured in `.env`):

```
EMAIL_USER=telogicaweb@gmail.com
EMAIL_PASSWORD=your_app_password_here
ADMIN_EMAIL=telogicaweb@gmail.com
PORT=8002
```

> **⚠️ Security Note**: For production deployments, ensure the `.env` file is not committed to version control. Add `.env` to your `.gitignore` file and manage credentials securely through environment variables or a secret management system.

## Running the Server

Development:
```bash
npm run dev
```

Production:
```bash
npm start
```

## API Endpoints

### Health Check
- `GET /api/health` - Check if email server is running
- `GET /api/endpoints` - List all available endpoints with documentation

### Test
- `POST /api/email/test` - Send a test email

### Quote Notifications

| Endpoint | Method | Description | Recipients |
|----------|--------|-------------|------------|
| `/api/email/quote/request` | POST | Quote request submitted | User + Admin |
| `/api/email/quote/respond` | POST | Admin responded with price | User |
| `/api/email/quote/accept` | POST | User accepted quote | User + Admin |
| `/api/email/quote/reject` | POST | User rejected quote | Admin |

### Order Notifications

| Endpoint | Method | Description | Recipients |
|----------|--------|-------------|------------|
| `/api/email/order/placed` | POST | Order placed (payment verified) | User + Admin |
| `/api/email/order/status-update` | POST | Order status updated | User |

### Cart Notifications

| Endpoint | Method | Description | Recipients |
|----------|--------|-------------|------------|
| `/api/email/cart/update` | POST | Cart updated | User |

### Message Notifications

| Endpoint | Method | Description | Recipients |
|----------|--------|-------------|------------|
| `/api/email/message/to-user` | POST | Admin sent message on quote | User |
| `/api/email/message/to-admin` | POST | User sent message on quote | Admin |

## Request Body Examples

### Quote Request
```json
{
  "buyer": {
    "email": "user@example.com",
    "fullName": "John Doe",
    "mobile": "9876543210",
    "companyName": "Company Ltd"
  },
  "address": {
    "houseFlat": "123",
    "streetArea": "Main Street",
    "landmark": "Near Park",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001"
  },
  "products": [
    {
      "title": "Product 1",
      "quantity": 2,
      "price": 1000
    }
  ],
  "originalTotal": 2000,
  "quoteId": "quote123",
  "userMessage": "Please provide best price"
}
```

### Quote Response (Admin)
```json
{
  "buyer": {
    "email": "user@example.com",
    "fullName": "John Doe"
  },
  "products": [
    {
      "title": "Product 1",
      "quantity": 2,
      "price": 1000
    }
  ],
  "originalTotal": 2000,
  "quotedTotal": 1800,
  "discountPercentage": 10,
  "adminNotes": "Special discount for bulk order",
  "validUntil": "2024-12-31",
  "quoteId": "quote123"
}
```

### Order Placed
```json
{
  "user": {
    "email": "user@example.com",
    "name": "John Doe"
  },
  "products": [
    {
      "title": "Product 1",
      "quantity": 2,
      "price": 1000
    }
  ],
  "totalAmount": 2000,
  "orderId": "order123",
  "paymentId": "pay_123",
  "shippingAddress": {
    "name": "John Doe",
    "address": "123 Main Street",
    "city": "Mumbai",
    "pincode": "400001",
    "phone": "9876543210"
  },
  "invoiceUrl": "https://example.com/invoice.pdf"
}
```

### Order Status Update
```json
{
  "user": {
    "email": "user@example.com",
    "name": "John Doe"
  },
  "orderId": "order123",
  "orderStatus": "shipped",
  "products": [
    {
      "title": "Product 1",
      "quantity": 2,
      "price": 1000
    }
  ],
  "totalAmount": 2000,
  "trackingNumber": "TRACK123",
  "estimatedDelivery": "2024-01-15"
}
```

### Cart Update
```json
{
  "user": {
    "email": "user@example.com",
    "name": "John Doe"
  },
  "cartItems": [
    {
      "title": "Product 1",
      "quantity": 2,
      "price": 1000
    }
  ],
  "cartTotal": 2000,
  "action": "add"
}
```

### Message to User
```json
{
  "buyer": {
    "email": "user@example.com",
    "fullName": "John Doe"
  },
  "quoteId": "quote123",
  "messageContent": "We can offer you an additional 5% discount",
  "senderName": "Sales Team"
}
```

### Message to Admin
```json
{
  "buyer": {
    "email": "user@example.com",
    "fullName": "John Doe"
  },
  "quoteId": "quote123",
  "messageContent": "Can you provide more discount?"
}
```

## Integration with Main Backend

The main backend can call these email endpoints after each operation. Example:

```javascript
// In backend quoteRoutes.js after creating a quote
const emailResponse = await fetch('http://localhost:8002/api/email/quote/request', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    buyer,
    address,
    products: productDetails,
    originalTotal,
    quoteId: quote._id.toString(),
    userMessage
  })
});
```

## Email Templates

All email templates are located in `templates/emailTemplates.js`. They include:

- Professional styling with Telogica branding
- Responsive design
- Clear information hierarchy
- Status badges for different states
- Product tables with pricing
- Action buttons where applicable

## Troubleshooting

1. **Email not sending**: Check Gmail app password is correct
2. **Connection error**: Ensure Gmail "Less secure apps" is disabled (use app password instead)
3. **Port conflict**: Change PORT in .env if 8002 is in use
