import clsx from "clsx";
import { JSX, splitProps } from "solid-js";
import { PageBreadcrumbs } from "./page-breadcrumbs";
import { PageContent } from "./page-content";
import { PageDivider } from "./page-divider";
import { PageHeader } from "./page-header";
import { Title } from "solid-start";
import { RouteProvider } from "@/shared/ui";

/**
 * Props for the `PageContainer` component.
 */
export interface PageProps extends JSX.HTMLAttributes<HTMLDivElement> {
  path?: string
  title?: string
};

/**
 * The top-level element for a page.
 * 
 * @param props 
 * @returns 
 */
export const Page = Object.assign(function Page(props: PageProps) {
  const [, breadcrumbProps, divProps] = splitProps(props, ['class'], [
    "title",
    "path",
  ]);

  return (
    <RouteProvider path={props.path} title={props.title}>
      <Title>{props.title}</Title>
      <div 
        class={clsx('relative grow', props.class)} 
        {...divProps}
      />
    </RouteProvider>
  );
}, {
  Header: PageHeader,
  Breadcrumbs: PageBreadcrumbs,
  Content: PageContent,
  Divider: PageDivider
});