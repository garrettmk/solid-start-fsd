import clsx from "clsx";
import { JSX, splitProps } from "solid-js";

/**
 * Props for `Overlay`
 */
export interface OverlayProps extends JSX.HTMLAttributes<HTMLDivElement> {
  position?: 'fixed' | 'absolute'
  isOpen?: boolean
}

/**
 * A component that covers its parent (or the screen).
 * 
 * @param props 
 * @returns 
 */
export function Overlay(props: OverlayProps) {
  const [, divProps] = splitProps(props, [
    'ref',
    'class',
    'position',
    'isOpen',
  ]);

  return (
    <div
      ref={props.ref}
      class={clsx(
        'inset-0 overflow-x-hidden overflow-y-auto opacity-0 transition-opacity duration-200 pointer-events-none',
        props.position ?? 'fixed',
        props.isOpen && 'opacity-100 pointer-events-auto',
        props.class,
      )}
      {...divProps}
    />
  );
}