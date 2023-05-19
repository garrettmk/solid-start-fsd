import { type Page } from 'playwright';

export const makeTestContext = (page: Page) => ({
  page,

  nextButton: () => page.getByRole('button', { name: /next/i }),
  backButton: () => page.getByRole('button', { name: /(back|prev)/i }),

  profession: {
    header: page.getByText('What is your profession?'),
    humanOption: page.getByRole('radio', { name: /human/i }),
    robotOption: page.getByRole('radio', { name: /robot/i }),
  },

  accountInfo: {
    header: page.getByText('Account Information'),
    inputs: {
      fullName: {
        type: 'text',
        input: page.getByLabel('Full Name'),
        errorLabel: page.locator('#fullName-error'),
      },
      email: {
        type: 'text',
        input: page.getByLabel('Email', { exact: true }),
        errorLabel: page.locator('#email-error'),
      },
      password: {
        type: 'text',
        input: page.getByLabel('Password', { exact: true }),
        errorLabel: page.locator('#password-error'),
      },
      confirmPassword: {
        type: 'text',
        input: page.getByLabel('Confirm Password', { exact: true }),
        errorLabel: page.locator('#confirmPassword-error'),
      },
      agreesToTerms: {
        type: 'checkbox',
        input: page.getByRole('checkbox', { name: /terms and conditions/i }),
        errorLabel: page.locator('#agreesToTerms-error'),
      },
      wantsMarketing: {
        type: 'checkbox',
        input: page.getByRole('checkbox', { name: /marketing/i }),
        errorLabel: undefined
      }
    }
  },

  success: {
    header: page.getByText(/congratulations/i),
  },

  failure: {
    header: page.getByText(/uh\-oh/i),
  }
});

export type TestContext = ReturnType<typeof makeTestContext>;