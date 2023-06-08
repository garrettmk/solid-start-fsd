import { Locator, Page } from 'playwright';


export class AppHomePage {
  public signOutButton: Locator;
  public toggleDarkModeButton: Locator;

  public constructor(public readonly page: Page) {
    this.signOutButton = page.getByLabel(/sign out/i);
    this.toggleDarkModeButton = page.getByLabel(/toggle dark mode/i);
  }

  public async signOut() {
    await this.signOutButton.click();
  }

  public async toggleDarkMode() {
    await this.toggleDarkModeButton.click();
  }
}