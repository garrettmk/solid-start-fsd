import clsx from "clsx";
import { splitProps } from "solid-js";
import { Spinner } from "../spinners";
import { Overlay, OverlayProps } from "./overlay";

/**
 * Props for `LoadingOverlay`
 */
export type LoadingOverlayProps = Omit<OverlayProps, 'children'>;

/**
 * An `Overlay` with a darkened background and a loading spinner.
 * 
 * @param props 
 * @returns 
 */
export function LoadingOverlay(props: LoadingOverlayProps) {
  const [, overlayProps] = splitProps(props, [
    "ref",
    "class",
  ]);

  return (
    <Overlay
      ref={props.ref}
      class={clsx('bg-slate-900/50 flex items-center justify-center', props.class)}
      {...overlayProps}
    >
      <Spinner size="lg" />
    </Overlay>
  );
}
