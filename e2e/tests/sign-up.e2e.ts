import { createModel } from '@xstate/test';
import { Locator, type Page } from 'playwright';
import { ActorRef, ActorRefFrom, AnyEventObject, assign, createMachine, spawn } from 'xstate';
import { expect, test } from '../setup/setup.js';
import { delay } from '@/shared/lib/lang-util.js';
import { TestPlan } from '@xstate/test/lib/types.js';

const makeTestContext = (page: Page) => ({
  page,

  nextButton: () => page.getByRole('button', { name: /next/i }),
  backButton: () => page.getByRole('button', { name: /(back|prev)/i }),

  professionHeader: page.getByText('What is your profession?'),
  humanOption: page.getByRole('radio', { name: /human/i }),
  robotOption: page.getByRole('radio', { name: /robot/i }),

  accountInfoHeader: page.getByText('Account Information'),
  fullNameInput: page.getByLabel('Full Name'),
  fullNameError: page.locator('#fullName-error'),
  emailInput: page.getByLabel('Email', { exact: true }),
  emailError: page.locator('#email-error'),
  passwordInput: page.getByLabel('Password', { exact: true }),
  passwordError: page.locator('#password-error'),
  confirmPasswordInput: page.getByLabel('Confirm Password', { exact: true }),
  confirmPasswordError: page.locator('#confirmPassword-error')
});

type TestContext = ReturnType<typeof makeTestContext>;

