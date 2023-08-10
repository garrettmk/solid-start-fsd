import { UserProfile } from "@/entities/user-profile/schemas/user-profile-schema.js";
import { assign, createMachine } from "xstate";
import { crossMerge, EventSource, TestRunner, TransitionCallbackMap } from "xstate-paths";
import { ProfilePage } from "./profile-e2e-page.js";
import { expect } from './profile-e2e-setup.js';
import { UserProfileUpdate, userProfileUpdateSchema } from "@/features/user-profiles/update/schemas/user-profile-update-schema.js";

export type InputProfileEvent = {
  type: 'INPUT_PROFILE',
  payload: Partial<UserProfile>
};

export type SubmitEvent = {
  type: 'SUBMIT',
};

export type ProfilePageEvent = InputProfileEvent | SubmitEvent;

export type ProfilePageContext = {
  userProfile?: Partial<UserProfile>;
}

export const profilePageMachine = createMachine<ProfilePageContext>({
  /** @xstate-layout N4IgpgJg5mDOIC5QCcD2qAuA6ADmgZgJYA2YWArgHazkBGAtoRhpAMQCSAcgAoCqAKgH1uAJQDyAMXYAZAKIBtAAwBdRKBypYTQqkpqQAD0QBOAEwBGLABYAbAA4A7AFYANCACeic08uLzxgMCg4zsAX1C3NExcAhIyKhoGJhYIVgBlXgAhAFl2fiVVJBANLQwdPSKjBFMrAGYsHycbU1cPRFNFByxau2MHY3MbIeGbB3DI9Gw8VCJSCmo6RmY2DJy8+XNC9U1tXX0qmvrG5tbPaqcuu17+wZGhsYiQKKnYucSllKxCSgA3AENiIRUlw+EJRJIZAoVPoSrsKqAqlYrMZuuYWm4zg4HDYsL0bE0WooiUTzOMnpMYjM4lh3slIF9fgCgRweAJhOIpHINltijsyntKohnCiThjEHZFKZrA5aminMTiaTHs9KbMyLTlhAGf9AalVrl8tCirD+fDDOKkVh-E5Zei2ghnPU+rb5Qq-GSVdM1TTFnStTrmSC2eDOVCeSbyvsvKYHGKHXYpTU7HK3e7lRSvdSNZ8A8DWWCOZDuTC+ZHBQgkSiXXHHIpccj7M43UqJtFM29fZqsLn0lkDQUS6UywjEJXUXbMX5utcBndRuFHpRUBA4PpnoO4VGEABacyx+3b0xOiWphXmMLptuvMAb01b2VxmxHfzBYIX1svKlzBKdlK34fmggdhWFgNjGDacpxi0ljOmiyKvu+5JXl+6q-pA-4CiODrGI+ihONKLqpi2SGft62b0t8uYYWaVTAXWtSKLYjinCYU5WKYJynsRnrXj6SRdlRxqlphgGmGJVoEixQF2PUHQpkRHoZrx5FajQADGalwPAQlDiJtFWPRjGNlJYFSrBhLNguoRAA */
  predictableActionArguments: true,
  preserveActionOrder: true,

  id: 'root',
  context: {},
  initial: 'profile',
  states: {
    profile: {
      initial: 'start',
      states: {
        start: {
          on: {
            INPUT_PROFILE: { actions: 'assignProfile', target: 'unsubmitted' },
          }
        },
        unsubmitted: {
          on: {
            INPUT_PROFILE: { actions: 'assignProfile' },
            SUBMIT: [
              { cond: 'hasValidProfile', target: '#root.success' },
              { target: 'submitted.invalid' }
            ]
          }
        },
        submitted: {
          states: {
            invalid: {
              on: {
                INPUT_PROFILE: [
                  { cond: 'hasValidProfile', target: 'valid', actions: 'assignProfile' },
                  { actions: 'assignProfile' }
                ],
                SUBMIT: 'invalid'
              }
            },
            valid: {
              on: {
                INPUT_PROFILE: [
                  { cond: 'hasValidProfile', actions: 'assignProfile' },
                  { target: 'invalid', actions: 'assignProfile'}
                ],
                SUBMIT: '#root.success'
              }
            },
          }
        },
      },
    },
    success: {
      type: 'final'
    }
  }
}, {
  guards: {
    hasValidProfile: (context, event) => {
      if (event.type === 'INPUT_PROFILE')
        return userProfileUpdateSchema.safeParse(event.payload).success;
      else
        return userProfileUpdateSchema.safeParse(context.userProfile).success;
    },
  },

  actions: {
    assignProfile: assign({
      userProfile: (context, event) => (event as InputProfileEvent).payload,
    })
  }
});


export const profileUpdateData: Partial<UserProfileUpdate> = {
  fullName: 'Harvey Dent',
  preferredName: 'Two Face',
  avatarInitials: 'TF',
};

export const profilePageEvents = new EventSource({
  INPUT_PROFILE: crossMerge([profileUpdateData], [
    {},
    { fullName: '' },
    { preferredName: '' },
    { avatarInitials: '' },
  ]).map((payload) => ({
    type: 'INPUT_PROFILE',
    payload,
  })),
});


export const eventCallbacks: TransitionCallbackMap<[ProfilePage]> = {
  INPUT_PROFILE: async (currentState, profilePage) => {
    const event = currentState.event as InputProfileEvent;
    await profilePage.updateProfileForm.fill(event.payload);
  },

  SUBMIT: async (currentState, profilePage) => {
    if (currentState.matches('success'))
      await profilePage.updateProfileForm.submitValid();
    else
      await profilePage.updateProfileForm.submitInvalid();
  }
}


export const stateCallbacks: TransitionCallbackMap<[ProfilePage]> = {
  'profile': async (currentState, profilePage) => {
    await expect(profilePage.fullName).toBeVisible();
    await expect(profilePage.avatar).toBeVisible();
    await expect(profilePage.createdDate).toBeVisible();
  },

  'profile.unsubmitted': async (currentState, profilePage) => {
    await expect(await profilePage.updateProfileForm.hasErrors()).toBe(false);
  },

  'profile.submitted.invalid': async (currentState, profilePage) => {
    await expect(await profilePage.updateProfileForm.hasErrors()).toBe(true);
  },

  'profile.submitted.valid': async (currentState, profilePage) => {
    await expect(await profilePage.updateProfileForm.hasErrors()).toBe(false);
  },

  'success': async (currentState, profilePage) => {
    const updatedProfile = { ...profilePage.userProfile, ...profileUpdateData };
    const updatedPage = new ProfilePage(profilePage.page, updatedProfile);

    await expect(await updatedPage.updateProfileForm.submitButton).toBeEnabled();
    await expect(await updatedPage.updateProfileForm.hasErrors()).toBe(false);
    await expect(await updatedPage.fullName).toBeVisible();
    await expect(await updatedPage.avatar).toBeVisible();
  }
}

export const profilePageRunner = new TestRunner(eventCallbacks, stateCallbacks);