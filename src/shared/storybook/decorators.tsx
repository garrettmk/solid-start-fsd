import { Decorator } from "storybook-solidjs";

export const withDarkMode: Decorator = (Story) => (
  <div class="dark">
    <Story />
  </div>
);