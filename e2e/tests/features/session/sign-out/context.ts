import { Page } from "playwright";

export const makeSignInContext = (page: Page) => ({
  page,
  emailInput: page.getByLabel(/email/i),
  passwordInput: page.getByLabel(/password/i),
  signInButton: page.getByRole('button', { name: /login/i }),
  errorMessage: page.getByRole('alert')
});

