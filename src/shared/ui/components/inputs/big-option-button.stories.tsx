import type { Meta, StoryObj } from "storybook-solidjs";
import { BigOptionButton } from "./big-option-button";

const meta = {
  title: "Shared/UI/Components/BigOptionButton",
  component: BigOptionButton,
  tags: ["autodocs"],
  argTypes: {
    label: {
      description: 'The main text for the button',
      control: 'text',
    },
    description: {
      description: 'The secondary text for the button',
      control: 'text',
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
    }
  },
  args: {
    id: 'big-option-button',
    label: 'Label',
    description: 'Description',
  }
} satisfies Meta<typeof BigOptionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};