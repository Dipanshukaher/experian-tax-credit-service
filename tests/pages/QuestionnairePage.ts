import { Page, expect } from '@playwright/test';

export class QuestionnairePage {
  private submitXpath = `//*[@class='col-xs-12 continue-button-container']//input[@type='submit']`;
  private nameConfirmationHeadingXpath = "//*[@data-question-id-text='NameConfirmation']";

  constructor(private page: Page) {}

  async answerAllNo() {
    const allNos = await this.page.locator("//*[@class='survey-question-container']//*[@aria-pressed='false']//input[@text='No']//parent::*").all();
    for (const no of allNos) {
      await no.click();
    }

    await this.page.locator(this.submitXpath).click();
    await this.page.locator(this.nameConfirmationHeadingXpath).waitFor({ state: 'visible', timeout: 10000 });
  }
}
