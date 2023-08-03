import { UserProfile } from "@/entities/user-profile";
import { noop, shakeFalsyValues } from "@/shared/lib";
import { Dropzone, TextInput, createObjectURL, encodeFile } from "@/shared/ui";
import { createForm, zodForm } from "@modular-forms/solid";
import { JSX, splitProps } from "solid-js";
import { UserProfileUpdate, UserProfileUpdateFormData, userProfileUpdateFormSchema } from "../schemas";

export interface UpdateUserProfileFormProps extends Omit<JSX.HTMLAttributes<HTMLFormElement>, "onSubmit"> {
  initialValues?: Partial<UserProfile>;
  onSubmit?: (data: UserProfileUpdate) => void;
  disabled?: boolean;
}


export function UpdateUserProfileForm(props: UpdateUserProfileFormProps) {
  const { initialValues } = props;
  const [, formProps] = splitProps(props, [
    'initialValues',
    'onSubmit',
    'disabled',
    'children',
  ]);

  const disabled = () => props.disabled;

  const [, { Form, Field }] = createForm<UserProfileUpdateFormData>({
    initialValues: initialValues ?? {},
    validate: zodForm(userProfileUpdateFormSchema)
  });

  const imageURL = createObjectURL();

  const handleSubmit = async (data: UserProfileUpdateFormData) => {
    data = shakeFalsyValues(data);
    console.log('submitting form data', data);
    const file = data.avatarImage as File | undefined;

    const avatarImage = file && {
      name: file.name,
      type: file.type,
      size: file.size,
    } as UserProfileUpdate['avatarImage'];
  
    const avatarImageData = file && await encodeFile(file);

    props.onSubmit?.({
      ...data,
      id: initialValues?.id,
      avatarImage,
      avatarImageData,
    });
  };

  return (
    <Form data-testid="user-profile-form" class="space-y-6" onSubmit={props.onSubmit ? handleSubmit : noop} {...formProps}>
      <Field name="fullName">
        {(field, props) => (
          <TextInput
            {...props}
            label="Full name"
            placeholder="John Doe"
            value={field.value}
            error={field.error}
            disabled={disabled()}
            required
          />
        )}
      </Field>

      <Field name="preferredName">
        {(field, props) => (
          <TextInput
            {...props}
            label="Preferred name"
            placeholder="John"
            value={field.value}
            error={field.error}
            disabled={disabled()}
            required
          />
        )}
      </Field>

      <Field name="avatarInitials">
        {(field, props) => (
          <TextInput
            {...props}
            label="Avatar initials"
            placeholder="JD"
            value={field.value}
            error={field.error}
            disabled={disabled()}
          />
        )}
      </Field>

      {/* @ts-expect-error the form only has a subset of File's fields  */}
      <Field name="avatarImage" type="File">
        {(field, props) => (
          <div>
            <label class="block text-sm text-slate-600 dark:text-slate-400 mb-2 ml-1">
              Avatar Image
            </label>
            <Dropzone
              {...props}
              class="rounded-full aspect-square overflow-hidden"
              description="PNG, JPG/JPEG, or WEBP (max. 1MB)"
              onChange={imageURL.fromChangeEvent}
              disabled={disabled()}
            >
              {imageURL.value && (
                <img 
                  class="w-full h-full object-cover"
                  src={imageURL.value}
                  alt="Image preview"
                />
              )}
            </Dropzone>
          </div>
        )}
      </Field>

      {props.children}
    </Form>
  );
}