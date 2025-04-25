import { Page, Locator, expect } from "@playwright/test";
import { HomePage } from "./HomePage";

export class RequestLoanPage{
    public page: Page
    constructor(page: Page){
        this.page = page
    }

    // Locators or Selectors

    // Actions
    async navigateToBillPayPage(){
        const homePage = new HomePage(this.page)
        await homePage.clickBillPay()
    }

    async clickLogout(){
        const homePage = new HomePage(this.page)
        await homePage.doLogOut()
    }
}