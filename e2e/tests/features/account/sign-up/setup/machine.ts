import { NewAccountInput } from "@/features/account/sign-up/index.js";
import { newAccountInputSchema } from "@/features/account/sign-up/schemas/new-account-input-schema.js";
import { assign, createMachine } from "xstate";
import { signUpInfo } from "./data.js";
import { InputAccountInfoEvent, InputProfessionEvent } from "./events.js";
import { expect } from "./setup.js";
import { TestContext } from "./types.js";


export type MachineContext = {
  profession?: 'human' | 'robot',
  accountInfo?: Partial<NewAccountInput>
}


export const machine = createMachine<MachineContext>({
  predictableActionArguments: true,
  preserveActionOrder: true,

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
            test: async ({ signUpPage: signUp }: TestContext) => {
              await expect(await signUp.isHuman()).toBe(true);
            }
          }
        },
        robot: {
          meta: {
            test: async ({ signUpPage: signUp }: TestContext) => {
              await expect(await signUp.isRobot()).toBe(true);
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
              { cond: 'hasValidAccountInfo', target: '#root.success' },
              { target: 'submitted.invalid' }
            ]
          },
          meta: {
            test: async ({ signUpPage: signUp }: TestContext) => {
              await expect(await signUp.hasError()).toBe(false);
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
                test: async ({ signUpPage: signUp }: TestContext) => {
                  await expect(await signUp.hasError()).toBe(false);
                }
              }
            },
            invalid: {
              on: {
                NEXT: 'invalid'
              },
              meta: {
                test: async ({ signUpPage: signUp }: TestContext) => {
                  await expect(await signUp.hasError()).toBe(true);
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
          { cond: 'hasValidAccountInfo', target: 'success' },
          { target: '.submitted.invalid' }
        ]
      }
    },

    success: {
      type: 'final',
      meta: {
        test: async ({ signUpPage, supabase }: TestContext) => {
          await signUpPage.page.waitForResponse(response => true);
          await expect(await signUpPage.isSuccess()).toBe(true);

          // Check for a user profile entry
          const userID = await supabase.rpc('get_user_id_from_email', {
            email_: signUpInfo.email
          });

          await expect(userID.error).toBeNull();
          await expect(userID.data).not.toBeNull();

          const profile = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', userID.data);

          await expect(profile.error).toBeNull();
          await expect(profile.data).toHaveLength(1);

          // Since this is a final state, we can do some cleanup here
          // It's just easier to do it here than in the test itself
          await supabase.auth.admin.deleteUser(userID.data);
        }
      },
    },

    error: {
      meta: {
        test: async ({ signUpPage: signUp }: TestContext) => {
          await expect(await signUp.hasError()).toBe(true);
        }
      }
    },
  }
}, {
  guards: {
    isHumanProfession: (ctx, event) => (event as InputProfessionEvent).payload === 'human',
    isRobotProfession: (ctx, event) => (event as InputProfessionEvent).payload === 'robot',
    isValidAccountInfo: (ctx, event) => newAccountInputSchema.safeParse((event as InputAccountInfoEvent).payload).success,
    hasValidAccountInfo: (ctx, event) => newAccountInputSchema.safeParse(ctx.accountInfo).success,
  },

  actions: {
    assignProfession: assign({
      profession: (ctx, event) => (event as InputProfessionEvent).payload
    }),

    assignAccountInfo: assign({
      accountInfo: (ctx, event) => ({
        ...ctx.accountInfo,
        ...(event as InputAccountInfoEvent).payload
      })
    })
  }
});
