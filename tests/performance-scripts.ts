import { test, expect, Page } from '@playwright/test';

export async function atb(
    page: Page, userContext, events, test
) {
    await test.step('ATB - digestive biscuits', async () => {
        // Nav to home page and accept cookies
        await page.goto('https://www.sainsburys.co.uk/');
        await page.getByRole('button', { name: 'Accept all cookies' }).click();

        // Search for digestive biscuits
        await page.getByTestId('search-term').click();
        await page.getByTestId('search-term').fill('digestive biscuits');
        await page.getByTestId('search-btn').click();

        // Click on the first product in the search results
        const firstProductTile = await page.locator('[data-test-id^="product-tile-"]').first();
        await firstProductTile.locator('.pt__link').click();

        // Try to add the product to the trolley
        await page.locator('[data-test-id="pd-control-buttons"] [data-test-id="add-button"]').click();

        // Click on the accept cookies button again
        await page.getByRole('button', { name: 'Accept all cookies' }).click();

        // Login to our test account
        await page.getByTestId('username').click();
        await page.getByTestId('username').fill('tahimel927@ikangou.com');

        await page.getByTestId('password').click();
        await page.getByTestId('password').fill('SainsburysTest1!');

        await page.getByTestId('log-in').click();

        // Add the product to the trolley, or increase the quantity if it's already in the trolley
        await page.locator('[data-test-id="pd-control-buttons"] [data-test-id="add-button"]')
            .or(page.locator('[data-test-id="pt-button-inc"]'))
            .click();

        // Go to the trolley page
        await page.locator('[data-test-id="header-trolley"]').click();

        // Check the title of the page is correct
        await expect(page).toHaveTitle(/Trolley | Sainsbury's/);
        await expect(page.locator('[data-test-id="trolley-item"]')).toBeVisible();
        
        // Pause for 5s and take a screenshot
        await page.waitForTimeout(5000);
        await page.screenshot({ path: `trolley-${Date.now()}.png` });
    });
}
