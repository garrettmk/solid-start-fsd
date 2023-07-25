import { NewAccountInput } from "@/features/account/sign-up/schemas/new-account-input-schema.js";
import { Page } from "playwright";

export class SignUpPage {
  public constructor(
    public page: Page,
    public professionHeader = page.getByText('What is your profession?'),
    public humanOption = page.getByRole('radio', { name: /human/i }),
    public robotOption = page.getByRole('radio', { name: /robot/i }),
    public nextButton = page.getByRole('button', { name: /next/i }),
    public backButton = page.getByRole('button', { name: /(back|prev)/i }),
    public accountInfoHeader = page.getByText('Account Information'),
    public fullNameInput = page.getByLabel('Full Name'),
    public fullNameErrorLabel = page.locator('#fullName-error'),
    public emailInput = page.getByLabel('Email', { exact: true }),
    public emailErrorLabel = page.locator('#email-error'),
    public passwordInput = page.getByLabel('Password', { exact: true }),
    public passwordErrorLabel = page.locator('#password-error'),
    public confirmPasswordInput = page.getByLabel('Confirm Password', { exact: true }),
    public confirmPasswordErrorLabel = page.locator('#confirmPassword-error'),
    public agreesToTermsInput = page.getByRole('checkbox', { name: /terms and conditions/i }),
    public agreesToTermsErrorLabel = page.locator('#agreesToTerms-error'),
    public wantsMarketingInput = page.getByRole('checkbox', { name: /marketing/i }),
    public successHeader = page.getByText(/congratulations/i),
    public failureHeader = page.getByText(/uh-oh/i),
  ) { }

  public goto() {
    return this.page.goto('/sign-up');
  }

  public async next() {
    await this.nextButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  public async back() {
    return this.backButton.click();
  }


  public isChooseProfession() {
    return this.professionHeader.isVisible();
  }

  public async chooseHuman() {
    return this.humanOption.click();
  }

  public async isHuman() {
    return this.humanOption.isChecked();
  }

  public async chooseRobot() {
    return this.robotOption.click();
  }

  public async isRobot() {
    return this.robotOption.isChecked();
  }

  public isAccountInfo() {
    return this.accountInfoHeader.isVisible();
  }

  public async fillFullName(name: string) {
    if (name)
      await this.fullNameInput.fill(name);
    else
      await this.fullNameInput.clear();
  }

  public async hasFullNameError() {
    return this.fullNameErrorLabel.isVisible();
  }

  public async fillEmail(email: string) {
    if (email)
      await this.emailInput.fill(email);
    else
      await this.emailInput.clear();
  }

  public async hasEmailError() {
    return this.emailErrorLabel.isVisible();
  }

  public async fillPassword(password: string) {
    return this.passwordInput.fill(password);
  }

  public async hasPasswordError() {
    return this.passwordErrorLabel.isVisible();
  }

  public async fillConfirmPassword(password: string) {
    return this.confirmPasswordInput.fill(password);
  }

  public async hasConfirmPasswordError() {
    return this.confirmPasswordErrorLabel.isVisible();
  }

  public async agreeToTerms() {
    await this.agreesToTermsInput.check();
  }

  public async doNotAgreeToTerms() {
    await this.agreesToTermsInput.uncheck();
  }

  public async agreeToTermsError() {
    return this.agreesToTermsErrorLabel.isVisible();
  }

  public async wantsMarketing() {
    return this.wantsMarketingInput.check();
  }

  public async doesNotWantMarketing() {
    return this.wantsMarketingInput.uncheck();
  }

  public async fillAccountInformation(accountInfo: Partial<NewAccountInput>) {
    if (accountInfo.fullName !== undefined)
      await this.fillFullName(accountInfo.fullName + '');

    if (accountInfo.email !== undefined)
      await this.fillEmail(accountInfo.email + '');

    if (accountInfo.password !== undefined)
      await this.fillPassword(accountInfo.password + '');

    if (accountInfo.confirmPassword !== undefined)
      await this.fillConfirmPassword(accountInfo.confirmPassword + '');

    if (accountInfo.agreesToTerms)
      await this.agreeToTerms();
    else if (accountInfo.agreesToTerms !== undefined)
      await this.doNotAgreeToTerms();

    if (accountInfo.wantsMarketing)
      await this.wantsMarketing();
    else if (accountInfo.wantsMarketing !== undefined)
      await this.doesNotWantMarketing();
  }

  public async hasError() {
    return (await Promise.all([
      this.hasFullNameError(),
      this.hasEmailError(),
      this.hasPasswordError(),
      this.hasConfirmPasswordError(),
      this.agreeToTermsError(),
    ])).some(Boolean);
  }

  public async isSuccess() {
    await this.successHeader.waitFor({ state: 'visible' });
    return this.successHeader.isVisible();
  }

  public async isFailure() {
    return this.failureHeader.isVisible();
  }
}