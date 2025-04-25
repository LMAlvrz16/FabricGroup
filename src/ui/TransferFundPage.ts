import { Page, Locator, expect } from "@playwright/test";
import { HomePage } from "./HomePage";
import { Common } from "../utils/common";

export class TransferFundPage{
    public page: Page
    constructor(page: Page){
        this.page = page
    }

    // Locators and Selector
    public amountText = "#amount"
    public fromAccountDropdown = "select[id='fromAccountId']"
    public toAccountDropdown = "select[id='toAccountId']"
    public transferButton = "input[value='Transfer']"
    public showResultMessage = "#showResult"
    public selectedAccount = "option[selected='selected']"
    public amountTransferred = "#amountResult"
    public fromAccountId = "#fromAccountIdResult"
    public toAccountId = "#toAccountIdResult"
    
    // Actions
    async transferFundToOtherAccount(newlyCreatedAccount: string, amount: string){
        // The reason why I base the amount transfer from the amount transfered in new account, this is to avoid negative balance.
        const common = new Common()
        const amountToTransfer = common.generateRandomNumber(parseInt(amount.replace("$", "")))
        await this.page.locator(this.amountText).fill(amountToTransfer.toString())
        await this.page.locator(this.fromAccountDropdown).selectOption(newlyCreatedAccount)
        await this.page.locator(this.toAccountDropdown).selectOption({index: 0})
        const toAccount = await this.page.locator(this.toAccountDropdown).locator(this.selectedAccount).textContent()
        await this.page.locator(this.transferButton).click()

        // validate transaction
        await expect(this.page.locator(this.fromAccountId)).toHaveText(new RegExp(`${newlyCreatedAccount}`))
        await expect(this.page.locator(this.toAccountId)).toHaveText(new RegExp(`${toAccount}`))
        await expect(this.page.locator(this.amountTransferred)).toHaveText(new RegExp(`${amountToTransfer}`))

        return {newAccountBalance: (parseInt(amount.replace("$","")) - amountToTransfer)}
    }

    async navigateToBillPayPage(){
        const homePage = new HomePage(this.page)
        await homePage.clickBillPay()
    }

}