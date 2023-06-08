import { Locator, Page } from "playwright";


export class SignInPage {
  public emailInput: Locator;
  public passwordInput: Locator;
  public signInButton: Locator;
  public errorMessage: Locator;

  static async from(page: Page): Promise<SignInPage> {
    await page.goto('/sign-in');
    await page.waitForLoadState('networkidle');

    return new SignInPage(page);
  }

  static async signIn(page: Page, email: string, password: string) {
    const signInPage = await SignInPage.from(page);
    await signInPage.signIn(email, password);
  }

  private constructor(public page: Page) {
    this.emailInput = page.getByLabel(/email/i);
    this.passwordInput = page.getByLabel(/password/i);
    this.signInButton = page.getByRole('button', { name: /login/i });
    this.errorMessage = page.getByRole('alert');
  }

  async signIn(email: string, password: string) {
    await this.emailInput.type(email);
    await this.passwordInput.type(password);
    await this.signInButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}