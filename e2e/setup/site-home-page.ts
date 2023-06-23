import { Locator, Page } from "playwright";

export class SiteHomePage {
  public page: Page;
  public signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInButton = page.getByRole('button', { name: /sign in/i });
  }

  public async signIn() {
    await this.signInButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}