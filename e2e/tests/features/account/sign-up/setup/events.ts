import { NewAccountInput } from "@/features/account/sign-up/index.js";
import { SupabaseClient } from "@supabase/supabase-js";
import { EventSource, TransitionCallbackMap } from "xstate-paths";
import { crossMerge } from "../../../../../util/cross-merge.js";
import { signUpInfo } from "./data.js";
import { expect } from './setup.js';
import { SignUpPage } from "./sign-up-page.js";

/**
 * Generate events for the test machine.
 */

export type InputProfessionEvent = {
  type: 'INPUT_PROFESSION',
  payload: 'human' | 'robot'
}

export type InputAccountInfoEvent = {
  type: 'INPUT_ACCOUNT_INFO',
  payload: Partial<NewAccountInput>
}

export const eventSource = new EventSource({
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
