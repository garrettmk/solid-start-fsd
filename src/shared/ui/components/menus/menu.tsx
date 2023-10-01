import clsx from "clsx";
import { JSX, splitProps } from "solid-js";
import { onClickOutside } from "@/shared/ui";
import { Panel } from "../panels/panel";
onClickOutside;

export interface MenuProps extends JSX.HTMLAttributes<HTMLUListElement> {
  isOpen?: boolean;
  onClickItem?: () => void;
}

const base = 'drop-shadow-2xl';
const positioning = "fixed z-[5000]";
const coloring =
  "bg-white dark:bg-slate-700 divide-slate-100 dark:divide-slate-600";
const listStyle = "list-none divide-y shadow-xl";
const textStyles =
  "normal-case font-normal text-base text-slate-900 dark:text-slate-300";

export function Menu(props: MenuProps) {
  const [, elementProps] = splitProps(props, [
    "ref",
    "class",
    "children",
    "isOpen",
    "onClickItem",
  ]);

  const handleClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const itemTarget = target.closest("li");
    const inactive = itemTarget?.dataset.inactive === "true";

    if (!inactive) props.onClickItem?.();
  };

  return (
    <Panel
      as="ul"
      ref={props.ref}
      class={clsx(base, positioning, coloring, listStyle, textStyles, props.class)}
      onClick={handleClick}
      {...elementProps}
    >
      {props.children}
    </Panel>
  );
}
