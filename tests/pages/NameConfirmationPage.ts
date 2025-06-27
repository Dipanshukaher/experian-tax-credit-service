import { Page, expect } from '@playwright/test';

export class NameConfirmationPage {
  private submitXpath = `//*[@class='col-xs-12 continue-button-container']//input[@type='submit']`;
  private nameConfirmationTextXpath = "//*[@class='ima-answer-item-container']//*[@type='text']";

  constructor(private page: Page) {}

  async validateName(expectedFullName: string) {
    const actual = await this.page.locator(this.nameConfirmationTextXpath).inputValue();
    expect(actual.toLowerCase()).toBe(expectedFullName.toLowerCase());
    console.log("Name -", actual);
    await this.page.locator(this.submitXpath).click();
  }
}
