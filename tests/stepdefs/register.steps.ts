import { Given, When, Then, Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, expect, Page, Browser } from "@playwright/test";
import { DataTable } from '@cucumber/cucumber';
import { HomePage } from '../pages/HomePage';
import { FormPage } from '../pages/FormPage';
import { QuestionnairePage } from '../pages/QuestionnairePage';
import { NameConfirmationPage } from '../pages/NameConfirmationPage';

setDefaultTimeout(60 * 1000);

let page: Page;
let browser: Browser;
let data: Record<string, string> = {};

let homePage: HomePage;
let formPage: FormPage;
let questionnairePage: QuestionnairePage;
let nameConfirmationPage: NameConfirmationPage;


Before(async function () {
    browser = await chromium.launch({ headless: false, args:['--start-maximized'] });
    const context = await browser.newContext({viewport: null});
    page = await context.newPage();

    homePage = new HomePage(page);
    formPage = new FormPage(page);
    questionnairePage = new QuestionnairePage(page);
    nameConfirmationPage = new NameConfirmationPage(page);
});

Given("User navigates to home page", async () => {
    homePage.goto();
});


When("User enters the details", async function (dataTable: DataTable) {
    data = {};
    const rows = dataTable.hashes();
    rows.forEach(row => {
        const key = row['Question'].trim();
        let value = row['Value'].trim();

        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }

        data[key] = value;
    });

    await formPage.enterDetails(data);
    
});


When("User answers the questionnaire", async()=>{
    await questionnairePage.answerAllNo();
});

Then("User validates name", async()=>{
    const fullName = formPage.getFullName();
    await nameConfirmationPage.validateName(fullName);
});

Then("User is redirected to home page", async()=>{
    await homePage.validateHomePageLoaded();
    await browser.close();
});

After(async function () {
    // await browser.close();
});
