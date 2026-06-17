/**
 * Test script to verify all API endpoints are working
 * Run with: node test-api-endpoints.js
 */

const API_BASE = 'http://localhost:4000/api';

// Test data
const testContact = {
  name: 'Test User',
  email: 'test@example.com',
  subject: 'Test Inquiry',
  message: 'This is a test message',
  type: 'general'
};

const testApplication = {
  firstName: 'John',
  lastName: 'Doe',
  email: `test${Date.now()}@example.com`,
  phone: '+233123456789',
  university: 'Test University',
  division: 'AGD'
};

async function testEndpoint(name, url, method = 'GET', body = null) {
  console.log(`\n🧪 Testing: ${name}`);
  console.log(`   ${method} ${url}`);
  
  try {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' }
    };
    
    if (body) {
      options.body = JSON.stringify(body);
    }
    
    const response = await fetch(url, options);
    const data = await response.json();
    
    if (response.ok) {
      console.log(`   ✅ SUCCESS (${response.status})`);
      console.log(`   Response:`, JSON.stringify(data, null, 2).slice(0, 200));
    } else {
      console.log(`   ❌ FAILED (${response.status})`);
      console.log(`   Error:`, data);
    }
    
    return response.ok;
  } catch (error) {
    console.log(`   ❌ ERROR: ${error.message}`);
    return false;
  }
}

async function runTests() {
  console.log('='.repeat(60));
  console.log('🚀 Alpha Power Station API Tests');
  console.log('='.repeat(60));
  
  let passed = 0;
  let failed = 0;
  
  // Test 1: Submit contact inquiry
  if (await testEndpoint('Submit Contact Inquiry', `${API_BASE}/contact`, 'POST', testContact)) {
    passed++;
  } else {
    failed++;
  }
  
  // Test 2: Get all contact inquiries
  if (await testEndpoint('Get Contact Inquiries', `${API_BASE}/contact`, 'GET')) {
    passed++;
  } else {
    failed++;
  }
  
  // Test 3: Submit student application
  if (await testEndpoint('Submit Student Application', `${API_BASE}/students/apply`, 'POST', testApplication)) {
    passed++;
  } else {
    failed++;
  }
  
  // Test 4: Get all student applications
  if (await testEndpoint('Get Student Applications', `${API_BASE}/students/applications`, 'GET')) {
    passed++;
  } else {
    failed++;
  }
  
  // Test 5: Get all projects
  if (await testEndpoint('Get All Projects', `${API_BASE}/projects`, 'GET')) {
    passed++;
  } else {
    failed++;
  }
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Test Summary');
  console.log('='.repeat(60));
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(0)}%`);
  console.log('='.repeat(60));
  
  if (failed === 0) {
    console.log('\n🎉 All tests passed! Backend is ready.');
  } else {
    console.log('\n⚠️  Some tests failed. Check backend server is running.');
    console.log('   Run: cd backend && npm run dev');
  }
}

runTests();
