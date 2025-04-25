import { Page, Locator, expect } from "@playwright/test";

export class HomePage{
    public page: Page
    constructor(page: Page){
        this.page = page
    }
    
    // Locators and selector
    public openNewAccountLink = "a[href*='openaccount']"
    public accountsOverviewLink = "a[href*='overview']"
    public trasnferFundsLink = "a[href*='transfer']"
    public billPayLink = "a[href*='billpay']"
    public findTransactionLink = "a[href*='findtrans']"
    public updateProfileLink = "a[href*='updateprofile']"
    public requestLoanPage = "a[href*='requestloan']"
    public logoutLink = "a[href*='logout']"

    // Action
    async clickOpenNewAccount(){
        await this.page.locator(this.openNewAccountLink).click()
        await expect(this.page).toHaveURL(/openaccount/)
    }

    async clickAccountOverview(){
        await this.page.locator(this.accountsOverviewLink).click()
        await expect(this.page).toHaveURL(/overview/)
    }

    async clickTransferFunds(){
        await this.page.locator(this.trasnferFundsLink).click()
        await expect(this.page).toHaveURL(/transfer/)
    }

    async clickBillPay(){
        await this.page.locator(this.billPayLink).click()
        await expect(this.page).toHaveURL(/billpay/)
    }

    async clickFindTransactions(){
        await this.page.locator(this.findTransactionLink).click()
        await expect(this.page).toHaveURL(/findtrans/)
    }

    async clickUpdateContactInfo(){
        await this.page.locator(this.updateProfileLink).click()
        await expect(this.page).toHaveURL(/updateprofile/)
    }

    async doLogOut(){
        await this.page.locator(this.logoutLink).click()
        await expect(this.page).toHaveURL(/index/)
    }

    async clickRequestLoan(){
        await this.page.locator(this.requestLoanPage).click()
        await expect(this.page).toHaveURL(/requestloan/)
    }
}