import { noop } from "@/shared/lib";
import { Button, Checkbox, TextInput } from "@/shared/ui";
import { createForm, zodForm } from "@modular-forms/solid";
import { JSX, splitProps } from "solid-js";
import { passwordCredentialsSchema } from "../schemas";

export type SignInFormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export interface SignInFormProps
  extends Omit<JSX.HTMLAttributes<HTMLFormElement>, "onSubmit"> {
  initialValues?: Partial<SignInFormData>;
  onSubmit?: (data: SignInFormData) => void;
}

export function SignInWithPasswordForm(props: SignInFormProps) {
  const { initialValues } = props;

  const [, formProps] = splitProps(props, [
    "initialValues",
    "onSubmit",
    "children",
  ]);

  const [form, { Form, Field }] = createForm<SignInFormData>({
    initialValues,
    validate: zodForm(passwordCredentialsSchema),
  });

  return (
    <Form class="space-y-6" onSubmit={props.onSubmit ?? noop} {...formProps}>
      <Field name="email">
        {(field, props) => (
          <TextInput
            {...props}
            label="Your email"
            placeholder="name@company.com"
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
            label="Your password"
            placeholder="••••••••"
            type="password"
            value={field.value}
            error={field.error}
            required
          />
        )}
      </Field>
      <div class="flex justify-between">
        <Field name="rememberMe" type="boolean">
          {(field, props) => (
            <Checkbox {...props} checked={field.value}>
              Remember me
            </Checkbox>
          )}
        </Field>

        <a
          href="#"
          class="text-sm text-blue-700 hover:underline dark:text-blue-500"
        >
          Lost Password?
        </a>
      </div>
      <Button type="submit" size="lg" class="text-sm font-medium w-full">
        Login to your account
      </Button>
      <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
        Not registered?{" "}
        <a
          href="/sign-up"
          class="text-blue-700 hover:underline dark:text-blue-500"
        >
          Create account
        </a>
      </div>
    </Form>
  );
}
