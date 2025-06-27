import { Page, expect } from '@playwright/test';

export class HomePage {
    private homePageBannerXpath = "//*[@id='navigation']//a[@href='/employer-services/index']";
    private url = 'https://uat-survey.taxcreditco.com/automation-challenge';

  constructor(private page: Page) {}

  async goto() {
    await this.page.goto(this.url, { timeout: 120000 });
  }

  async validateHomePageLoaded() {
    await this.page.waitForTimeout(5000);
    await this.page.locator(this.homePageBannerXpath).waitFor({ state: 'visible', timeout: 30000 });
    const actual = await this.page.url();
    const expected = "https://www.experian.com/employer-services/";
    expect(actual.toLowerCase()).toBe(expected.toLowerCase());
  }
}
