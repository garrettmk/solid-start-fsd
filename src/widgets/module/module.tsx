import clsx from "clsx";
import { JSX } from "solid-js";
import { Title } from "solid-start";
import { ModuleSidebar } from "./module-sidebar";
import { RouteProvider } from "@/shared/ui";

/**
 * Props for the `Module` component.
 */
export interface ModuleProps extends JSX.HTMLAttributes<HTMLDivElement> {
  path?: string
  title?: string
};

/**
 * A flex container for a module.
 * 
 * @param props 
 * @returns 
 */
export const Module = Object.assign(function (props: ModuleProps) {
  
  return (
    <RouteProvider path={props.path} title={props.title}>
      <Title>{props.title}</Title>
      <div {...props} class={clsx('relative grow flex', props.class)}/>
    </RouteProvider>
  );
}, {
  Sidebar: ModuleSidebar
});