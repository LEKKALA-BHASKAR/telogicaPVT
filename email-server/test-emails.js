#!/usr/bin/env node
/**
 * Email Server Testing Script
 * Tests all email endpoints to ensure they're working correctly
 */

import fetch from 'node-fetch';

const BASE_URL = process.env.EMAIL_SERVER_URL || 'http://localhost:8002';
const TEST_EMAIL = process.env.TEST_EMAIL || 'test@example.com';

// ANSI color codes for better output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  test: (msg) => console.log(`${colors.cyan}🧪 ${msg}${colors.reset}`)
};

// Test data
const testData = {
  buyer: {
    email: TEST_EMAIL,
    fullName: 'Test User',
    mobile: '9876543210',
    companyName: 'Test Company Ltd'
  },
  address: {
    houseFlat: '123',
    streetArea: 'Test Street',
    landmark: 'Near Test Park',
    city: 'Test City',
    state: 'Test State',
    pincode: '123456'
  },
  products: [
    { title: 'Test Product 1', quantity: 2, price: 1000 },
    { title: 'Test Product 2', quantity: 1, price: 2000 }
  ],
  user: {
    email: TEST_EMAIL,
    name: 'Test User'
  }
};

/**
 * Make a POST request to an endpoint
 */
async function testEndpoint(endpoint, payload, description) {
  log.test(`Testing: ${description}`);
  
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => ({}));

    if (response.ok && data.success) {
      log.success(`${description} - PASSED`);
      return true;
    } else {
      log.error(`${description} - FAILED: ${data.message || response.statusText}`);
      return false;
    }
  } catch (error) {
    log.error(`${description} - ERROR: ${error.message}`);
    return false;
  }
}

/**
 * Make a GET request to an endpoint
 */
async function testGetEndpoint(endpoint, description) {
  log.test(`Testing: ${description}`);
  
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    const data = await response.json().catch(() => ({}));

    if (response.ok) {
      log.success(`${description} - PASSED`);
      return true;
    } else {
      log.error(`${description} - FAILED: ${response.statusText}`);
      return false;
    }
  } catch (error) {
    log.error(`${description} - ERROR: ${error.message}`);
    return false;
  }
}

/**
 * Run all tests
 */
async function runAllTests() {
  console.log('\n' + '='.repeat(60));
  log.info(`Email Server Test Suite`);
  log.info(`Server URL: ${BASE_URL}`);
  log.info(`Test Email: ${TEST_EMAIL}`);
  console.log('='.repeat(60) + '\n');

  const results = [];

  // Health check tests
  log.info('Starting Health Check Tests...\n');
  results.push(await testGetEndpoint('/api/health', 'Health Check'));
  results.push(await testGetEndpoint('/api/endpoints', 'Endpoints List'));
  
  console.log('\n' + '-'.repeat(60) + '\n');

  // Quote email tests
  log.info('Starting Quote Email Tests...\n');
  
  results.push(await testEndpoint(
    '/api/email/quote/request',
    {
      ...testData,
      originalTotal: 4000,
      quoteId: 'TEST-QUOTE-001',
      userMessage: 'This is a test quote request'
    },
    'Quote Request Email'
  ));

  results.push(await testEndpoint(
    '/api/email/quote/respond',
    {
      buyer: testData.buyer,
      products: testData.products,
      originalTotal: 4000,
      quotedTotal: 3600,
      discountPercentage: 10,
      adminNotes: 'Special discount for test',
      validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      quoteId: 'TEST-QUOTE-001'
    },
    'Quote Response Email'
  ));

  results.push(await testEndpoint(
    '/api/email/quote/accept',
    {
      buyer: testData.buyer,
      products: testData.products,
      quotedTotal: 3600,
      quoteId: 'TEST-QUOTE-001'
    },
    'Quote Accepted Email'
  ));

  results.push(await testEndpoint(
    '/api/email/quote/reject',
    {
      buyer: testData.buyer,
      products: testData.products,
      quoteId: 'TEST-QUOTE-001',
      originalTotal: 4000
    },
    'Quote Rejected Email'
  ));

  console.log('\n' + '-'.repeat(60) + '\n');

  // Order email tests
  log.info('Starting Order Email Tests...\n');

  results.push(await testEndpoint(
    '/api/email/order/placed',
    {
      user: testData.user,
      products: testData.products,
      totalAmount: 4000,
      orderId: 'TEST-ORDER-001',
      paymentId: 'pay_test123',
      shippingAddress: {
        name: 'Test User',
        address: '123 Test Street, Test City',
        city: 'Test City',
        pincode: '123456',
        phone: '9876543210'
      },
      invoiceUrl: 'https://example.com/invoice.pdf'
    },
    'Order Placed Email'
  ));

  results.push(await testEndpoint(
    '/api/email/order/status-update',
    {
      user: testData.user,
      orderId: 'TEST-ORDER-001',
      orderStatus: 'shipped',
      products: testData.products,
      totalAmount: 4000,
      trackingNumber: 'TRACK123456',
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    'Order Status Update Email'
  ));

  console.log('\n' + '-'.repeat(60) + '\n');

  // Cart email tests
  log.info('Starting Cart Email Tests...\n');

  results.push(await testEndpoint(
    '/api/email/cart/update',
    {
      user: testData.user,
      cartItems: testData.products,
      cartTotal: 4000,
      action: 'add'
    },
    'Cart Update Email'
  ));

  console.log('\n' + '-'.repeat(60) + '\n');

  // Message email tests
  log.info('Starting Message Email Tests...\n');

  results.push(await testEndpoint(
    '/api/email/message/to-user',
    {
      buyer: testData.buyer,
      quoteId: 'TEST-QUOTE-001',
      messageContent: 'This is a test message from admin to user',
      senderName: 'Admin Test'
    },
    'Message to User Email'
  ));

  results.push(await testEndpoint(
    '/api/email/message/to-admin',
    {
      buyer: testData.buyer,
      quoteId: 'TEST-QUOTE-001',
      messageContent: 'This is a test message from user to admin'
    },
    'Message to Admin Email'
  ));

  console.log('\n' + '-'.repeat(60) + '\n');

  // Test email
  log.info('Starting Test Email...\n');

  results.push(await testEndpoint(
    '/api/email/test',
    { to: TEST_EMAIL },
    'Test Email'
  ));

  // Summary
  console.log('\n' + '='.repeat(60));
  const passed = results.filter(r => r).length;
  const failed = results.filter(r => !r).length;
  const total = results.length;
  
  log.info(`Test Summary:`);
  log.success(`Passed: ${passed}/${total}`);
  if (failed > 0) {
    log.error(`Failed: ${failed}/${total}`);
  }
  console.log('='.repeat(60) + '\n');

  if (failed === 0) {
    log.success('All tests passed! ✨');
  } else {
    log.warning('Some tests failed. Check the email server logs for details.');
  }

  process.exit(failed > 0 ? 1 : 0);
}

// Run tests
runAllTests().catch(error => {
  log.error(`Test suite failed: ${error.message}`);
  process.exit(1);
});
