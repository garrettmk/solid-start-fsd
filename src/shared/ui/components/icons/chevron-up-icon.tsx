import { Icon, IconProps } from "./icon";

export function ChevronUpIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M4.5 15.75l7.5-7.5 7.5 7.5"
      />
    </Icon>
  );
}
