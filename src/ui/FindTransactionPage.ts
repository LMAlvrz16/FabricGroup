import { Page, Locator, expect } from "@playwright/test";
import { HomePage } from "./HomePage";

export class FindTransactionPage{
    public page: Page
    constructor(page: Page){
        this.page = page
    }

    // Locators or Selectors

    // Actions
    async navigateToUpdateProfile(){
        const homePage = new HomePage(this.page)
        await homePage.clickUpdateContactInfo()
    }
}