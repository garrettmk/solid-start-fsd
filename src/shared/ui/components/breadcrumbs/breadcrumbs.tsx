import { JSX, splitProps } from "solid-js";
import { BreadcrumbItem } from "./breadcrumb-item";
import { BreadcrumbSeparator } from "./breadcrumb-separator";

/**
 * Props for the `Breadcrumbs` component.
 */
export type BreadcrumbsProps = JSX.HTMLAttributes<HTMLDivElement>;

/**
 * A container for breadcrumbs. Renders as a <ol> element inside a 
 * <nav> element.
 */
export const Breadcrumbs = Object.assign(function Breadcrumbs(props: BreadcrumbsProps) {
  const [, elementProps] = splitProps(props, ["children"]);

  return (
    //@ts-expect-error props mismatch with nav element vs. div
    <nav class="flex" aria-label="Breadcrumb" {...elementProps}>
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        {props.children}
      </ol>
    </nav>
  );
}, {
  Item: BreadcrumbItem,
  Separator: BreadcrumbSeparator
});
