import { createEffect } from "solid-js";
import { useNavigate } from "solid-start";

export interface RedirectProps {
  to: string;
  when: () => unknown;
}

export function Redirect(props: RedirectProps) {
  const navigate = useNavigate();

  createEffect(() => {
    if (props.when()) navigate(props.to);
  });

  return null;
}
