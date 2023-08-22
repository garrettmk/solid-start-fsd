import { splitProps } from "solid-js";
import { Button, ButtonProps } from "../buttons";

export type CancelButtonProps = Omit<ButtonProps, 'type'>;

export function CancelButton(props: CancelButtonProps) {
  const [, buttonProps] = splitProps(props, [
    'children'
  ]);

  return (
    <Button type="reset" color="ghost" {...buttonProps}>
      {props.children ?? 'Cancel'}
    </Button>
  );
}