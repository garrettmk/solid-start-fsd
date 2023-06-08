import { Locator, Page } from 'playwright';


export class AppHomePage {
  public signOutButton: Locator;

  public constructor(public readonly page: Page) {
    this.signOutButton = page.getByLabel(/sign out/i);
  }

  public async signOut() {
    await this.signOutButton.click();
  }
}