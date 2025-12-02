import express from 'express';
import { MailService } from '../services/mailService.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !name.trim() || !email || !email.trim() || !message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required.'
      });
    }

    const payload = {
      buyer: {
        fullName: name.trim(),
        email: email.trim().toLowerCase()
      },
      quoteId: 'contact-form',
      messageContent: message.trim(),
      senderName: name.trim()
    };

    await MailService.sendAdminMessage(payload);

    res.json({
      success: true,
      message: 'Message sent successfully.'
    });
  } catch (error) {
    console.error('Contact form email error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to send your message at the moment. Please try again later.'
    });
  }
});

export default router;
