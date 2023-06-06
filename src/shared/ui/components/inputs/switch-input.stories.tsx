import type { Meta, StoryObj } from "storybook-solidjs";
import { SwitchInput } from "./switch-input";
import { withDarkMode } from "@/shared/storybook/decorators";

const meta = {
  title: "Shared/UI/Components/SwitchInput",
  component: SwitchInput,
  tags: ["autodocs"],
  argTypes: {
    children: {
      description: 'The switch label',
      control: 'text',
    },
    containerProps: {
      description: 'Props for the container element',
      control: 'object',
    },
    checked: {
      description: 'Whether the button is checked',
      control: 'boolean',
    }
  },
  args: {
    children: 'Engage',
  }
} satisfies Meta<typeof SwitchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
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