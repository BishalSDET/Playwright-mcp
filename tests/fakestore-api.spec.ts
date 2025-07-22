import { test, expect } from '@playwright/test';
import Ajv from 'ajv';

// JSON Schema for FakeStore API product response
const productSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    title: { type: 'string' },
    price: { type: 'number' },
    description: { type: 'string' },
    category: { type: 'string' },
    image: { type: 'string' },
    rating: {
      type: 'object',
      properties: {
        rate: { type: 'number' },
        count: { type: 'number' }
      },
      required: ['rate', 'count']
    }
  },
  required: ['id', 'title', 'price', 'description', 'category']
};

test.describe('FakeStore API Tests', () => {
  test('GET /products/1 - Validate product endpoint', async ({ request }) => {
    console.log('🚀 Starting FakeStore API test for product ID: 1');
    
    // Step 1: Define the API endpoint URL
    const apiEndpoint = 'https://fakestoreapi.com/products/1';
    console.log(`📍 API Endpoint: ${apiEndpoint}`);
    
    // Step 2: Send a GET request to the endpoint
    console.log('📡 Sending GET request...');
    const response = await request.get(apiEndpoint);
    
    // Step 3: Verify the response status is 200
    console.log(`✅ Response Status: ${response.status()}`);
    expect(response.status()).toBe(200);
    
    // Parse response body
    const responseBody = await response.json();
    console.log('📦 Response received successfully');
    console.log('🔍 Response Data:', JSON.stringify(responseBody, null, 2));
    
    // Step 4: Validate the response contains required keys
    console.log('🔑 Validating required keys...');
    const requiredKeys = ['id', 'title', 'price', 'category', 'description'];
    
    for (const key of requiredKeys) {
      expect(responseBody).toHaveProperty(key);
      console.log(`✓ Key '${key}' is present`);
    }
    
    // Step 5: Validate data types using JSON schema (Ajv)
    console.log('📋 Validating JSON schema...');
    const ajv = new Ajv();
    const validate = ajv.compile(productSchema);
    const isValid = validate(responseBody);
    
    if (!isValid) {
      console.error('❌ Schema validation errors:', validate.errors);
    }
    expect(isValid).toBe(true);
    console.log('✅ Schema validation passed');
    
    // Step 6: Log the product title and price to the console
    console.log('📊 Product Details:');
    console.log(`🏷️  Product Title: ${responseBody.title}`);
    console.log(`💰 Product Price: $${responseBody.price}`);
    
    // Additional validations for better test coverage
    expect(typeof responseBody.id).toBe('number');
    expect(typeof responseBody.title).toBe('string');
    expect(typeof responseBody.price).toBe('number');
    expect(typeof responseBody.category).toBe('string');
    expect(typeof responseBody.description).toBe('string');
    
    // Validate that the product ID matches the requested ID
    expect(responseBody.id).toBe(1);
    
    // Validate that price is a positive number
    expect(responseBody.price).toBeGreaterThan(0);
    
    // Validate that title and description are not empty
    expect(responseBody.title.length).toBeGreaterThan(0);
    expect(responseBody.description.length).toBeGreaterThan(0);
    
    console.log('🎉 All validations completed successfully!');
  });
  
  test('GET /products/1 - Validate response headers', async ({ request }) => {
    console.log('🚀 Testing response headers for FakeStore API');
    
    const response = await request.get('https://fakestoreapi.com/products/1');
    
    // Validate response headers
    const headers = response.headers();
    console.log('📋 Response Headers:', headers);
    
    expect(headers['content-type']).toContain('application/json');
    console.log('✅ Content-Type header is correct');
    
    console.log(`⏱️  Response completed successfully`);
  });
  
  test('GET /products/1 - Error handling for invalid product ID', async ({ request }) => {
    console.log('🚀 Testing error handling with invalid product ID');
    
    const response = await request.get('https://fakestoreapi.com/products/9999');
    
    // FakeStore API returns null for non-existent products with 200 status
    expect(response.status()).toBe(200);
    
    const responseBody = await response.text();
    console.log(`📦 Response for invalid ID: ${responseBody}`);
    
    // FakeStore API returns empty string for non-existent products
    expect(responseBody).toBe('');
    console.log('✅ Error handling validation passed');
  });
});
