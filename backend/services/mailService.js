import fetch from 'node-fetch';

const normalizeBaseUrl = (url) => {
  if (!url) return '';
  return url.endsWith('/') ? url.slice(0, -1) : url;
};

const MAIL_SERVICE_BASE_URL = normalizeBaseUrl(
  process.env.MAIL_SERVICE_BASE_URL || 'https://telogica-pvt.vercel.app'
);

const buildUrl = (path) => {
  if (!MAIL_SERVICE_BASE_URL) return '';
  if (!path.startsWith('/')) {
    return `${MAIL_SERVICE_BASE_URL}/${path}`;
  }
  return `${MAIL_SERVICE_BASE_URL}${path}`;
};

const postToMailService = async (endpoint, payload, contextLabel) => {
  if (!MAIL_SERVICE_BASE_URL) {
    console.warn('[MailService] MAIL_SERVICE_BASE_URL is not configured. Skipping email dispatch.');
    return { skipped: true };
  }

  const url = buildUrl(endpoint);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `[MailService] ${contextLabel || endpoint} failed with status ${response.status}: ${errorText}`
      );
      return { error: true, status: response.status };
    }

    const data = await response.json().catch(() => ({}));
    return data;
  } catch (error) {
    console.error(`[MailService] ${contextLabel || endpoint} error:`, error.message);
    return { error: true };
  }
};

export const MailService = {
  sendQuoteRequest: (payload) => postToMailService('/api/email/quote/request', payload, 'Quote Request Email'),
  sendQuoteResponse: (payload) => postToMailService('/api/email/quote/respond', payload, 'Quote Response Email'),
  sendQuoteAccepted: (payload) => postToMailService('/api/email/quote/accept', payload, 'Quote Accepted Email'),
  sendQuoteRejected: (payload) => postToMailService('/api/email/quote/reject', payload, 'Quote Rejected Email'),
  sendAdminMessage: (payload) => postToMailService('/api/email/message/to-admin', payload, 'Message to Admin Email'),
  sendUserMessage: (payload) => postToMailService('/api/email/message/to-user', payload, 'Message to User Email'),
  sendOrderPlaced: (payload) => postToMailService('/api/email/order/placed', payload, 'Order Placed Email'),
  sendOrderStatusUpdate: (payload) => postToMailService('/api/email/order/status-update', payload, 'Order Status Update Email')
};

export default MailService;
