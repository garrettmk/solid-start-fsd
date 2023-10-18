import { action } from "@storybook/addon-actions";
import { CreateMutationResult } from "@tanstack/solid-query";
import { Accessor, createEffect } from "solid-js";
import { createStore } from "solid-js/store";


export function useMockMutation(actionName: string, actionState: Accessor<'initial' | 'pending' | 'success' | 'error'>) {
  const [state, setState] = createStore({
    isLoading: false,
    isSuccess: false,
    isError: false,
    mutate: action(actionName),

    mutateAsync: (...args: unknown[]) => {
      action(actionName)(...args);
      
      setState(c => ({
        ...c,
        isLoading: true,
        isSuccess: false,
        isError: false,
      }));

      return new Promise(resolve => {
        setTimeout(() => {
          setState('isLoading', false);
          resolve(void 0);
        }, 5000);
      })
    },

    reset: action('reset'),
  });

  createEffect(() => {
    const s = actionState();

    setState(c => ({
      ...c,
      isLoading: s === 'pending',
      isSuccess: s === 'success',
      isError: s === 'error',
    }));
  });

  return state as CreateMutationResult;
}