import { test, expect } from '@playwright/test';

test.describe('Automation Practice Search Test', () => {
  test('Search for T-Shirts and verify Faded Short Sleeve T-shirts in results', async ({ page }) => {
    console.log('🚀 Starting automation practice search test');
    
    // Step 1: Navigate to http://www.automationpractice.pl/index.php
    console.log('📍 Navigating to automation practice website...');
    await page.goto('http://www.automationpractice.pl/index.php');
    
    // Verify we're on the correct page
    await expect(page).toHaveTitle('My Shop');
    console.log('✅ Successfully navigated to My Shop homepage');
    
    // Step 2: Search for 'T-Shirts' and click on Search button
    console.log('🔍 Searching for "T-Shirts"...');
    
    // Fill the search box with 'T-Shirts'
    await page.getByRole('textbox', { name: 'Search' }).fill('T-Shirts');
    console.log('📝 Entered "T-Shirts" in search box');
    
    // Click the search button
    await page.locator('button[name="submit_search"]').click();
    console.log('🔍 Clicked search button');
    
    // Step 3: Wait for the new page to be loaded
    console.log('⏳ Waiting for search results page to load...');
    await expect(page).toHaveTitle('Search - My Shop');
    
    // Wait for search results to be visible
    await expect(page.locator('h1')).toContainText('Search "T-Shirts"');
    await expect(page.locator('h1')).toContainText('1 result has been found');
    console.log('✅ Search results page loaded successfully');
    
    // Step 4: Verify the product is in search result list and returns Faded Short Sleeve T-shirts
    console.log('🔍 Verifying search results...');
    
    // Check that we have search results
    const searchResultsContainer = page.locator('.product_list');
    await expect(searchResultsContainer).toBeVisible();
    
    // Verify the specific product "Faded Short Sleeve T-shirts" is in the results
    const productTitle = page.locator('#center_column').getByText('Faded Short Sleeve T-shirts').first();
    await expect(productTitle).toBeVisible();
    
    console.log('✅ Found "Faded Short Sleeve T-shirts" in search results');
    
    // Verify the search results count
    const resultsInfo = page.locator('.product-count').first();
    await expect(resultsInfo).toContainText('Showing 1 - 1 of 1 item');
    
    // Verify the product container is visible
    const productContainer = page.locator('.product-container').first();
    await expect(productContainer).toBeVisible();
    
    // Verify product has image
    const productImage = productContainer.locator('img[alt="Faded Short Sleeve T-shirts"]');
    await expect(productImage).toBeVisible();
    
    // Verify product link is functional
    const productLink = page.locator('a.product-name[title*="Faded Short Sleeve T-shirts"]').first();
    await expect(productLink).toHaveAttribute('href', /.*id_product=1.*/);
    
    console.log('🎉 All test steps completed successfully!');
    console.log('📊 Test Summary:');
    console.log('   ✓ Step 1: Navigated to automation practice website');
    console.log('   ✓ Step 2: Searched for "T-Shirts" and clicked Search button');
    console.log('   ✓ Step 3: Waited for new page to load');
    console.log('   ✓ Step 4: Verified "Faded Short Sleeve T-shirts" in search results');
  });
});
