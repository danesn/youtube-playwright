import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
    readonly page: Page;

    // Input
    readonly inputSearch: Locator;

    // Button
    readonly btnSearch: Locator;

    // Custom Element
    readonly itemSectionRenderer: Locator;
    readonly videoRenderer: Locator;

    constructor(page: Page) {
        this.page = page;
        
        // Input
        this.inputSearch = this.page.locator('input[name="search_query"]');

        // Button
        this.btnSearch = this.page.locator('button[title="Search"]');
        
        // Custom Element
        this.itemSectionRenderer = this.page.locator('ytd-item-section-renderer');
        this.videoRenderer = this.itemSectionRenderer.locator('ytd-video-renderer');
    }

    // --- Click Function ---
    async clickBtnSearch() {
        await expect(this.btnSearch).toBeVisible({ timeout: 5000 });
        await this.btnSearch.click({ timeout: 5000 });
    }

    // --- Fill Function ---
    async fillInputSearch(search: string) {
        await expect(this.inputSearch).toBeVisible({ timeout: 5000} );
        await this.inputSearch.clear({ timeout:5000 });
        await this.inputSearch.fill(search, { timeout: 5000 });
    }

    // --- Assertion Function ---
    async assertSearchResultTitleVideoMatch(expectedTitleVideo: string, index: number) {
        await expect(this.itemSectionRenderer).toBeVisible({ timeout: 5000 });
        const firstElementVideoRenderer = this.videoRenderer.nth(index);
        await expect(firstElementVideoRenderer).toBeVisible({ timeout: 5000 });
        const elementTitleVideo = firstElementVideoRenderer.locator('#video-title');
        await expect(elementTitleVideo).toBeVisible({ timeout: 5000 });
        const actualTitleVideo = await elementTitleVideo.innerText();
        expect(actualTitleVideo).toEqual(expectedTitleVideo);
    }
}