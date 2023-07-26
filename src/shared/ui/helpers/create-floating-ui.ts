import { computePosition, offset, OffsetOptions, Placement, Strategy } from "@floating-ui/core";
import { platform } from "@floating-ui/dom";
import { Accessor, createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

/**
 * Options for creating a floating UI.
 */
export type FloatingUIOptions = {
  placement?: Placement;
  offset?: OffsetOptions;
  strategy?: Strategy;
};

/**
 * A SolidJS store for managing a floating UI.
 */
export type FloatingUI = {
  isOpen: boolean;
  anchorRef: (el: HTMLElement) => void;
  anchorEl: Accessor<HTMLElement | undefined>;
  floatingRef: (el: HTMLElement) => void;
  floatingEl: Accessor<HTMLElement | undefined>;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

/**
 * Creates and returns `FloatingUI` store.
 * 
 * @param options 
 * @returns 
 */
export function createFloatingUI(options: FloatingUIOptions = {}): FloatingUI {
  // Refs for the anchor and the float
  const [anchorEl, anchorRef] = createSignal<HTMLElement>();
  const [floatingEl, floatingRef] = createSignal<HTMLElement>();

  // Create the store
  const [floatingUi, setState] = createStore<FloatingUI>({
    isOpen: false,
    anchorRef,
    anchorEl,
    floatingRef,
    floatingEl,

    open: () => {
      setState("isOpen", true);
    },
    close: () => {
      setState("isOpen", false);
    },
    toggle: () => {
      setState("isOpen", (c) => !c);
    },
  });

  // Add the strategy class to the floating element
  createEffect(() => {
    const floating = floatingEl();

    floating?.classList.add(options.strategy ?? 'absolute');

    return () => {
      floating?.classList.remove(options.strategy ?? 'absolute');
    };
  }); 

  // Add or remove the hidden class from the floating element
  createEffect(() => {
    const floating = floatingEl();

    if (floating && floatingUi.isOpen)
      floating.classList.remove('hidden');
    else if (floating)
      floating.classList.add('hidden');
  });

  // Compute the position of the floating element and assign
  // it to the floating element's style
  createEffect(() => {
    const anchor = anchorEl();
    const floating = floatingEl();

    if (anchor && floating && floatingUi.isOpen) {
      computePosition(anchorEl(), floatingEl(), {
        platform,
        placement: options.placement,
        middleware: [offset(options.offset)],
      }).then(({ x, y }) => {
        Object.assign(floating.style, {
          left: `${x}px`,
          top: `${y}px`,
        });
      });
    }
  });

  return floatingUi;
}
