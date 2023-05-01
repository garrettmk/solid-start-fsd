import clsx from "clsx";
import { JSX, splitProps } from "solid-js";
import { formatDate, formatTime } from "@/shared/lib";

export interface DateAndTimeCellProps
  extends JSX.HTMLAttributes<HTMLDivElement> {
  value?: Date | string | number;
}

export function DateAndTimeCell(props: DateAndTimeCellProps) {
  const [, divProps] = splitProps(props, ["value", "class"]);

  return (
    <div
      class={clsx("inline-flex flex-col items-center", props.class)}
      {...divProps}
    >
      <span class="block font-medium text-slate-700 dark:text-slate-300">
        {formatDate(props.value)}
      </span>
      <span class="block text-sm">{formatTime(props.value)}</span>
    </div>
  );
}
