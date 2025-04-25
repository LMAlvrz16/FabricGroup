import { Page, Locator, expect } from "@playwright/test";
import { Common } from "../utils/common";
import { HomePage } from "./HomePage";

export class BillPayPage{
    public page: Page
    constructor(page: Page){
        this.page = page
    }

    // Locator and Selector
    public formTable = "table"
    public payeeNameText = "input[name='payee.name']"
    public addressText = "input[name='payee.address.street']"
    public cityText = "input[name='payee.address.city']"
    public stateText = "input[name='payee.address.state']"
    public zipCodeText = "input[name='payee.address.zipCode']"
    public phoneNumberText = "input[name='payee.phoneNumber']"
    public accountNumberText = "input[name='payee.accountNumber']"
    public verifyAccountNumberText = "input[name='verifyAccount']"
    public amountText = "input[name='amount']"
    public fromAccountDropdown = "select[name='fromAccountId']"
    public fromAccountId = "#fromAccountId"
    public amountPaid = "#amount"
    public paymentName = "#payeeName"
    public message = "#billpayResult h1"
    public sendPaymentButton = "input[value*='Send Payment']"

    // Actions
    async fillOutPaymentForm(fromAccountNumber: string, toAccountNumber: string, amount: number){
        const commonFunc = new Common()
        const name = commonFunc.generateRandomString(6)
        const amountToPay = commonFunc.generateRandomNumber(amount)
        await this.page.locator(this.payeeNameText).pressSequentially(name, {delay: 100})
        await this.page.locator(this.addressText).pressSequentially(commonFunc.generateRandomString(8), {delay: 100})
        await this.page.locator(this.cityText).pressSequentially(commonFunc.generateRandomString(8), {delay: 100})
        await this.page.locator(this.stateText).pressSequentially(commonFunc.generateRandomString(8), {delay: 100})
        await this.page.locator(this.zipCodeText).pressSequentially(commonFunc.generateRandomString(5), {delay: 100})
        await this.page.locator(this.phoneNumberText).pressSequentially(commonFunc.generateRandomString(9, "09", true), {delay: 100})
        await this.page.locator(this.accountNumberText).pressSequentially(toAccountNumber, {delay: 100})
        await this.page.locator(this.verifyAccountNumberText).pressSequentially(toAccountNumber, {delay: 100})
        await this.page.locator(this.amountText).pressSequentially(amountToPay.toString(), {delay: 100})
        await this.page.locator(this.fromAccountDropdown).selectOption(fromAccountNumber)
        await this.page.locator(this.sendPaymentButton).click()

        // validate payment
        await expect(this.page.locator(this.message)).toBeVisible()
        await expect(this.page.locator(this.message)).toHaveText(/Bill Payment Complete/)
        await expect(this.page.locator(this.amountPaid)).toHaveText(new RegExp(`${amountToPay}`))
        await expect(this.page.locator(this.fromAccountId)).toHaveText(new RegExp(`${fromAccountNumber}`))
        return {totalAccountBalance: amount - amountToPay, amountPaid: amountToPay}
    }

    async navigateToAccountOverviewPage(){
        const homePage = new HomePage(this.page)
        await homePage.clickAccountOverview()
    }

    async navigateToFindTransactionPage(){
        const homePage = new HomePage(this.page)
        await homePage.clickFindTransactions()
    }
}
