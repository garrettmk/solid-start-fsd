import clsx from "clsx";
import { JSX } from "solid-js";

/**
 * Props for the `ModuleContainer` component.
 */
export type ModuleContainerProps = JSX.HTMLAttributes<HTMLDivElement>;

/**
 * A flex container for a module.
 * 
 * @param props 
 * @returns 
 */
export function ModuleContainer(props: ModuleContainerProps) {
  return (
    <div {...props} class={clsx('relative grow flex', props.class)}/>
  );
}