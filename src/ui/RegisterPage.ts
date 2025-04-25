import { Page, Locator, expect } from "@playwright/test";
import { Common } from "../utils/common";

export class RegisterPage{
    public page: Page
    constructor(page: Page){
        this.page = page
    }

    // Locators and Selectors
    public firstnameText = "input[id='customer.firstName']"
    public lastnameText = "input[id='customer.lastName']"
    public addressText = "input[id='customer.address.street']"
    public cityText = "input[id='customer.address.city']"
    public stateText = "input[id='customer.address.state']"
    public zipCodeText = "input[id='customer.address.zipCode']"
    public phoneNumberText = "input[id='customer.phoneNumber']"
    public ssnText = "input[id='customer.ssn']"
    public usernameText = "input[id='customer.username']"
    public passwordText = "input[id='customer.password']"
    public confirmPasswordText = "input[id='repeatedPassword']"
    public registerButton = "input[value='Register']"
    public successMessage = "#rightPanel p"

    // Action
    async fillOutSignUpForm(){
        const commonFunc = new Common()
        const username = commonFunc.generateRandomString(6)
        const password = commonFunc.generateRandomString(9)

        await this.page.locator(this.firstnameText).pressSequentially(commonFunc.generateRandomString(8), {delay: 100})
        await this.page.locator(this.lastnameText).pressSequentially(commonFunc.generateRandomString(8), {delay: 100})
        await this.page.locator(this.addressText).pressSequentially(commonFunc.generateRandomString(8), {delay: 100})
        await this.page.locator(this.cityText).pressSequentially(commonFunc.generateRandomString(8), {delay: 100})
        await this.page.locator(this.stateText).pressSequentially(commonFunc.generateRandomString(8), {delay: 100})
        await this.page.locator(this.zipCodeText).pressSequentially(commonFunc.generateRandomString(5), {delay: 100})
        await this.page.locator(this.phoneNumberText).pressSequentially(commonFunc.generateRandomString(9, "09", true), {delay: 100})
        await this.page.locator(this.ssnText).pressSequentially(commonFunc.generateRandomString(9), {delay: 100})
        await this.page.locator(this.usernameText).pressSequentially(username, {delay: 100})
        await this.page.locator(this.passwordText).pressSequentially(password, {delay: 100})
        await this.page.locator(this.confirmPasswordText).pressSequentially(password, {delay: 100})
        return {username: username, password: password}
    }

    async clickRegisterButton(){
        await this.page.locator(this.registerButton).click()
        await expect(this.page).toHaveURL(/register/)
        await expect(this.page.locator(this.successMessage)).toHaveText(/You are now logged in./)
    }
}
