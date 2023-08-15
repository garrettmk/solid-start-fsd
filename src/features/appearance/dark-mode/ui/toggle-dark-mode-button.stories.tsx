import { Scope } from "tidi";
import { withDarkMode } from "@/shared/storybook";
import { ScopeProvider } from "@/shared/ui";
import type { Meta, StoryObj } from "storybook-solidjs";
import { DarkModeProvider } from "../lib";
import { ToggleDarkModeButton } from "./toggle-dark-mode-button";


const MockDarkModeScope = new Scope([
  DarkModeProvider
]);

await MockDarkModeScope.resolveAll();

const meta = {
  title: "Features/Appearance/ToggleDarkMode",
  component: ToggleDarkModeButton,
  tags: ["autodocs"],
  parameters: {},
  decorators: [
    (Story) => (
      <ScopeProvider scope={MockDarkModeScope}>
        <Story />
      </ScopeProvider>
    )
  ]
} satisfies Meta<typeof ToggleDarkModeButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {}
};


export const Dark: Story = {
  ...Primary,
  parameters: {
    backgrounds: {
      default: 'dark',
    }
  },
  decorators: [withDarkMode]
};