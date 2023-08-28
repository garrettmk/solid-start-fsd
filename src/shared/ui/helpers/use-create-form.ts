import { FieldPath, FieldValues, PartialValues, ResetOptions, ValidateForm, createForm, reset } from "@modular-forms/solid";

export type UseCreateFormOptions<T extends FieldValues> = {
  initialValues?: PartialValues<T>;
  validate?: ValidateForm<T>
};

export type UseCreateFormResult<T extends FieldValues> = {
  store: ReturnType<typeof createForm<T>>[0];
  Form: ReturnType<typeof createForm<T>>[1]['Form'];
  Field: ReturnType<typeof createForm<T>>[1]['Field'];

  reset: (options?: ResetOptions<T, FieldPath<T>>) => void;
};

export function useCreateForm<T extends FieldValues>(options: UseCreateFormOptions<T> = {}): UseCreateFormResult<T> {
  const [store, { Form, Field }] = createForm<T>({
    initialValues: options.initialValues,
    validate: options.validate,
  });

  return {
    store,
    Form,
    Field,
    reset: (...args) => reset(store, ...args),
  };
}