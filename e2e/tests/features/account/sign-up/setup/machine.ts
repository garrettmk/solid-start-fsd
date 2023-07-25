import { NewAccountInput } from "@/features/account/sign-up/index.js";
import { newAccountInputSchema } from "@/features/account/sign-up/schemas/new-account-input-schema.js";
import { assign, createMachine } from "xstate";
import { InputAccountInfoEvent, InputProfessionEvent } from "./events.js";


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
        human: {},
        robot: {},
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
        },
        submitted: {
          states: {
            valid: {
              on: {
                NEXT: '#root.success'
              },
            },
            invalid: {
              on: {
                NEXT: 'invalid'
              },
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
    },

    error: {
    },
  }
}, {
  guards: {
    isHumanProfession: (ctx, event) => (event as InputProfessionEvent).payload === 'human',
    isRobotProfession: (ctx, event) => (event as InputProfessionEvent).payload === 'robot',
    isValidAccountInfo: (ctx, event) => newAccountInputSchema.safeParse((event as InputAccountInfoEvent).payload).success,
    hasValidAccountInfo: (ctx) => newAccountInputSchema.safeParse(ctx.accountInfo).success,
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
