import { Page } from "@playwright/test";

export class BrowserHelper {
    
    static async waitForPageLoadState(page: Page) {
        await page.waitForLoadState('load');
    }
}