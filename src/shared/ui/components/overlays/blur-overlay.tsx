import clsx from "clsx";
import { splitProps } from "solid-js";
import { Overlay, OverlayProps } from "./overlay";

/**
 * Props for `BlurOverlay`
 */
export type BlurOverlayProps = OverlayProps;

/**
 * An `Overlay` with a blurred, darkened background.
 * 
 * @param props 
 * @returns 
 */
export function BlurOverlay(props: BlurOverlayProps) {
  const [, overlayProps] = splitProps(props, [
    'ref',
    'class'
  ]);

  return (
    <Overlay
      ref={props.ref}
      class={clsx('backdrop-blur-sm bg-slate-900/50', props.class)}
      {...overlayProps}
    />
  );
}
