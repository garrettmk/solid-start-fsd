import { createEffect } from "solid-js";
import { AnyStateMachine, StateFrom } from "xstate";
import { createIndex, Index } from "@/shared/ui/contexts";

export function useStateIndex(state: StateFrom<AnyStateMachine>, order: string[]): Index {
  const index = createIndex();
  createEffect(() => {
    index.set(order.findIndex((value) => state.matches(value)));
  });

  return index;
}
