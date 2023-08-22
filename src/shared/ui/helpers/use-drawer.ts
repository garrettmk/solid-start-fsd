import { createStore } from "solid-js/store";
import { useOnClickOutside } from "./use-click-outside.helper";


export type UseDrawerResult = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;

  buttonEl: HTMLElement | undefined;
  drawerEl: HTMLElement | undefined;

  drawerProps: {
    ref: (el: HTMLElement) => void;
    isOpen: boolean;
  }

  buttonProps: {
    ref: (el: HTMLElement) => void;
    onClick: () => void;
  }
}

export type UseDrawerOptions = {
  initialIsOpen?: boolean;
  onClose?: () => void;
}

export function useDrawer(options: UseDrawerOptions = {}): UseDrawerResult {
  const [state, setState] = createStore<UseDrawerResult>({
    isOpen: options.initialIsOpen ?? false,
    open: () => { 
      setState("isOpen", true); 
      setState("drawerProps", c => ({ ...c, isOpen: true }));
    },
    close: () => {
      setState("isOpen", false);
      setState("drawerProps", c => ({ ...c, isOpen: false }));
    },
    toggle: () => {
      setState("isOpen", c => !c);
      setState("drawerProps", c => ({ ...c, isOpen: !c.isOpen }));
    },

    buttonEl: undefined,
    buttonProps: {
      ref: (el: HTMLElement | undefined) => { setState("buttonEl", el); },
      onClick: () => {
        setState("isOpen", true);
        setState("drawerProps", c => ({ ...c, isOpen: true }));
      }
    },

    drawerEl: undefined,
    drawerProps: {
      ref: (el: HTMLElement | undefined) => { setState("drawerEl", el); },
      isOpen: false
    }

  });

  useOnClickOutside(
    () => state.drawerEl, 
    () => state.buttonEl, 
    () => {
      if (options.onClose) {
        options.onClose();
      } else {
        setState("isOpen", () => false);
        setState("drawerProps", (c) => ({ ...c, isOpen: false }))
      }
    }
  );

  return state;
}