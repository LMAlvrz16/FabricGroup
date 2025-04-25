import { Page, Locator, expect } from "@playwright/test";
import { HomePage } from "./HomePage";

export class UpdateContactInfoPage{
    public page: Page
    constructor(page: Page){
        this.page = page
    }

    // Locators or Selectors

    // Actions
    async navigateToRequestLoanPage(){
        const homePage = new HomePage(this.page)
        await homePage.clickRequestLoan()
    }
}