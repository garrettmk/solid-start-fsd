import { splitProps } from "solid-js";
import { useIndexContext } from "@/shared/ui";
import { Button, ButtonProps } from "./button";

export function ButtonPrev(props: ButtonProps) {
  const index = useIndexContext();
  const [, buttonProps] = splitProps(props, ["onClick"]);

  return <Button onClick={index.prev} {...buttonProps} />;
}
