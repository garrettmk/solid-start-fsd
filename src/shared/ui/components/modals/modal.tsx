import clsx from "clsx";
import { mergeProps, splitProps } from "solid-js";
import { ModalOptions } from "../../contexts";
import { Panel, PanelProps } from "../panels";

/**
 * Props for `Modal`
 */
export type ModalProps = ModalOptions & PanelProps;


const styles = {
  base: "fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-2xl transition-opacity duration-200 opacity-0",

  open: "opacity-100",

  size: {
    none: '',
    xs: 'w-40',
    sm: 'w-56',
    md: 'w-96',
    lg: 'w-1/2',
    xl: 'w-2/3',
    '2xl': 'w-3/4',
    '3xl': 'w-4/5',
    '4xl': 'w-5/6',
  }
};

const defaultProps = {
  size: 'md',
} as const;


/**
 * An empty `Panel`, with styling and transitions for use as a modal.
 * 
 * @param props 
 * @returns 
 */
export function Modal(props: ModalProps) {
  const propsWithDefaults = mergeProps(defaultProps, props);
  const [, panelProps] = splitProps(propsWithDefaults, [
    'class', 
    'isOpen',
    'onClose',
    'dismissable',
    'size'
  ]);

  return (
    <Panel
      class={clsx(
        styles.base,
        propsWithDefaults.isOpen && styles.open,
        styles.size[propsWithDefaults.size],
        propsWithDefaults.class,
      )}
      {...panelProps}
    />
  );
}