import { crossMerge } from "../../../../util/machines/cross-merge.js";
import { EventMap } from "../../../../util/machines/event-map.js";
import { TestContext } from "./context";
import { NewAccountInput } from "@/features/account/sign-up/index.js";


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
    exec: async ({ nextButton }) => {
      await nextButton().click();
    }
  },

  BACK: {
    exec: async ({ backButton }) => {
      await backButton().click();
    }
  },

  INPUT_PROFESSION: {
    exec: async ({ profession }, event) => {
      const humanOrRobot = (event as InputProfessionEvent).payload;

      if (humanOrRobot === 'human')
        await profession.humanOption.click();
      else
        await profession.robotOption.click();
    },

    data: [
      { payload: 'human' },
      { payload: 'robot' },
    ]
  },

  INPUT_ACCOUNT_INFO: {
    exec: async ({ accountInfo }, event) => {
      const values = (event as InputAccountInfoEvent).payload;

      for (const [name, value] of Object.entries(values)) {
        const { input, type } = accountInfo.inputs[name as keyof TestContext['accountInfo']['inputs']];

        switch (type) {
          case 'text':
            await input.fill(value + '');
            break;
          case 'checkbox':
            value
              ? await input.check()
              : await input.uncheck();
            break;
          default:
            throw new Error(`Unknown input type: ${type}`);
        }
      }
    },


    data: crossMerge<NewAccountInput>([
      { fullName: 'Luke Skywalker', email: 'luke@thealliance.org', password: 'LuLu2020!', confirmPassword: 'LuLu2020!', agreesToTerms: true, wantsMarketing: true },
    ], [
      { fullName: '' },
      { fullName: 0 },
    ]).map((payload) => ({ payload }))
  },
});