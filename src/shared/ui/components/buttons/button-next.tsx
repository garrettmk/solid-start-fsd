import { splitProps } from "solid-js";
import { useIndexContext } from "@/shared/ui";
import { Button, ButtonProps } from "./button";

export function ButtonNext(props: ButtonProps) {
  const index = useIndexContext();
  const [, buttonProps] = splitProps(props, ["onClick"]);
  const onClick = () => {
    index.next();
  };

  return <Button onClick={onClick} {...buttonProps} />;
}
