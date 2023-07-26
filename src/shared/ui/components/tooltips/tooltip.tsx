import clsx from 'clsx';
import { JSX, splitProps } from 'solid-js';

export type TooltipProps = JSX.HTMLAttributes<HTMLDivElement>;

export function Tooltip(props: TooltipProps) {
  const [, elementProps] = splitProps(props, [
    'ref',
    'class',
    'children',
  ]);

  return (
    <div
      ref={props.ref} 
      class={clsx('w-max inline-block rounded-md px-1.5 py-1/2 bg-slate-700 text-slate-100 normal-case font-semibold text-sm', props.class)}
      {...elementProps}
    >
      {props.children}
    </div>
  );
}