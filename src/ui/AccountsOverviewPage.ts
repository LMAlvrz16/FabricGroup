import { Page, Locator, expect } from "@playwright/test";
import { HomePage } from "./HomePage";

export class AccountsOverviewPage{
    public page: Page
    constructor(page: Page){
        this.page = page
    }

    // Locators and selectors
    public accountTableLink = (id: number) => `a[href="activity.htm?id=${id}"]`
    public accountTable = "table[id='accountTable'] tbody tr"

    // Actions
    async validateNewAccount(accountNumber: string, amountTransfered: string){
        let accounts: string | string [] [] = []
        await expect(this.page.locator(this.accountTable).first()).toBeVisible()
        // This will get the accounts from the table
        for(let i=0; i<await this.page.locator(this.accountTable).count(); i++){
            accounts.push(await this.page.locator(this.accountTable).nth(i).locator('td').allTextContents())
        }

        // first validation below doesn't need expect function as it automatically gets the data of account number (balance and available amount) from the table
        const val = accounts.filter((column) => column.includes(accountNumber))

        // second validation check if the transferred amount is the same
        expect(val.map((value) => value.includes(amountTransfered)))
        return accounts
    }

    async navigateToTransferFund(){
        const homePage = new HomePage(this.page)
        await homePage.clickTransferFunds()
    }
}