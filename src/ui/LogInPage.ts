import { Page, Locator, expect } from "@playwright/test";

export class LogInPage{
    public page: Page
    constructor(page: Page){
        this.page = page
    }

    // Locators and Selectors
    public usernameText = "input[name='username']"
    public passwordText = "input[name='password']"
    public loginButton = "input[value='Log In']"
    public registerLink = "#loginPanel p a[href*='register.htm']"
    
    // Actions

    async goTo(url: string){
        await this.page.goto(url)
        await expect(this.page).toHaveURL(/index/)
    }

    async navigateToRegisterPage(){
        await this.page.locator(this.registerLink).click()
        await expect(this.page).toHaveURL(/register/)
    }

    async doLogIn(username: string, password: string){
        await this.page.locator(this.usernameText).fill(username)
        await this.page.locator(this.passwordText).fill(password)
        await this.clickLogInButton()
    }

    async clickLogInButton(){
        await this.page.locator(this.loginButton).click()
        await expect(this.page).toHaveURL(/overview/)
    }

}