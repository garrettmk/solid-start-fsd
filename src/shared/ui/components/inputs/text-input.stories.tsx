import type { Meta, StoryObj } from "storybook-solidjs";
import { TextInput } from "./text-input";

const meta = {
  title: "Shared/UI/Components/TextInput",
  component: TextInput,
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      description: 'Shown when the input is empty',
    },
    label: {
      description: 'Text for the input label',
      control: 'text',
    },
    error: {
      description: 'Text for the error label',
      control: 'text',
    },
    size: {
      description: 'The size of the input',
      control: 'select',
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md',
    }
  },
  args: {
    placeholder: 'Placeholder text',
    label: 'Label text',
    error: 'Error text',
    size: 'md',
  }
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};