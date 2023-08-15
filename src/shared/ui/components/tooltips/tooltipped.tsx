import { Tooltip } from "./tooltip";
import { JSX, children, createEffect, splitProps } from "solid-js";
import { createTooltip } from "./create-tooltip";
import { FloatingUIOptions } from "../../helpers";

export type TooltippedProps = FloatingUIOptions & {
  children: JSX.Element;
  text: string;
}

export function Tooltipped(props: TooltippedProps) {
  const [, options] = splitProps(props, ['children', 'text']);
  const resolved = children(() => props.children);
  const tooltip = createTooltip(options);

  createEffect(() => {
    const child = resolved.toArray()[0];
    if (typeof child === 'object' && child !== null)
      tooltip.anchorRef(child as HTMLElement);
  });

  return (
    <>
      {resolved()}
      <Tooltip ref={tooltip.floatingRef}>
        {props.text}
      </Tooltip>
    </>
  );
}