const signUpTestMachine = createMachine({
  id: 'sign-up-test',
  predictableActionArguments: true,
  initial: 'gettingProfession',
  states: {
    gettingProfession: {
      on: {
        AS_HUMAN: 'gettingAccountInfo',
        AS_ROBOT: 'gettingAccountInfo'
      },
      meta: {
        test: async ({ professionHeader }: TestContext) => {
          await expect(professionHeader).toBeVisible();
        }
      }
    },

    gettingAccountInfo: {
      initial: 'idle',
      on: {
        BACK: { target: 'gettingProfession' },
      },
      states: {
        idle: {
          on: {
            INPUT: { target: 'ready' }
          }
        },
        ready: {
          on: {
            NEXT: [
              { cond: 'isValidSubmission', target: 'valid' },
              { target: 'invalid' }
            ]
          }
        },
        valid: {
          meta: {
            test: async ({ fullNameInput, fullNameError, emailInput, emailError }: TestContext) => {
              await expect(fullNameInput).toBeVisible();
              await expect(fullNameInput.textContent()).not.toBeFalsy();
              await expect(fullNameError).not.toBeVisible();

              await expect(emailInput).toBeVisible();
              await expect(emailInput.textContent()).not.toBeFalsy();
              await expect(emailError).not.toBeVisible();
            }
          }
        },
        invalid: {
          type: 'parallel',
          states: {
            fullName: {
              initial: 'init',
              states: {
                init: {
                  always: [
                    { cond: 'isValidFullName', target: 'valid' },
                    { target: 'invalid' }
                  ]
                },
                valid: {
                  meta: {
                    test: async ({ fullNameInput, fullNameError }: TestContext) => {
                      await expect(fullNameInput).toBeVisible();
                      await expect(fullNameError).not.toBeVisible();
                    }
                  }
                },
                invalid: {
                  meta: {
                    test: async ({ fullNameInput, fullNameError }: TestContext) => {
                      await expect(fullNameInput).toBeVisible();
                      await expect(fullNameError).toBeVisible();
                    }
                  }
                }
              },
            },

            email: {
              initial: 'init',
              states: {
                init: {
                  always: [
                    { cond: 'isValidEmail', target: 'valid' },
                    { target: 'invalid' }
                  ]
                },
                valid: {
                  meta: {
                    test: async ({ emailInput, emailError }: TestContext) => {
                      await expect(emailInput).toBeVisible();
                      await expect(emailError).not.toBeVisible();
                    }
                  }
                },
                invalid: {
                  meta: {
                    test: async ({ emailInput, emailError }: TestContext) => {
                      await expect(emailInput).toBeVisible();
                      await expect(emailError).toBeVisible();
                    }
                  }
                }
              },
            },
          }
        }
      }
    },


    // gettingAccountInfo: {
    //   type: 'parallel',
    //   states: {
    //     fullName: {
    //       initial: 'idle',
    //       states: {
    //         idle: {
    //           meta: {
    //             test: async ({ fullNameInput }: TestContext) => {
    //               await expect(fullNameInput).toBeVisible();
    //             }
    //           }
    //         },
    //         valid: {
    //           meta: {
    //             test: async ({ fullNameInput, fullNameError }: TestContext) => {
    //               await expect(fullNameInput).toBeVisible();
    //               await expect(fullNameError).not.toBeVisible();
    //             }
    //           }
    //         },
    //         invalid: {
    //           meta: {
    //             test: async ({ fullNameInput, fullNameError }: TestContext) => {
    //               await expect(fullNameInput).toBeVisible();
    //               await expect(fullNameError).toBeVisible();
    //             }
    //           }
    //         }
    //       },
    //       on: {
    //         FULL_NAME: [
    //           { cond: 'isValidFullName', target: '.valid' },
    //           { target: '.invalid' }
    //         ]
    //       }
    //     },

    //     email: {
    //       initial: 'idle',
    //       states: {
    //         idle: {
    //           meta: {
    //             test: async ({ emailInput }: TestContext) => {
    //               await expect(emailInput).toBeVisible();
    //             }
    //           }
    //         },
    //         valid: {
    //           meta: {
    //             test: async ({ emailInput, emailError }: TestContext) => {
    //               await expect(emailInput).toBeVisible();
    //               await expect(emailError).not.toBeVisible();
    //             }
    //           }
    //         },
    //         invalid: {
    //           meta: {
    //             test: async ({ emailInput, emailError }: TestContext) => {
    //               await expect(emailInput).toBeVisible();
    //               await expect(emailError).toBeVisible();
    //             }
    //           }
    //         }
    //       },
    //       on: {
    //         EMAIL: [
    //           { cond: 'isValidEmail', target: '.valid' },
    //           { target: '.invalid' }
    //         ]
    //       }
    //     }
    //   }
    // },
    // gettingAccountInfo: {
    //   initial: 'initial',
    //   states: {
    //     initial: {
    //       on: {
    //         BACK: "#sign-up-test.gettingProfession",
    //         FULL_NAME_EMPTY: 'fullNameError',
    //         FULL_NAME_TOO_SHORT: 'fullNameError',
    //         FULL_NAME_INVALID: 'fullNameError',
    //         EMAIL_EMPTY: 'emailError',
    //         EMAIL_INVALID: 'emailError',
    //         PASSWORD_EMPTY: 'passwordError',
    //         PASSWORD_INVALID: 'passwordError',
    //         CONFIRM_PASSWORD_EMPTY: 'confirmPasswordError',
    //         CONFIRM_PASSWORD_MISMATCH: 'confirmPasswordError'
    //       },
    //       meta: {
    //         test: async ({ accountInfoHeader, fullNameInput }: TestContext) => {
    //           await expect(accountInfoHeader).toBeVisible();
    //           await expect(fullNameInput).toBeEmpty();
    //         }
    //       }
    //     },
    //     fullNameError: {
    //       meta: {
    //         test: async ({ fullNameError }: TestContext) => {
    //           await expect(fullNameError).toBeVisible();
    //         }
    //       }
    //     },
    //     emailError: {
    //       meta: {
    //         test: async ({ emailError }: TestContext) => {
    //           await expect(emailError).toBeVisible();
    //         }
    //       },
    //     },
    //     passwordError: {
    //       meta: {
    //         test: async ({ passwordError }: TestContext) => {
    //           await expect(passwordError).toBeVisible();
    //         }
    //       }
    //     },
    //     confirmPasswordError: {
    //       meta: {
    //         test: async ({ confirmPasswordError }: TestContext) => {
    //           await expect(confirmPasswordError).toBeVisible();
    //         }
    //       }
    //     }
    //   },
    // },
    signingUp: {}
  }
}, {
  guards: {
    isValidFullName: () => true,
    isValidEmail: () => true,
    isValidSubmission: () => true,
  }
});

