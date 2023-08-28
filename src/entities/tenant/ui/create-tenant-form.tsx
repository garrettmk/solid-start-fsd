import { noop } from "@/shared/lib";
import { TextInput, useCreateForm, UseCreateFormOptions, UseCreateFormResult } from "@/shared/ui";
import { JSX, splitProps } from "solid-js";
import { CreateTenantInput, createTenantInputSchema } from "../schemas";
import { zodForm } from "@modular-forms/solid";
import clsx from "clsx";

export interface CreateTenantFormProps extends Omit<JSX.HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  form: UseCreateFormResult<CreateTenantInput>;
  onSubmit?: (data: CreateTenantInput) => void;
  disabled?: boolean;
}

export function CreateTenantForm(props: CreateTenantFormProps) {
  const [, formProps] = splitProps(props, [
    'form',
    'onSubmit',
    'disabled',
    'children',
  ]);

  const Form = props.form.Form;
  const Field = props.form.Field;

  return (
    <Form onSubmit={props.onSubmit ?? noop} {...formProps}>
      <div class={clsx('space-y-4', {
        'opacity-50 pointer-events-non': props.disabled ?? false,
      })}>
        <Field name='name'>
          {(field, fieldProps) => (
            <TextInput
              {...fieldProps}
              label='Tenant Name'
              value={field.value}
              error={field.error}
              required
              placeholder="ACME, Incorporated"
              disabled={props.form.store.submitting}
            />
          )}
        </Field>

        <Field name='slug'>
          {(field, fieldProps) => (
            <TextInput
              {...fieldProps}
              label='Slug'
              value={field.value}
              error={field.error}
              placeholder="acme-inc"
              disabled={props.form.store.submitting}
            />
          )}
        </Field>

        {props.children}
      </div>
    </Form>
  )
}


export function useCreateTenantForm(options: Omit<UseCreateFormOptions<CreateTenantInput>, 'validate'> = {
  initialValues: {
    name: '',
    slug: ''
  }
}) {
  const validate = zodForm(createTenantInputSchema);

  return useCreateForm<CreateTenantInput>({
    ...options,
    validate
  });
}