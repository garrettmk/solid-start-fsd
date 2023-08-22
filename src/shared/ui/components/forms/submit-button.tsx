import { splitProps } from "solid-js";
import { Button, ButtonProps } from "../buttons";

export type SubmitButtonProps = Omit<ButtonProps, 'type'>;


export function SubmitButton(props: SubmitButtonProps) {
  const [, buttonProps] = splitProps(props, [
    'children'
  ]);

  return (
    <Button type="submit" color="blue" {...buttonProps}>
      {props.children ?? 'Submit'}
    </Button>
  );
}