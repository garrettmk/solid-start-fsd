import clsx from "clsx";
import { JSX, splitProps } from "solid-js";
import { Spinner } from "../spinners";

export interface LoadingOverlayProps extends JSX.HTMLAttributes<HTMLDivElement> {
  position?: "fixed" | "absolute";
}

export function LoadingOverlay(props: LoadingOverlayProps) {
  const [, divProps] = splitProps(props, [
    "ref",
    "class",
    "position",
  ]);

  return (
    <div
      ref={props.ref}
      class={clsx(
        props.position === "absolute" ? "absolute" : "fixed",
        "inset-0 overflow-x-hidden overflow-y-auto bg-slate-900/50 flex items-center justify-center",
        props.class
      )}
      {...divProps}
    >
      <Spinner size="lg" />
    </div>
  );
}
