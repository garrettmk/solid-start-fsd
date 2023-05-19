import { NewAccountInput } from "@/features/account/sign-up/index.js";
import { assign, createMachine } from "xstate";
import { expect } from "../../../../setup/setup.js";
import { TestContext } from "./context.js";
import { InputAccountInfoEvent, InputProfessionEvent } from "./events.js";


export type MachineContext = {
  profession?: 'human' | 'robot',
  accountInfo?: Partial<NewAccountInput>
}


export const machine = createMachine<MachineContext>({
  id: 'root',
  context: {

  },
  initial: 'gettingProfession',
  states: {
    gettingProfession: {
      initial: 'robot',
      states: {
        human: {
          meta: {
            test: async ({ profession }: TestContext) => {
              await expect(profession.humanOption).toBeChecked();
            }
          }
        },
        robot: {
          meta: {
            test: async ({ profession }: TestContext) => {
              await expect(profession.robotOption).toBeChecked();
            }
          },
        },
        history: {
          type: 'history',
          history: 'shallow'
        }
      },
      on: {
        INPUT_PROFESSION: [
          { cond: 'isHumanProfession', target: 'gettingProfession.human', actions: 'assignProfession' },
          { cond: 'isRobotProfession', target: 'gettingProfession.robot', actions: 'assignProfession' }
        ],

        NEXT: 'gettingAccountInfo.history',
      }
    },

    gettingAccountInfo: {
      initial: 'unsubmitted',
      states: {
        unsubmitted: {
          on: {
            INPUT_ACCOUNT_INFO: { actions: 'assignAccountInfo' },
            NEXT: [
              { cond: 'isValidAccountInfo', target: '#root.success' },
              { target: 'submitted.invalid' }
            ]
          },
          meta: {
            test: async ({ accountInfo }: TestContext) => {
              for (const { input, errorLabel } of Object.values(accountInfo.inputs)) {
                await expect(input).toBeVisible();
                errorLabel && await expect(errorLabel).not.toBeVisible();
              }
            }
          }
        },
        submitted: {
          states: {
            valid: {
              on: {
                NEXT: '#root.success'
              },
              meta: {
                test: async ({ accountInfo }: TestContext) => {
                  for (const { input, errorLabel } of Object.values(accountInfo.inputs)) {
                    await expect(input).toBeVisible();
                    errorLabel && await expect(errorLabel).not.toBeVisible();
                  }
                }
              }
            },
            invalid: {
              on: {
                NEXT: 'invalid'
              },
              meta: {
                test: async ({ accountInfo }: TestContext) => {
                  const hasVisibleErrorLabels = (await Promise.all(
                    Object.values(accountInfo.inputs)
                      .map(async ({ errorLabel }) => errorLabel?.isVisible())
                  )).some(Boolean);

                  await expect(hasVisibleErrorLabels).toBe(true);
                }
              }
            }
          },
          on: {
            INPUT_ACCOUNT_INFO: [
              { cond: 'isValidAccountInfo', target: '.valid', actions: 'assignAccountInfo' },
              { target: '.invalid', actions: 'assignAccountInfo' },
            ]
          }
        },

        history: {
          type: 'history',
          history: 'deep'
        }
      },
      on: {
        BACK: 'gettingProfession.history',
        INPUT_ACCOUNT_INFO: { actions: 'assignAccountInfo' },
        NEXT: [
          { cond: 'isValidAccountInfo', target: 'success' },
          { target: '.submitted.invalid' }
        ]
      }
    },

    success: {
      meta: {
        test: async ({ accountInfo }: TestContext) => {
          await expect(accountInfo.inputs.fullName.errorLabel).not.toBeVisible();
        }
      }
    },
    error: {
      meta: {
        test: async ({ accountInfo }: TestContext) => {
          await expect(accountInfo.inputs.fullName.errorLabel).toBeVisible();
        }
      }
    },
  }
}, {
  guards: {
    isHumanProfession: (ctx, event) => (event as InputProfessionEvent).payload === 'human',
    isRobotProfession: (ctx, event) => (event as InputProfessionEvent).payload === 'robot',
    isValidAccountInfo: (ctx, event) => Boolean(ctx.accountInfo?.fullName)
  },

  actions: {
    assignProfession: assign({
      profession: (ctx, event) => (event as InputProfessionEvent).payload
    }),

    assignAccountInfo: assign({
      accountInfo: (ctx, event) => (event as InputAccountInfoEvent).payload
    })
  }
});
