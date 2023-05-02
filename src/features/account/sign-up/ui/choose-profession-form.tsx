import { noop } from "@/shared/lib";
import { BigOptionButton, VStack } from "@/shared/ui";
import { createForm, getError, zodForm } from "@modular-forms/solid";
import clsx from "clsx";
import { JSX, splitProps } from "solid-js";
import { ChooseProfessionInput, chooseProfessionInputSchema } from "../schemas";

export interface SelectProfessionFormProps
  extends Omit<JSX.HTMLAttributes<HTMLFormElement>, "onSubmit"> {
  initialValues?: Partial<ChooseProfessionInput>;
  onSubmit?: (data: ChooseProfessionInput) => void;
}

export function ChooseProfessionForm(props: SelectProfessionFormProps) {
  const [, formProps] = splitProps(props, [
    "initialValues",
    "onSubmit",
    "children",
  ]);
  const { initialValues } = props;
  const [form, { Form, Field }] = createForm<ChooseProfessionInput>({
    initialValues,
    validate: zodForm(chooseProfessionInputSchema),
  });

  return (
    <Form onSubmit={props.onSubmit ?? noop} {...formProps}>
      <h2 class="text-2xl font-bold mb-6">Tell us about yourself</h2>
      <VStack as="fieldset" spacing="sm" align="stretch" class="mb-8">
        <legend class="text-lg text-slate-400 mb-6">
          What is your profession?
        </legend>
        <Field name="profession">
          {(field, props) => (
            <BigOptionButton
              {...props}
              checked={field.value === "human"}
              value="human"
              label={"I'm a human"}
              description="Completely, totally human"
              aria-errormessage="profession-error"
              required
            />
          )}
        </Field>
        <Field name="profession">
          {(field, props) => (
            <BigOptionButton
              {...props}
              checked={field.value === "robot"}
              value="robot"
              label="I'm a robot"
              description="Better in every way"
              aria-errormessage="profession-error"
              required
            />
          )}
        </Field>
        <p
          id="profession-error"
          class={clsx("text-xs text-red-600 dark:text-red-400", {
            "absolute opacity-0": !getError(form, "profession"),
          })}
        >
          {getError(form, "profession")}
        </p>
      </VStack>
      {props.children}
    </Form>
  );
}
