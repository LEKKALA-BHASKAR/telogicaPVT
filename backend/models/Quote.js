import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  // Buyer information
  buyer: {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    mobile: {
      type: String,
      required: true,
      trim: true
    },
    companyName: {
      type: String,
      trim: true
    }
  },
  // Shipping address
  address: {
    houseFlat: {
      type: String,
      required: true,
      trim: true
    },
    streetArea: {
      type: String,
      required: true,
      trim: true
    },
    landmark: {
      type: String,
      trim: true
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: String,
      required: true,
      trim: true
    },
    pincode: {
      type: String,
      required: true,
      trim: true
    }
  },
  // Products in quote
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    title: String,
    price: Number,
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    image: String
  }],
  // Quote totals
  originalTotal: {
    type: Number,
    required: true
  },
  quotedTotal: {
    type: Number,
    default: null
  },
  discountPercentage: {
    type: Number,
    default: 0
  },
  // Quote status
  status: {
    type: String,
    enum: ['pending', 'quoted', 'accepted', 'rejected', 'expired', 'ordered'],
    default: 'pending'
  },
  // Admin notes/response
  adminNotes: {
    type: String,
    trim: true
  },
  // User's custom message when submitting quote request
  userMessage: {
    type: String,
    trim: true
  },
  // Linked user (optional - for registered users)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  // Valid until date
  validUntil: {
    type: Date
  },
  // Conversation status for admin to manage quote conversations
  conversationStatus: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open'
  },
  // Linked order if quote was converted to order
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  // Messages for negotiation between user and admin
  messages: [{
    sender: {
      type: String,
      enum: ['user', 'admin'],
      required: true
    },
    senderName: {
      type: String,
      trim: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, { timestamps: true });

// Index for faster queries
quoteSchema.index({ 'buyer.email': 1, createdAt: -1 });
quoteSchema.index({ status: 1 });
quoteSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model('Quote', quoteSchema);
