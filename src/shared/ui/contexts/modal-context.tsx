import { Component, JSX, batch, createContext, createSignal, mergeProps, useContext } from "solid-js";
import { Dynamic } from "solid-js/web";
import { BlurOverlay } from "../components";
import { SizeProp, createToggle, useKeydown } from "../helpers";

/**
 * Props for `ModalComponent`
 */
export type ModalOptions = {
  isOpen?: boolean;
  onClose?: () => void;
  dismissable?: boolean;
  size?: SizeProp
};

/**
 * A component that can be rendered in a `Modal`.
 */
export type ModalComponent<P extends ModalOptions = ModalOptions> = Component<P>;

/**
 * A context for managing an app-level `Modal`.
 */
export type ModalContextValue = {
  open: <P extends ModalOptions>(component: ModalComponent<P>, props?: P) => void;
  close: () => void;
};

export const ModalContext = createContext<ModalContextValue>();


/**
 * A convenience function for using the `ModalContext`.
 * 
 * @returns 
 */
export function useModalContext() {
  const value = useContext(ModalContext);

  if (!value)
    throw new Error('No Modal context');

  return value;
}

/**
 * A convenience function for creating a `Modal`.
 * 
 * @param component 
 * @param props 
 * @returns 
 */
export function useModal<P extends ModalOptions>(component: ModalComponent<P>, props?: P) {
  const modal = useModalContext();
  const open = () => modal.open(component, props);
  const close = () => modal.close();

  return { open, close };
}

/**
 * Props for `ModalProvider`
 */
export type ModalProviderProps = {
  children: JSX.Element;
}

/**
 * An app-level `ModalContext` provider. Renders the `Modal` and `BlurOverlay` components on top
 * of its children.
 * 
 * @param props 
 * @returns 
 */
export function ModalProvider(props: ModalProviderProps) {
  const [component, setComponent] = createSignal<ModalComponent<any> | undefined>(undefined);
  const [componentProps, setComponentProps] = createSignal<ModalOptions | undefined>(undefined);
  const toggle = createToggle();
  const defaultProps = {
    get isOpen() { return toggle.value },
    get onClose() { return toggle.off },
    dismissable: true,
  }

  const close = () => {
    toggle.off();
  };

  const open = <P extends ModalOptions>(component: ModalComponent<P>, props?: Omit<P, 'isOpen' | 'onClose'>) => {
    batch(() => {
      setComponent(() => component);
      setComponentProps(() => mergeProps(defaultProps, props));
    });
    setTimeout(() => toggle.on(), 0);
  };

  useKeydown('Escape', () => {
    if (toggle.value && componentProps()?.dismissable !== false)
      close();
  });

  const contextValue: ModalContextValue = {
    open,
    close,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {props.children}
      <BlurOverlay
        isOpen={toggle.value}
        onClick={componentProps()?.dismissable !== false ? toggle.off : undefined}
      />
      <Dynamic
        component={component()}
        {...componentProps()}
      />
    </ModalContext.Provider>
  );
}