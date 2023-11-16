import clsx from "clsx";
import { JSX, splitProps } from "solid-js";
import { AppSidebar } from "./app-sidebar";

export interface AppProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export const App = Object.assign(function App(props: AppProps) {
  const [, divProps] = splitProps(props, ["class"]);

  return (
    <div class={clsx('relative h-screen flex items-stretch', props.class)} {...divProps}/>
  );
}, {
  Sidebar: AppSidebar,
});