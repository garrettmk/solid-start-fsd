import { ReactiveContextDependency, runWithOwner } from "@/shared/ui";
import { dependency, provider } from "tidi";
import { useContainer } from "@/shared/ui";
import { createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import { z } from "zod";


export interface DarkMode {
  isDarkMode: boolean;
  toggle: () => void;
}

export function createDarkMode(initial?: boolean): DarkMode {
  if (initial === undefined && typeof window !== "undefined") {
    initial = window?.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  const [darkMode, setState] = createStore<DarkMode>({
    isDarkMode: initial ?? false,
    toggle: () => setState("isDarkMode", (prev) => !prev),
  });

  createEffect(() => {
    if (darkMode.isDarkMode) {
      document?.documentElement.classList.add("dark");
    } else {
      document?.documentElement.classList.remove("dark");
    }
  });

  return darkMode;
}

export const DarkModeDependency = dependency<DarkMode>({
  name: "DARK_MODE",
  validate: value => z.object({
    isDarkMode: z.boolean(),
    toggle: z.function()
  }).parse(value)
});

export const DarkModeProvider = provider({
  provides: DarkModeDependency,
  requires: [ReactiveContextDependency],
  use: async (owner) => await runWithOwner(owner, () => createDarkMode()),
});

export function useDarkMode(): DarkMode {
  return useContainer(DarkModeDependency);
}