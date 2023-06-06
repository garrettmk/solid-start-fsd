import type { Meta, StoryObj } from "storybook-solidjs";
import { Checkbox } from "./checkbox";
import { withDarkMode } from "@/shared/storybook/decorators";

const meta = {
  title: "Shared/UI/Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    children: {
      description: 'The checkbox label'
    },
    checked: {
      description: 'Whether the button is checked',
      control: 'boolean',
    },
    value: {
      description: 'The value of the button',
      control: 'text',
    },
    containerProps: {
      description: 'Props for the container element',
      control: 'object',
    },
    indeterminate: {
      description: 'Whether the checkbox is in an indeterminate state',
      control: 'boolean',
    }
  },
  args: {
    id: 'checkbox-control',
    children: 'I like puppies',
  }
} satisfies Meta<typeof Checkbox>;

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