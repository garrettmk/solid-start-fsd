import { clamp } from "@/shared/lib";
import clsx from "clsx";
import { JSX, splitProps } from "solid-js";

const styles = {
  base: "w-full rounded-full",

  background: {
    none: "",
    default: "bg-slate-200 dark:bg-slate-700",
  },

  size: {
    xs: "h-1",
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
    xl: "h-6",
  },
};

export interface ProgressProps extends JSX.HTMLAttributes<HTMLDivElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  value?: number;
  background?: "none" | "default";
  reverse?: boolean;
  duration?: number;
  easing?: string;
}

export function Progress(props: ProgressProps) {
  const [, divProps] = splitProps(props, [
    "size",
    "class",
    "value",
    "background",
    "reverse",
  ]);

  const value = () => clamp(props.value ?? 0, { min: 0, max: 100 });

  const style = () => `
    width: ${value()}%; 
    transition-duration: ${props.duration ?? 4000}ms;
    transition-timing-function: ${props.easing ?? 'ease-in-out'};
  `.trim();

  return (
    <div
      role="progressbar"
      aria-valuenow={value()}
      class={clsx(
        styles.base,
        styles.size[props.size ?? "md"],
        styles.background[props.background ?? "default"],
        props.class
      )}
      {...divProps}
    >
      <div
        class={clsx(
          `bg-blue-600 rounded-full transition-[width]`,
          props.easing ?? 'ease-in-out',
          props.reverse && "ml-auto",
          styles.size[props.size ?? "md"]
        )}
        style={style()}
      ></div>
    </div>
  );
}
