import { test, expect } from '@playwright/test';
import { LogInPage } from '../src/ui/LogInPage';
import { RegisterPage } from '../src/ui/RegisterPage';
import { HomePage } from '../src/ui/HomePage';
import { OpenNewAccountPage } from '../src/ui/OpenNewAccountPage';
import { AccountsOverviewPage } from '../src/ui/AccountsOverviewPage';
import { TransferFundPage } from '../src/ui/TransferFundPage';
import { BillPayPage } from '../src/ui/BillPayPage';
import { FindTransactionPage } from '../src/ui/FindTransactionPage';
import { UpdateContactInfoPage } from '../src/ui/UpdateContactInfoPage';
import { RequestLoanPage } from '../src/ui/RequestLoanPage';

test.describe("Code Challenge", () => {
  let credential, loginPage, registrationPage, homePage,
   openNewAccountPage, accountsOverviewPage, transferFundPage, billPayPage,
   findTransactionPage, updateProfilePage, requestLoanPage
  test.beforeEach('', async({page}) => {
    loginPage = new LogInPage(page)
    registrationPage = new RegisterPage(page)
    homePage = new HomePage(page)
    openNewAccountPage = new OpenNewAccountPage(page)
    accountsOverviewPage = new AccountsOverviewPage(page)
    transferFundPage = new TransferFundPage(page)
    billPayPage = new BillPayPage(page)
    findTransactionPage = new FindTransactionPage(page)
    updateProfilePage = new UpdateContactInfoPage(page)
    requestLoanPage = new RequestLoanPage(page)
    await loginPage.goTo("https://parabank.parasoft.com/parabank/index.htm")
    await loginPage.navigateToRegisterPage()
    credential = await registrationPage.fillOutSignUpForm()
    await registrationPage.clickRegisterButton()
  })

  test("Do Log In", async ({}) => {
    await homePage.doLogOut()
    await loginPage.doLogIn(credential.username, credential.password)
  })


  test("Verify global navigation menu", async ({}) => {
    await homePage.clickOpenNewAccount()
    await openNewAccountPage.goToAccountsOverview()
    await accountsOverviewPage.navigateToTransferFund()
    await transferFundPage.navigateToBillPayPage()
    await billPayPage.navigateToFindTransactionPage()
    await findTransactionPage.navigateToUpdateProfile()
    await updateProfilePage.navigateToRequestLoanPage()
    await requestLoanPage.clickLogout()
  })

  test("Create a saving account > Do Transfer > Do Pay Bills > API Validation", async ({request}) => {
    await homePage.clickOpenNewAccount()
    const firstSavings = await openNewAccountPage.selectTypeAndAccount("SAVINGS")
    const fund = await openNewAccountPage.clickOpenNewAccountButton()
    const newSavings = await openNewAccountPage.validateNewlyCreatedAccount()
    await openNewAccountPage.goToAccountsOverview()
    await accountsOverviewPage.validateNewAccount(newSavings.accountNumber, fund.amount)

    // do transfer fund
    await accountsOverviewPage.navigateToTransferFund()
    const account = await transferFundPage.transferFundToOtherAccount(newSavings.accountNumber, fund.amount)
    
    // do pay bills
    await transferFundPage.navigateToBillPayPage()
    const accountAfterPayment = await billPayPage.fillOutPaymentForm(newSavings.accountNumber, firstSavings.account, account.newAccountBalance)

    // lastly validate the remaining balance of newly created account after transfer and pay bills transaction
    await billPayPage.navigateToAccountOverviewPage()
    await accountsOverviewPage.validateNewAccount(newSavings.accountNumber, accountAfterPayment.totalAccountBalance)

    // API Validation for bill payment
    const apiUrl = `https://parabank.parasoft.com/parabank/services/bank/accounts/${newSavings.accountNumber}/transactions`
    const response = await request.get(apiUrl, {
      headers: {
        'Accept': 'application/json'
      }
    })
    const responsebody = await response.json()
    expect(response.status()).toBe(200)
    
    // This validation will filter transaction for Bill payment only and map it's amount property to validate the amount paid made in bill payment is the same in the API
    expect(await responsebody
      .filter((accounts: any) => accounts.description.includes("Bill Payment"))
      .map((x:any) => x.amount === accountAfterPayment.amountPaid))
  })
})