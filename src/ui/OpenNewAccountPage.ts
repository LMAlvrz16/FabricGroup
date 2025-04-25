import { Page, Locator, expect } from "@playwright/test";
import { HomePage } from "./HomePage";

export class OpenNewAccountPage{
    public page: Page
    constructor(page: Page){
        this.page = page
    }

    // Locators and selector
    public accountType = "select[id='type']"
    public existingAccount = "select[id='fromAccountId']"
    public openNewAccountButton = "input[value*='New Account']"
    public successMessage = "div[id='openAccountResult']"
    public newAccountIdLink = "a[id='newAccountId']"
    public minimumAmount = "form p b"

    // Action
    async selectTypeAndAccount(type: string){
        // this will select which account type you want to select
        await this.page.locator(this.accountType).selectOption(type)

        // this will select which existing account to transfer funds
        await this.page.locator(this.existingAccount).selectOption({index: 0})
        return {account: await this.page.locator(this.existingAccount).textContent()}
    }

    async clickOpenNewAccountButton(){
        // get the minimum amount to transfer for validation
        let initialAmount = (await this.page.locator(this.minimumAmount).last().textContent())?.split("$")[1]
        await this.page.locator(this.openNewAccountButton).click()
        return {amount: "$"+initialAmount?.split(" ")[0]}
    }

    async validateNewlyCreatedAccount(){
        await expect(this.page.locator(this.successMessage)).toHaveText(/Account Opened!/)
        await expect(this.page.locator(this.newAccountIdLink)).toBeVisible()
        return {accountNumber: await this.page.locator(this.newAccountIdLink).textContent()}
    }

    async goToAccountsOverview(){
        const homePage = new HomePage(this.page)
        await homePage.clickAccountOverview()
    }
}