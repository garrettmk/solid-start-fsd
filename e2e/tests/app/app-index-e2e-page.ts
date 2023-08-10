import { Locator, Page } from 'playwright';


export class AppHomePage {
  public userMenu: UserMenuButton;

  public constructor(public readonly page: Page) {
    this.userMenu = new UserMenuButton(page);
  }
}


export class UserMenuButton {
  public menuButton: Locator;
  public signOutItem: Locator;
  public darkModeItem: Locator;

  public constructor(public readonly page: Page) {
    this.menuButton = page.locator('#user-menu-button');
    this.signOutItem = page.getByText(/logout/i);
    this.darkModeItem = page.getByText(/use (light|dark) theme/i);
  }

  public async openMenu() {
    await this.menuButton.click();
  }

  public async signOut() {
    await this.openMenu();
    await this.signOutItem.click();
  }

  public async toggleDarkMode() {
    await this.openMenu();
    await this.darkModeItem.click();
  }
}