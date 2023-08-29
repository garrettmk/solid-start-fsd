import { noop } from "@/shared/lib";
import { CancelButton, HStack, SubmitButton, TextInput, UseCreateFormResult } from "@/shared/ui";
import { JSX, splitProps } from "solid-js";
import { CreateTenantInput } from "../schemas";

export interface CreateTenantFormProps extends Omit<JSX.HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  form: UseCreateFormResult<CreateTenantInput>;
  onSubmit?: (data: CreateTenantInput) => void;
  onCancel?: () => void;
  disabled?: boolean;
}

export function CreateTenantForm(props: CreateTenantFormProps) {
  const [, formProps] = splitProps(props, [
    'form',
    'onSubmit',
    'onCancel',
    'disabled',
    'children',
  ]);

  const Form = props.form.Form;
  const Field = props.form.Field;
  const isSubmitting = () => props.form.store.submitting;

  return (
    <Form onSubmit={props.onSubmit ?? noop} {...formProps}>
      <div class='space-y-4'>
        <Field name='name'>
          {(field, fieldProps) => (
            <TextInput
              {...fieldProps}
              label='Tenant Name'
              value={field.value}
              error={field.error}
              required
              placeholder="ACME, Incorporated"
              disabled={isSubmitting()}
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
              disabled={isSubmitting()}
            />
          )}
        </Field>

        <HStack class="pt-4" justify='end' spacing="sm">
          <CancelButton disabled={isSubmitting()} onClick={props.onCancel}/>
          <SubmitButton disabled={isSubmitting()} busy={isSubmitting()} busyText="Saving...">
            Create Tenant
          </SubmitButton>
        </HStack>
      </div>
    </Form>
  )
}
