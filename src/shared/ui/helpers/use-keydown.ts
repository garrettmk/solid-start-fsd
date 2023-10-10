import { createEffect, onCleanup } from "solid-js";

/**
 * Convenience hook for adding a keydown event listener.
 * 
 * @param key 
 * @param callback 
 */
export function useKeydown(key: string, callback: () => void) {
  createEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === key) {
        callback();
      }
    }
    
    document.addEventListener("keydown", handler);

    onCleanup(() => {
      document.removeEventListener("keydown", handler);
    });
  });
}