const signUpTestModel = createModel<TestContext>(signUpTestMachine).withEvents({
  NEXT: async ({ nextButton }) => {
    await nextButton().click();
  },

  BACK: async ({ backButton }) => {
    await backButton().click();
  },

  AS_HUMAN: async ({ page, humanOption, nextButton }) => {
    await humanOption.click();
    await nextButton().click();
  },

  AS_ROBOT: async ({ robotOption, nextButton }) => {
    await robotOption.click();
    await nextButton().click();
  },

  FULL_NAME: async ({ nextButton, fullNameInput }) => {
    await fullNameInput.fill('Luke Skywalker');
    await nextButton().click();
  },

  EMAIL: async ({ nextButton, emailInput }) => {
    await emailInput.fill('notanemail.com');
    await nextButton().click();
  },

  // FULL_NAME_EMPTY: async ({ page, fullNameInput, nextButton }) => {
  //   await fullNameInput.selectText();
  //   await fullNameInput.press('Backspace');
  //   await nextButton().click();
  // },

  // FULL_NAME_TOO_SHORT: async ({ page, fullNameInput, nextButton }) => {
  //   await fullNameInput.selectText();
  //   await fullNameInput.type('x');
  //   await nextButton().click();
  // },

  // FULL_NAME_INVALID: async ({ page, fullNameInput, nextButton }) => {
  //   await fullNameInput.selectText();
  //   await fullNameInput.type('!8008!');
  //   await nextButton().click();
  // },

  // EMAIL_EMPTY: async ({ page, emailInput, nextButton }) => {
  //   await emailInput.selectText();
  //   await emailInput.press('Backspace');
  //   await nextButton().click();
  // },

  // EMAIL_INVALID: async ({ page, emailInput, nextButton }) => {
  //   await emailInput.selectText();
  //   await emailInput.type('notanemail.com');
  //   await nextButton().click();
  // },

  // PASSWORD_EMPTY: async ({ passwordInput, nextButton }) => {
  //   await passwordInput.selectText();
  //   await passwordInput.press('Backspace');
  //   await nextButton().click();
  // },

  // PASSWORD_INVALID: async ({ passwordInput, nextButton }) => {
  //   await passwordInput.selectText();
  //   await passwordInput.type('foo');
  //   await nextButton().click();
  // },

  // CONFIRM_PASSWORD_EMPTY: async ({ passwordInput, confirmPasswordInput, nextButton }) => {
  //   await passwordInput.type('Valid1234!');
  //   await confirmPasswordInput.selectText();
  //   await confirmPasswordInput.press('Backspace');
  //   await nextButton().click();
  // },

  // CONFIRM_PASSWORD_MISMATCH: async ({ passwordInput, confirmPasswordInput, nextButton }) => {
  //   await passwordInput.type('Valid1234!');
  //   await confirmPasswordInput.type('foo');
  //   await nextButton().click();
  // }
});


test.describe('sign-up', () => {
  const testPlans = [
    ...signUpTestModel.getSimplePathPlans(),
    // signUpTestModel.getPlanFromEvents([
    //   { type: 'AS_HUMAN' },
    //   { type: 'BACK' }
    // ], {
    //   target: 'gettingProfession'
    // })
  ];

  testPlans.forEach(plan => {
    test.describe(plan.description, () => {
      plan.paths.forEach(path => {
        test(path.description, async ({ page }) => {
          await page.goto('/sign-up');
          await page.waitForLoadState('networkidle');

          const context = makeTestContext(page);
          await path.test(context);
        });
      });
    });
  });
});


type FormInputTestContext = {
  page: Page
  input: Locator
  error: Locator
}

const formInputTestMachine = createMachine({
  id: '#root',
  predictableActionArguments: true,
  states: {
    initial: {
      meta: {
        test: async ({ input }: FormInputTestContext) => {
          await expect(input).toBeVisible();
        }
      }
    },
    valid: {
      meta: {
        test: async ({ input, error }: FormInputTestContext) => {
          await expect(input).toBeVisible();
          await expect(error).not.toBeVisible();
        }
      }
    },
    invalid: {
      meta: {
        test: async ({ input, error }: FormInputTestContext) => {
          await expect(input).toBeVisible();
          await expect(error).toBeVisible();
        }
      }
    }
  },
  on: {
    VALID_INPUT: 'valid',
    INVALID_INPUT: 'invalid'
  }
});

type FormInputTestMachine = typeof formInputTestMachine;

const setInputText = async (input: Locator, text: string) => {
  await input.selectText();
  text
    ? await input.type(text)
    : await input.press('Backspace');
  await input.press('Tab');
}

const runTests = (plans: TestPlan<FormInputTestContext, FormInputTestContext>[], tag: string) => {
  plans.forEach(plan => {
    test.describe(`${tag}: ${plan.description}`, () => {
      plan.paths.forEach(path => {
        test(path.description, async ({ page }) => {
          await page.goto('/sign-up');
          await page.waitForLoadState('networkidle');
          await page.getByRole('button', { name: /next/i }).click();

          const context: FormInputTestContext = {
            page,
            input: page.getByLabel('Full Name'),
            error: page.locator('#fullName-error')
          };

          await path.test(context);
        });
      });
    });
  });
}

// test.describe('sign-up', () => {

//   test.describe('Full Name', () => {

//     const model = createModel<FormInputTestContext>(formInputTestMachine);

//     const validInputs = [
//       "Luke Skywalker",
//       // "Darth Vader",
//       // "Han Solo"
//     ];

//     validInputs.forEach(value => {
//       const plans = model
//         .withEvents({ VALID_INPUT: async ({ input }) => setInputText(input, value) })
//         .getSimplePathPlans();

//       runTests(plans, value);
//     });


//     // const invalidInputs = [
//     //   '',
//     //   'f',
//     //   '89wasagoodyear'
//     // ];
//   });
// });