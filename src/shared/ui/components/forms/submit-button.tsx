import { Show, splitProps } from "solid-js";
import { Button, ButtonProps } from "../buttons";
import { Spinner } from "../spinners";

export type SubmitButtonProps = Omit<ButtonProps, 'type'> & {
  busy?: boolean;
  busyText?: string;
};


export function SubmitButton(props: SubmitButtonProps) {
  const [, buttonProps] = splitProps(props, [
    'busy',
    'busyText',
    'children'
  ]);

  return (
    <Button type="submit" color="blue" {...buttonProps}>
      <Show when={props.busy}>
        <Spinner class="mr-4" size="sm"/>
        {props.busyText ?? 'Submitting'}
      </Show>
      <Show when={!props.busy}>
        {props.children ?? 'Submit'}
      </Show>
    </Button>
  );
}