import { JSX, splitProps } from "solid-js";
import { UseCreateFormResult } from "../../helpers";
import { noop } from "@/shared/lib";
import { SearchInput } from "@/shared/schemas";

const styles = {
  root: "relative",

  input: `
    block p-2.5 w-full z-20 
    text-sm text-slate-900 dark:text-white dark:placeholder-slate-400
    bg-slate-50 dark:bg-slate-700
    rounded-lg border border-slate-300 dark:border-slate-600
    focus:ring-blue-500 
    focus:border-blue-500 dark:focus:border-blue-500
  `,
};

/**
 * Props for the SearchForm component
 */
export interface SearchFormProps extends Omit<JSX.HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  form: UseCreateFormResult<SearchInput>;
  onSubmit?: (data: SearchInput) => void;
  disabled?: boolean;
  placeholder?: string
}

/**
 * A simple search form, with a text input and submit button.
 * @param props 
 * @returns 
 */
export function SearchForm(props: SearchFormProps) {
  const [, formProps] = splitProps(props, [
    'form',
    'onSubmit',
    'disabled',
    'placeholder'
  ]);

  const Form = props.form.Form;
  const Field = props.form.Field;
  const isSubmitting = () => props.form.store.submitting;

  return (
    <Form onSubmit={props.onSubmit ?? noop} {...formProps}>
      <div class="relative w-full">
        <Field name='keywords'>
          {(field, fieldProps) => (
            <input
              {...fieldProps}
              type="search"
              id="search-input"
              name="search"
              class={styles.input}
              placeholder={props.placeholder}
              value={field.value}
              disabled={isSubmitting()}
            />
          )}
        </Field>
        <button
          type="submit"
          class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          disabled={isSubmitting()}
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <span class="sr-only">Search</span>
        </button>
      </div>
    </Form>
  );
}