import { Accessor, createEffect, onCleanup, Signal } from "solid-js";

export function checkedSignal(
  el: HTMLInputElement,
  accessor: Accessor<[Signal<unknown>, unknown]>
) {
  const onChange = () => {
    const [signal, value] = accessor();
    const [, setter] = signal;
    setter(value);
  };

  createEffect(() => {
    const [signal] = accessor();
    const [getter] = signal;
    el.checked = Boolean(getter());
  });

  el.addEventListener("change", onChange);
  onCleanup(() => el.removeEventListener("change", onChange));
}
