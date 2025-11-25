import { expect, Locator, Page } from "@playwright/test";
import { SearchBoxComponent } from "../components/searchbox_component";

export class HomePage {
    readonly page: Page;

    // Component
    readonly searchbox: SearchBoxComponent;

    constructor(page: Page) {
        this.page = page;
        this.searchbox = new SearchBoxComponent(page);
    }
}