import clsx from "clsx";
import { JSX } from "solid-js";
import { ModuleSidebar } from "./module-sidebar";

/**
 * Props for the `Module` component.
 */
export type ModuleProps = JSX.HTMLAttributes<HTMLDivElement>;

/**
 * A flex container for a module.
 * 
 * @param props 
 * @returns 
 */
export const Module = Object.assign(function (props: ModuleProps) {
  return (
    <div {...props} class={clsx('relative grow flex', props.class)}/>
  );
}, {
  Sidebar: ModuleSidebar
});