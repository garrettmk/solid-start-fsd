import clsx from "clsx";
import { JSX, mergeProps, splitProps } from "solid-js";
import { SizeProp } from "../../helpers";

/**
 * Props for `Drawer`
 */
export interface DrawerProps extends JSX.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
  placement?: "left" | "right" | "top" | "bottom";
  size?: SizeProp;
}

// Styles for `Drawer`
const styles = {
  base: "fixed z-40 transition-transform bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-slate-100",

  placement: {
    left: "top-0 left-0 h-screen overflow-y-auto border-r ",
    right: "top-0 right-0 h-screen overflow-y-auto border-l",
    top: "top-0 left-0 w-screen overlow-x-auto border-b",
    bottom: "bottom-0 left-0 w-screen overflow-x-auto border-t",
  },

  size: {
    left: {
      none: '',
      xs: 'w-8',
      sm: 'w-16',
      md: 'w-64',
      lg: 'w-80',
      xl: 'w-96',
      '2xl': 'w-[576px]',
      '3xl': 'w-[768px]',
      '4xl': 'w-[1024px]',
    },

    right: {
      none: '',
      xs: 'w-8',
      sm: 'w-16',
      md: 'w-64',
      lg: 'w-80',
      xl: 'w-96',
      '2xl': 'w-[576px]',
      '3xl': 'w-[768px]',
      '4xl': 'w-[1024px]',
    },

    top: {
      none: '',
      xs: 'h-8',
      sm: 'h-16',
      md: 'h-64',
      lg: 'h-80',
      xl: 'h-96',
      '2xl': 'h-[576px]',
      '3xl': 'h-[768px]',
      '4xl': 'h-[1024px]',
    },

    bottom: {
      none: '',
      xs: 'h-8',
      sm: 'h-16',
      md: 'h-64',
      lg: 'h-80',
      xl: 'h-96',
      '2xl': 'h-[576px]',
      '3xl': 'h-[768px]',
      '4xl': 'h-[1024px]',
    },
  },

  closed: {
    left: "-translate-x-full",
    right: "translate-x-full",
    top: "-translate-y-full",
    bottom: "translate-y-full",
  },
};

const defaultProps = {
  isOpen: false,
  placement: 'left',
  size: 'md'
} as const;

/**
 * A drawer component that slides in from the left, right, top, or bottom of the screen.
 * 
 * @param props 
 * @returns 
 */
export function Drawer(props: DrawerProps) {
  const propsWithDefaults = mergeProps(defaultProps, props);
  const [, elementProps] = splitProps(propsWithDefaults, [
    "ref",
    "class",
    "isOpen",
    'placement',
    'size',
    "children",
  ]);

  return (
      <div
        id="drawer-left-example"
        ref={props.ref}
        class={clsx(
          styles.base,
          styles.placement[propsWithDefaults.placement],
          styles.size[propsWithDefaults.placement][propsWithDefaults.size],
          !props.isOpen && styles.closed[propsWithDefaults.placement],
          props.class
        )}
        tabindex="-1"
        {...elementProps}
      >
        {props.children}
      </div>
  );
}
