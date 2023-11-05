import { JSX, splitProps } from "solid-js";
import clsx from "clsx";
import { Dynamic } from "solid-js/web";
import { SizeProp } from "../../helpers";

export interface VStackProps<E extends HTMLElement = HTMLDivElement>
  extends JSX.HTMLAttributes<E> {
  spacing?: SizeProp
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
  as?: keyof JSX.HTMLElementTags;
}

const styles = {
  base: "flex flex-col",

  spacing: {
    none: "",
    xs: "space-y-1",
    sm: "space-y-1.5",
    md: "space-y-2",
    lg: "space-y-2.5",
    xl: "space-y-3",
    "2xl": "space-y-4",
    '3xl': 'space-y-5',
    '4xl': 'space-y-6',
  },

  align: {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  },

  justify: {
    start: "justify-start",
    end: "justify-end",
    center: "justify-center",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
  },
};

export function VStack<E extends HTMLElement = HTMLDivElement>(
  props: VStackProps<E>
) {
  const [stackProps, elementProps] = splitProps(props, [
    "as",
    "class",
    "spacing",
    "align",
    "justify",
  ]);

  return (
    //@ts-expect-error idk
    <Dynamic
      component={stackProps.as ?? "div"}
      class={clsx(
        styles.base,
        styles.spacing[stackProps.spacing ?? "none"],
        styles.align[stackProps.align ?? "stretch"],
        styles.justify[stackProps.justify ?? "start"],
        stackProps.class
      )}
      {...elementProps}
    />
  );
}
