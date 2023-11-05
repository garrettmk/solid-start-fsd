import clsx from "clsx";
import { Show, splitProps } from "solid-js";
import { SizeProp, adjustSize, textSizeClass } from "../../helpers";
import { Spinner } from "../spinners";
import { VStack, VStackProps } from "../stacks";

export interface KPIProps extends VStackProps {
  label: string;
  value: number;
  size?: Extract<SizeProp, 'sm' | 'md' | 'lg' | 'xl'>
  loading?: boolean;
}

export function KPI(props: KPIProps) {
  const [, panelProps] = splitProps(props, [
    "class",
    "label",
    "value",
    "size",
  ]);

  return (
    <VStack
      align="center"
      spacing={props.size ?? 'md'}
      class={clsx(
        props.class
      )}
      {...panelProps}
    >
      <Show when={!props.loading} fallback={<Spinner size={adjustSize(props.size ?? 'md', { adjust: -1 })}/>}>
        <span class={clsx(
          "font-medium text-slate-900 dark:text-slate-300 leading-none",
          textSizeClass(props.size ?? 'md', { adjust: +2 })
        )}>
          {props.value?.toLocaleString()}
        </span>
      </Show>
      <span class={clsx(
        "font-medium text-slate-500 dark:text-slate-400",
        textSizeClass(props.size ?? 'md', { adjust: -1 })
      )}>
        {props.label}
      </span>
    </VStack>
  );
}