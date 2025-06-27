import { Page } from '@playwright/test';

export class FormPage {
  private submitXpath = `//*[@class='col-xs-12 continue-button-container']//input[@type='submit']`;
  private knockoutLabelXpath = `//*[@data-question-id-text='KnockoutLabel']`;
  private data: Record<string, string> = {};

  constructor(private page: Page) {}

  async enterDetails(data: Record<string, string>) {
    this.data = data;

    const keys = Object.keys(data) as (keyof typeof data)[];
    const size = keys.length;

    for (let i = 0; i < size; i++) {
        const field_name = keys[i];
        const field_value = data[field_name];
        const fieldXpath = `//*[@data-question-id-text='Voter${field_name}']//input[@type='text']`;

        console.log('Field name=' + field_name + ' field value=' + field_value);
        console.log('XPath for field=' + fieldXpath);

        await this.page.fill(fieldXpath, '');
        await this.page.fill(fieldXpath, field_value);
    }

    await this.page.locator(this.submitXpath).click();
    await this.page.locator(this.knockoutLabelXpath).waitFor({ state: 'visible', timeout: 10000 });
  }

  getFullName(): string {
    const fullName = this.data.FirstName+" "+this.data.LastName;
    return fullName;
  }
}
