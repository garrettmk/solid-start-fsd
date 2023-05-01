import { Accessor } from "solid-js";
import { useOnClickOutside } from "./use-click-outside.helper";

export function onClickOutside(
  el: HTMLElement,
  accessor: Accessor<(event: MouseEvent) => void>
) {
  useOnClickOutside(() => el, accessor());
}
