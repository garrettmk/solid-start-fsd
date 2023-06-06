import { HStack, HStackProps } from "@/shared/ui";
import clsx from "clsx";
import { splitProps } from "solid-js";

export interface PageHeaderProps extends HStackProps {
  title?: string;
}

export function PageHeader(props: PageHeaderProps) {
  const [headerProps, stackProps] = splitProps(props, [
    "class",
    "title",
    "children",
  ]);

  return (
    <HStack
      as='header'
      justify="between"
      align="center"
      class={clsx(
        "sticky top-0 px-5 py-3 h-16 bg-white dark:bg-slate-900 dark:text-white border-b border-gray-200 dark:border-slate-700",
        props.class
      )}
      {...stackProps}
    >
      {headerProps.children}
    </HStack>
  );
}
