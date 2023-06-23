import { omit } from "radash";
import { assign, createMachine, ErrorPlatformEvent } from "xstate";
import { ChooseProfessionInput, NewAccountInput } from "../schemas";
import { APIClientDependency, Scope } from "@/shared/lib";
import { useScopeContext } from "@/shared/ui";
import { useMachine } from "@xstate/solid";

export interface SignUpContext {
  profession?: ChooseProfessionInput;
  account?: NewAccountInput;
  error?: Error;
}

export type SaveEvent = {
  type: "SAVE";
  payload?: unknown;
};

export type NextEvent = {
  type: "NEXT";
  payload?: never;
};

export type BackEvent = {
  type: "BACK";
  payload?: never
};

export type SignUpEvent =
  | NextEvent
  | BackEvent
  | ErrorPlatformEvent
  | SaveEvent;


export const signUpMachine = createMachine<SignUpContext, SignUpEvent>(
  {
    id: "root",
    predictableActionArguments: true,
    context: {},
    initial: "gettingProfession",
    states: {
      gettingProfession: {
        on: {
          SAVE: {
            actions: "assignProfession",
          },
          NEXT: {
            cond: "hasProfession",
            target: "gettingAccountInfo",
          },
        },
      },

      gettingAccountInfo: {
        on: {
          BACK: {
            target: "gettingProfession",
          },

          SAVE: {
            actions: "assignAccountInfo",
          },

          NEXT: {
            cond: "hasAccountInfo",
            target: "signingUp",
          },
        },
      },

      signingUp: {
        invoke: {
          src: "signUp",
          onDone: {
            target: "success",
          },
          onError: {
            actions: "assignError",
            target: "error",
          },
        },
      },

      error: {
        on: {
          BACK: {
            actions: "clearError",
            target: "gettingAccountInfo",
          },
        },
      },

      success: {
        type: "final",
      },
    },
  },
  {
    guards: {
      hasProfession: (ctx, event) =>
        Boolean(ctx.profession || ("payload" in event && event.payload)),
      hasAccountInfo: (ctx, event) =>
        Boolean(ctx.account || ("payload" in event && event.payload)),
    },

    actions: {
      assignProfession: assign({
        profession: (ctx, event: NextEvent) => {
          console.log("assignProfession");
          return event.payload ?? ctx.profession;
        },
      }),

      assignAccountInfo: assign({
        account: (ctx, event: NextEvent) => {
          console.log("assignAccountInfo", ctx);
          return event.payload ?? ctx.account;
        },
      }),

      assignError: assign({
        error: (_, event: ErrorPlatformEvent) => event.data,
      }),

      clearError: assign((ctx) => omit(ctx, ["error"])),
    },

    services: {
      signUp: async (context) => {
        throw new Error('signUp service not implemented');
      }
    },
  }
);


export function createSignUpMachine(scope: Scope, context: SignUpContext = {}) {
  const api = scope.get(APIClientDependency);

  return signUpMachine
    .withContext(context)
    .withConfig({
      services: {
        signUp: async (context) => {
          const { profession, account } = context as Required<SignUpContext>;
          const signUpInput = { profession, account };

          const result = await api.account.signUp.mutate(signUpInput);

          if (result.error) throw result.error;
          return result.data;
        },
      }
    })
}


export function useSignUpMachine(context: SignUpContext = {}) {
  const scope = useScopeContext();
  const machine = createSignUpMachine(scope, context);

  return useMachine(machine);
}