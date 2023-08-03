import {
  NewAccountInput,
  newAccountInputSchema,
} from "@/features/users/sign-up";
import { noop } from "@/shared/lib";
import { Checkbox, TextInput } from "@/shared/ui";
import { ValidateForm, createForm, zodForm } from "@modular-forms/solid";
import { JSX, splitProps } from "solid-js";

// For the moment, module-forms doesn't catch the superRefine error in the
// zod schema.
const zodFormValidator = zodForm(newAccountInputSchema);
const formValidator: ValidateForm<NewAccountInput> = async (values) => {
  const { password, confirmPassword } = values;
  const errors = await zodFormValidator(values);

  if (!errors.password && confirmPassword !== password)
    errors.confirmPassword = "Must match your password";

  return errors;
};

/**
 * Props for NewAccountInfoForm
 */
export interface NewAccountInfoFormProps
  extends Omit<JSX.HTMLAttributes<HTMLFormElement>, "onSubmit"> {
  initialValues?: Partial<NewAccountInput>;
  onSubmit?: (data: NewAccountInput) => void;
}

/**
 * A form for gathering new account information
 * 
 * @param props 
 * @returns 
 */
export function NewAccountInfoForm(props: NewAccountInfoFormProps) {
  const { initialValues } = props;
  const [, formProps] = splitProps(props, [
    "initialValues",
    "onSubmit",
    "children",
  ]);

  const [, { Form, Field }] = createForm<NewAccountInput>({
    initialValues,
    validate: formValidator,
  });

  return (
    <Form onSubmit={props.onSubmit ?? noop} {...formProps}>
      <h2 class="text-2xl font-bold mb-6 dark:text-slate-300">Account Information</h2>
      <div class="grid gap-x-6 gap-y-4 sm:grid-cols-1 md:grid-cols-2 mb-6">
        <Field name="fullName">
          {(field, props) => (
            <TextInput
              {...props}
              label="Full Name"
              value={field.value}
              error={field.error}
              required
            />
          )}
        </Field>

        <Field name="email">
          {(field, props) => (
            <TextInput
              {...props}
              label="Email"
              value={field.value}
              error={field.error}
              required
            />
          )}
        </Field>

        <Field name="password">
          {(field, props) => (
            <TextInput
              {...props}
              label="Password"
              type="password"
              value={field.value}
              error={field.error}
              required
            />
          )}
        </Field>

        <Field name="confirmPassword">
          {(field, props) => (
            <TextInput
              {...props}
              label="Confirm Password"
              type="password"
              value={field.value}
              error={field.error}
              required
            />
          )}
        </Field>
      </div>
      <Field name="agreesToTerms" type="boolean">
        {(field, props) => (
          <Checkbox {...props} checked={field.value} error={field.error} class="mb-4" required>
            I have read and agree to the{" "}
            <a class="text-blue-600 dark:text-blue-500 underline" href="#">
              Terms and Conditions
            </a>
          </Checkbox>
        )}
      </Field>

      <Field name="wantsMarketing" type="boolean">
        {(field, props) => (
          <Checkbox {...props} checked={field.value} error={field.error} class="mb-8">
            Send me marketing email
          </Checkbox>
        )}
      </Field>

      {props.children}
    </Form>
  );
}
