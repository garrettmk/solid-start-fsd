import clsx from "clsx";
import { JSX } from "solid-js";

/**
 * Props for the `PageContainer` component.
 */
export type PageContainerProps = JSX.HTMLAttributes<HTMLDivElement>;

/**
 * The top-level element for a page.
 * 
 * @param props 
 * @returns 
 */
export function PageContainer(props: PageContainerProps) {
  return (
    <div {...props} class={clsx('relative grow', props.class)}/>
  );
}