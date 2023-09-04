import { createStore } from "solid-js/store";

/**
 * Options for `createTimer`
 */
export type TimerOptions = {
  duration: number;
  callback?: () => void;
  start?: boolean;
}

/**
 * A SolidJS store that represents a timer
 */
export type Timer = {
  id: NodeJS.Timeout | undefined;
  hasTimedOut: boolean;
  start: () => void;
  cancel: () => void;
}

/**
 * A helper for managing a timer.
 * 
 * @param options 
 * @returns 
 */
export function createTimer(options: TimerOptions): Timer {
  const [timer, setState] = createStore<Timer>({
    id: undefined,
    hasTimedOut: false,

    start: () => {
      const id = setTimeout(() => {
        setState("hasTimedOut", true);
        options.callback?.();
      }, options.duration);

      setState("id", id);
    },

    cancel: () => {
      if (timer.id) {
        clearTimeout(timer.id);
      }
    }
  });

  if (options.start)
    timer.start();

  return timer;
}