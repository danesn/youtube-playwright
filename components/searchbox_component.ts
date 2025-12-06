import { expect, Locator, Page } from "@playwright/test";

const defaultTimeout = 5000;

export class SearchBoxComponent {
    // Base Element
    public readonly searchboxLocator: Locator;
    // Child Element
    readonly inputSearch: Locator;
    readonly btnSearch: Locator;
    readonly itemSectionRenderer: Locator;
    readonly videoRenderer: Locator;

    constructor(page: Page) {
        // Base Element
        this.searchboxLocator = page.locator('yt-searchbox');

        // Input
        this.inputSearch = this.searchboxLocator.locator('input[name="search_query"]');

        // Button
        this.btnSearch = this.searchboxLocator.locator('button[title="Search"]');

        // Custom Element
        this.itemSectionRenderer = page.locator('ytd-item-section-renderer');
        this.videoRenderer = this.itemSectionRenderer.locator('ytd-video-renderer');
    }

    // --- Click Function ---
    async clickBtnSearch() {
        await expect(this.btnSearch).toBeVisible({ timeout: defaultTimeout });
        await this.btnSearch.click({ timeout: defaultTimeout });
    }

    // --- Fill Function ---
    async fillInputSearch(search: string) {
        await expect(this.inputSearch).toBeVisible({ timeout: defaultTimeout} );
        await this.inputSearch.clear({ timeout:defaultTimeout });
        await this.inputSearch.fill(search, { timeout: defaultTimeout });
    }

    // --- Assertion Function ---
    async assertSearchResultTitleVideoMatch(expectedTitleVideo: string, index: number) {
        await expect(this.itemSectionRenderer).toBeVisible({ timeout: defaultTimeout });
        const firstElementVideoRenderer = this.videoRenderer.nth(index);
        await expect(firstElementVideoRenderer).toBeVisible({ timeout: defaultTimeout });
        const elementTitleVideo = firstElementVideoRenderer.locator('#video-title');
        await expect(elementTitleVideo).toBeVisible({ timeout: defaultTimeout });
        const actualTitleVideo = await elementTitleVideo.innerText();
        expect(actualTitleVideo).toEqual(expectedTitleVideo);
    }

}