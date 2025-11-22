import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home_page';


test.describe('Regression Test - Home Page', async () => {

	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('TC01_Success to search video with Complete Key Phrase', async ({ page }) => {
		const homePage = new HomePage(page);

		// Test Data
		const titleVideo = 'The Walters - Silver Screens [Visualizer]'

		// Test Step
		await homePage.fillInputSearch(titleVideo);
		await homePage.clickBtnSearch();

		// Assert
		await page.waitForLoadState();
		await homePage.assertSearchResultTitleVideoMatch(titleVideo, 0);
	});

});


