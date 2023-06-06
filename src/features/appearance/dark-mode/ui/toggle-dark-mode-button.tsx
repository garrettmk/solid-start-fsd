import { ButtonProps, Button, SunIcon, MoonIcon } from "@/shared/ui";
import { useDarkMode } from "../lib";
import { Match, Switch } from "solid-js";

export type ToggleDarkModeButtonProps = Omit<ButtonProps, "onClick" | "children">;

export function ToggleDarkModeButton(props: ToggleDarkModeButtonProps) {
  const darkMode = useDarkMode();

  return (
    <Button
      {...props}
      icon
      onClick={darkMode.toggle}
      aria-label="Toggle dark mode"
    >
      <Switch>
        <Match when={darkMode.isDarkMode}>
          <SunIcon size={props.size} />
        </Match>
        <Match when={!darkMode.isDarkMode}>
          <MoonIcon size={props.size} />
        </Match>
      </Switch>
    </Button>
  );
}