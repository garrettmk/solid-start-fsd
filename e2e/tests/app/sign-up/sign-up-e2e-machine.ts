import { NewAccountInput } from "@/features/users/sign-up/index.js";
import { newAccountInputSchema } from "@/features/users/sign-up/schemas/new-account-input-schema.js";
import { assign, createMachine } from "xstate";
import { EventSource, TestRunner, TransitionCallbackMap } from "xstate-paths";
import { crossMerge } from "../../../util/cross-merge.js";
import { SignUpPage } from "./sign-up-page.js";
import { SupabaseClient } from "@supabase/supabase-js";
import { expect } from '@playwright/test';

/**
 * Types
 */

export type InputProfessionEvent = {
  type: 'INPUT_PROFESSION',
  payload: 'human' | 'robot'
}

export type InputAccountInfoEvent = {
  type: 'INPUT_ACCOUNT_INFO',
  payload: Partial<NewAccountInput>
}

export type NextEvent = {
  type: 'NEXT'
};

export type BackEvent = {
  type: 'BACK'
};

export type SignUpEvent = InputProfessionEvent | InputAccountInfoEvent | NextEvent | BackEvent;


export type SignUpContext = {
  profession?: 'human' | 'robot',
  accountInfo?: Partial<NewAccountInput>
}


/**
 * The test machine
 */
export const signUpMachine = createMachine<SignUpContext>({
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


/**
 * Events for the test machine
 */

export const signUpInfo: NewAccountInput = {
  "fullName": "Bob Smith",
  "email": "bob@smith.com",
  "password": "FooFoo2020!",
  "confirmPassword": "FooFoo2020!",
  "agreesToTerms": true,
  "wantsMarketing": true
};


export const signUpEvents = new EventSource({
  INPUT_PROFESSION: [
    { type: 'INPUT_PROFESSION', payload: 'human' },
    { type: 'INPUT_PROFESSION', payload: 'robot' },
  ],

  INPUT_ACCOUNT_INFO: crossMerge<InputAccountInfoEvent>([
    signUpInfo,
  ], [
    {},
    { fullName: '' },
    { fullName: 'x' },
    { email: '' },
    { email: 'not@real' },
    { password: '', confirmPassword: '' },
    { password: 'short', confirmPassword: 'short' },
    { password: 'N0tAM4tc99', confirmPassword: 'LuLu2020!' },
    { agreesToTerms: false },
  ]).map((payload) => ({ 
    type: 'INPUT_ACCOUNT_INFO', 
    payload
  }))
});


/**
 * Interact with the page on an event.
 */

export const eventCallbacks: TransitionCallbackMap<[SignUpPage, SupabaseClient]> = {
  'NEXT': async (currentState, signUp) => {
    await signUp.next();
  },

  'BACK': async (currentState, signUp) => {
    await signUp.back();
  },

  'INPUT_PROFESSION': async (currentState, signUp) => {
    const event = currentState.event as InputProfessionEvent;
    const humanOrRobot = event.payload;

    if (humanOrRobot === 'human')
      await signUp.chooseHuman();
    else if (humanOrRobot === 'robot')
      await signUp.chooseRobot();
    else
      throw new Error(`Invalid profession: ${JSON.stringify(event)}`);
  },

  'INPUT_ACCOUNT_INFO': async (currentState, signUp) => {
    const event = currentState.event as InputAccountInfoEvent;
    const accountInfo = event.payload;

    await signUp.fillAccountInformation(accountInfo);
  },
};


/**
 * Check that the state of the page is what we expect.
 */

export const stateCallbacks: TransitionCallbackMap<[SignUpPage, SupabaseClient]> = {
  'gettingProfession': async (currentState, signUp) => {
    await expect(await signUp.isChooseProfession()).toBe(true);
  },

  'gettingProfession.human': async (currentState, signUp) => {
    await expect(await signUp.isHuman()).toBe(true);
  },

  'gettingProfession.robot': async (currentState, signUp) => {
    await expect(await signUp.isRobot()).toBe(true);
  },

  'gettingAccountInfo': async (currentState, signUp) => {
    await expect(await signUp.isAccountInfo()).toBe(true);
  },

  'gettingAccountInfo.unsubmitted': async (currentState, signUp) => {
    await expect(await signUp.hasError()).toBe(false);
  },

  'gettingAccountInfo.submitted.valid': async (currentState, signUp) => {
    await expect(await signUp.hasError()).toBe(false);
  },

  'gettingAccountInfo.submitted.invalid': async (currentState, signUp) => {
    await expect(await signUp.hasError()).toBe(true);
  },

  'success': async (currentState, signUp, supabase) => {
    await expect(await signUp.isSuccess()).toBe(true);

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

    // Since this is a final state, we can do some cleanup here.
    // It's just easier to do it here than in the test itself,
    // since we have the user ID handy
    await supabase.auth.admin.deleteUser(userID.data);
  },

  'error': async (currentState, signUp) => {
    await expect(await signUp.hasError()).toBe(true);
  },
};


/**
 * A test runner for the sign up machine
 */
export const signUpRunner = new TestRunner<[SignUpPage, SupabaseClient]>(eventCallbacks, stateCallbacks);