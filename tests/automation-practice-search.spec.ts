import { test, expect } from '@playwright/test';

test.describe('Automation Practice Website Search Tests', () => {
  test('Search for T-Shirts and verify Faded Short Sleeve T-shirts in results', async ({ page }) => {
    console.log('🚀 Starting automation practice search test');
    
    // Step 1: Navigate to the automation practice website
    console.log('📍 Navigating to automation practice website...');
    await page.goto('http://www.automationpractice.pl/index.php');
    
    // Verify we're on the correct page
    await expect(page).toHaveTitle('My Shop');
    console.log('✅ Successfully navigated to My Shop homepage');
    
    // Step 2: Search for 'T-Shirts' and click Search button
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
    
    // Additional validations for better test coverage
    // Verify the search results count
    const resultsInfo = page.locator('.product-count').first();
    await expect(resultsInfo).toContainText('Showing 1 - 1 of 1 item');
    
    // Verify the product has expected elements
    const productContainer = page.locator('.product-container').first();
    await expect(productContainer).toBeVisible();
    
    // Verify product has image
    const productImage = productContainer.locator('img[alt="Faded Short Sleeve T-shirts"]');
    await expect(productImage).toBeVisible();
    
    // Verify product link is functional
    const productLink = page.locator('a.product-name[title*="Faded Short Sleeve T-shirts"]').first();
    await expect(productLink).toHaveAttribute('href', /.*id_product=1.*/);
    
    console.log('🎉 All validations completed successfully!');
    console.log('📊 Search Test Summary:');
    console.log('   ✓ Navigation to automation practice website');
    console.log('   ✓ Search functionality with "T-Shirts" keyword');
    console.log('   ✓ Search results page loaded correctly');
    console.log('   ✓ "Faded Short Sleeve T-shirts" found in results');
    console.log('   ✓ Product details (image, link) verified');
  });
  
  test('Verify search results page structure and elements', async ({ page }) => {
    console.log('🚀 Testing search results page structure');
    
    // Navigate and perform search
    await page.goto('http://www.automationpractice.pl/index.php');
    await page.getByRole('textbox', { name: 'Search' }).fill('T-Shirts');
    await page.locator('button[name="submit_search"]').click();
    
    // Wait for search results
    await expect(page).toHaveTitle('Search - My Shop');
    
    // Verify page structure elements
    console.log('🔍 Verifying page structure...');
    
    // Check breadcrumb navigation
    const breadcrumb = page.locator('.breadcrumb');
    await expect(breadcrumb).toBeVisible();
    await expect(breadcrumb).toContainText('Search');
    
    // Check sorting options
    const sortSelect = page.locator('#selectProductSort');
    await expect(sortSelect).toBeVisible();
    
    // Check view options (Grid/List)
    const viewOptions = page.locator('.display');
    await expect(viewOptions).toBeVisible();
    await expect(viewOptions.locator('a')).toContainText(['Grid', 'List']);
    
    // Check compare functionality
    const compareButton = page.locator('button').filter({ hasText: 'Compare' });
    await expect(compareButton).toBeVisible();
    
    console.log('✅ Page structure validation completed');
  });
  
  test('Verify search with no results', async ({ page }) => {
    console.log('🚀 Testing search with no results');
    
    // Navigate to homepage
    await page.goto('http://www.automationpractice.pl/index.php');
    
    // Search for something that doesn't exist
    await page.getByRole('textbox', { name: 'Search' }).fill('NonExistentProduct12345');
    await page.locator('button[name="submit_search"]').click();
    
    // Wait for search results page
    await expect(page).toHaveTitle('Search - My Shop');
    
    // Verify no results message
    await expect(page.locator('h1')).toContainText('0 results have been found');
    
    console.log('✅ No results scenario handled correctly');
  });
});
