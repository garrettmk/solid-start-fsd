import { Accessor, createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import { action } from "@storybook/addon-actions";
import { RouteAction } from "solid-start/data/createRouteAction";

/**
 * Provides a simple mock for a RouteAction.
 * 
 * @param actionName 
 * @param actionState 
 * @returns 
 */
export function useMockAction<TInput, TResult>(actionName: string, actionState: Accessor<'initial' | 'pending' | 'error'>) {
  const [state, setState] = createStore({
    result: undefined as unknown,
    error: undefined as Error | undefined,
    pending: false
  });

  createEffect(() => {
    const actionStateValue = actionState();

    if (actionStateValue === 'initial')
      setState({
        result: undefined,
        error: undefined,
        pending: false
      });
    else if (actionStateValue === 'pending')
      setState({
        result: undefined,
        error: undefined,
        pending: true
      });
    else if (actionStateValue)
      setState({
        result: undefined,
        error: new Error('Oh no!'),
        pending: false,
      })
  });

  return [state, action(actionName)] as RouteAction<TInput, TResult>;
}