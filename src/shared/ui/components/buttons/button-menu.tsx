import { OffsetOptions, Placement } from "@floating-ui/dom";
import clsx from "clsx";
import { JSX, splitProps } from "solid-js";
import {
  createFloatingUI,
  useOnClickOutside,
  EllipsisVerticalIcon,
  Menu,
  Button,
  ButtonProps,
} from "@/shared/ui";

export interface ButtonMenuProps extends Omit<ButtonProps, "onClick"> {
  placement?: Placement;
  offset?: OffsetOptions;
  content?: JSX.Element;
  container?: JSX.HTMLAttributes<HTMLDivElement>;
}

export function ButtonMenu(props: ButtonMenuProps) {
  const [, buttonProps] = splitProps(props, [
    "placement",
    "offset",
    "content",
    "container",
  ]);

  const menu = createFloatingUI({
    placement: props.placement ?? "right-end",
    offset: props.offset ?? { mainAxis: 8 },
  });

  useOnClickOutside(menu.anchorEl, menu.floatingEl, menu.close);

  return (
    <div {...props.container}>
      <Button
        icon={props.icon !== undefined ? props.icon : !props.content}
        ref={menu.anchorRef}
        onClick={menu.toggle}
        aria-expanded="false"
        data-dropdown-toggle="user-dropdown"
        data-dropdown-placement="right-end"
        {...buttonProps}
      >
        {props.content ?? <EllipsisVerticalIcon size={props.size} />}
      </Button>
      <Menu
        ref={menu.floatingRef}
        class={clsx("fixed", !menu.isOpen && "hidden")}
        onClickItem={menu.close}
      >
        {props.children}
      </Menu>
    </div>
  );
}
