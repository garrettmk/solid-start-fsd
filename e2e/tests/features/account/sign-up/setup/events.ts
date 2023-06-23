import { NewAccountInput } from "@/features/account/sign-up/index.js";
import { crossMerge } from "../../../../../util/machines/cross-merge.js";
import { EventMap } from "../../../../../util/machines/event-map.js";
import { TestContext } from "./types.js";
import { signUpInfo } from "./data.js";


export type InputProfessionEvent = {
  type: 'INPUT_PROFESSION',
  payload: 'human' | 'robot'
}

export type InputAccountInfoEvent = {
  type: 'INPUT_ACCOUNT_INFO',
  payload: Partial<NewAccountInput>
}

export const eventMap = new EventMap<TestContext>({
  NEXT: {
    exec: async ({ signUpPage: signUp }) => {
      await signUp.next();
    }
  },

  BACK: {
    exec: async ({ signUpPage: signUp }) => {
      await signUp.back();
    }
  },

  INPUT_PROFESSION: {
    exec: async ({ signUpPage: signUp }, event) => {
      const humanOrRobot = (event as InputProfessionEvent).payload;

      if (humanOrRobot === 'human')
        await signUp.chooseHuman();
      else
        await signUp.chooseRobot();
    },

    data: [
      { payload: 'human' },
      { payload: 'robot' },
    ]
  },

  INPUT_ACCOUNT_INFO: {
    exec: async ({ signUpPage: signUp }, event) => {
      const values = (event as InputAccountInfoEvent).payload;
      await signUp.fillAccountInformation(values);
    },


    data: crossMerge<NewAccountInput>([
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
    ]).map((payload) => ({ payload }))
  },
});