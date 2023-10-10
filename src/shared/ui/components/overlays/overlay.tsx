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
        props.position === 'absolute' ? 'absolute' : 'fixed',
        'inset-0 overflow-x-hidden overflow-y-auto',
        !props.isOpen && 'hidden',
        props.class,
      )}
      {...divProps}
    />
  );
}