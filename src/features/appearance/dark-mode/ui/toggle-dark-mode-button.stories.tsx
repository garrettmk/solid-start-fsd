import { Container } from "tidi";
import { withDarkMode } from "@/shared/storybook";
import { ContainerProvider } from "@/shared/ui";
import type { Meta, StoryObj } from "storybook-solidjs";
import { DarkModeProvider } from "../lib";
import { ToggleDarkModeButton } from "./toggle-dark-mode-button";


const MockDarkModeContainer = new Container([
  DarkModeProvider
]);

await MockDarkModeContainer.resolveAll();

const meta = {
  title: "Features/Appearance/ToggleDarkMode",
  component: ToggleDarkModeButton,
  tags: ["autodocs"],
  parameters: {},
  decorators: [
    (Story) => (
      <ContainerProvider Container={MockDarkModeContainer}>
        <Story />
      </ContainerProvider>
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