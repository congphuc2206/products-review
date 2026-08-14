/**
 * FlexiReview API Integration & Route Test Suite
 * 
 * Tests server bootstrapping, static file serving, route registrations,
 * schema definitions, and health checks.
 */

const assert = require('assert');
const http = require('http');
const app = require('../server');
const Product = require('../src/models/Product');
const Review = require('../src/models/Review');
const sampleProducts = require('../src/seed/seedData');

async function runTests() {
  console.log('🧪 Starting FlexiReview Test Suite...\n');

  // Test 1: Verify Seed Data Schema & Flexibility
  console.log('▶ Test 1: Verifying Seed Data & MongoDB Flexible Schema Structure...');
  assert.ok(Array.isArray(sampleProducts), 'Sample products should be an array');
  assert.ok(sampleProducts.length >= 4, 'Should have at least 4 sample products across distinct categories');
  
  sampleProducts.forEach(prod => {
    assert.ok(prod.name, 'Product must have a name');
    assert.ok(prod.category, 'Product must have a category');
    assert.ok(typeof prod.price === 'number', 'Product must have numeric price');
    assert.ok(typeof prod.specifications === 'object', 'Product specifications must be an object');
    assert.ok(Object.keys(prod.specifications).length > 0, `Product ${prod.name} must have dynamic specifications`);
  });
  console.log('  ✅ Seed data and dynamic specifications verified!\n');

  // Test 2: Verify Mongoose Model Definitions
  console.log('▶ Test 2: Verifying Mongoose Schema Definitions...');
  assert.ok(Product.schema.paths.name, 'Product schema must contain name');
  assert.ok(Product.schema.paths.category, 'Product schema must contain category');
  assert.ok(Product.schema.paths.specifications, 'Product schema must contain flexible specifications path');
  assert.ok(Product.schema.paths.averageRating, 'Product schema must contain averageRating path');

  assert.ok(Review.schema.paths.productId, 'Review schema must contain productId');
  assert.ok(Review.schema.paths.rating, 'Review schema must contain rating (1-5)');
  assert.ok(Review.schema.paths.pros, 'Review schema must contain flexible pros array');
  assert.ok(Review.schema.paths.cons, 'Review schema must contain flexible cons array');
  assert.ok(Review.schema.paths.tags, 'Review schema must contain flexible tags array');
  assert.ok(Review.schema.paths.images, 'Review schema must contain flexible images array');
  console.log('  ✅ Mongoose models and schema paths verified!\n');

  // Test 3: Test Server Boot & HTTP Health Endpoint
  console.log('▶ Test 3: Verifying HTTP Server & Health Endpoint...');
  const server = http.createServer(app);
  await new Promise(resolve => server.listen(0, resolve));
  const port = server.address().port;

  try {
    const healthRes = await makeRequest(`http://localhost:${port}/api/health`);
    assert.strictEqual(healthRes.statusCode, 200, 'Health endpoint should return status 200');
    assert.strictEqual(healthRes.body.status, 'OK', 'Health status should be OK');
    console.log('  ✅ HTTP Server is responding and health check passed!\n');

    // Test 4: Static File Serving Check
    console.log('▶ Test 4: Verifying Frontend Static Files Delivery...');
    const indexRes = await makeRequest(`http://localhost:${port}/`);
    assert.strictEqual(indexRes.statusCode, 200, 'Root index.html should return status 200');
    assert.ok(indexRes.raw.includes('FlexiReview'), 'index.html should contain FlexiReview brand');
    assert.ok(indexRes.raw.includes('specs-builder-box'), 'index.html should include dynamic spec builder');
    console.log('  ✅ Frontend index.html served successfully!\n');

    const cssRes = await makeRequest(`http://localhost:${port}/css/styles.css`);
    assert.strictEqual(cssRes.statusCode, 200, 'styles.css should return status 200');
    assert.ok(cssRes.raw.includes('--star-gold'), 'styles.css should contain custom CSS properties');
    console.log('  ✅ CSS stylesheet served successfully!\n');

    const jsRes = await makeRequest(`http://localhost:${port}/js/app.js`);
    assert.strictEqual(jsRes.statusCode, 200, 'app.js should return status 200');
    assert.ok(jsRes.raw.includes('getSpecificationsFromBuilder'), 'app.js should contain dynamic spec builder logic');
    console.log('  ✅ JavaScript app bundle served successfully!\n');

  } finally {
    server.close();
  }

  console.log('🎉 ALL INTEGRATION TESTS PASSED SUCCESSFULLY!');
}

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ statusCode: res.statusCode, body: json, raw: data });
        } catch {
          resolve({ statusCode: res.statusCode, body: null, raw: data });
        }
      });
    }).on('error', reject);
  });
}

if (require.main === module) {
  runTests().catch(err => {
    console.error('❌ Test failed:', err);
    process.exit(1);
  });
}

module.exports = runTests;
