import clsx from "clsx";
import { JSX, splitProps } from "solid-js";

export interface BigOptionButtonProps
  extends JSX.InputHTMLAttributes<HTMLInputElement> {
  containerProps?: JSX.HTMLAttributes<HTMLDivElement>;
  label?: string;
  description?: string;
}

export function BigOptionButton(props: BigOptionButtonProps) {
  const [, inputProps] = splitProps(props, [
    "containerProps",
    "label",
    "description",
    "id",
    "class",
  ]);

  const inputId = () =>
    props.id ??
    (props.name && props.value ? `${props.name}-${props.value}` : undefined);

  return (
    <div
      class={clsx("relative", props.class)}
      {...(props.containerProps ?? {})}
    >
      <input
        id={inputId()}
        type="radio"
        class="absolute opacity-0 peer"
        {...inputProps}
      />
      <label
        for={inputId()}
        class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-400 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <div class="block">
          <div class="w-full text-lg font-semibold">{props.label}</div>
          <div class="w-full">{props.description}</div>
        </div>
        <svg
          aria-hidden="true"
          class="w-6 h-6 ml-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </label>
    </div>
  );
}
