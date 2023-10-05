import { createEffect } from "solid-js";
import { useNavigate } from "solid-start";

export interface RedirectProps {
  to: string;
  when?: boolean;
}

export function Redirect(props: RedirectProps) {
  const navigate = useNavigate();

  createEffect(() => {
    if (props.when || props.when === undefined)
      navigate(props.to);
  });

  return null;
}
