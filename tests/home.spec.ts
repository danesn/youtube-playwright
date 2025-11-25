import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home_page';
import { BrowserHelper } from '../utils/browser_util';
import scenario from '../test-data/home_data.json';


test.describe('Regression Test - Home Page', async () => {

	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test(scenario.TC01.title, async ({ page }) => {
		const homePage = new HomePage(page);

		// Test Data
		const titleVideo = scenario.TC01.data.title;

		// Test Step
		await homePage.searchbox.fillInputSearch(titleVideo);
		await homePage.searchbox.clickBtnSearch();

		// Assert
		await BrowserHelper.waitForPageLoadState(page);
		await homePage.searchbox.assertSearchResultTitleVideoMatch(titleVideo, 0);
	});
});


