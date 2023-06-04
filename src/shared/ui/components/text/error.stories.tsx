import type { Meta, StoryObj } from "storybook-solidjs";
import { Error } from "./error";
import { sizePropValues } from "@/shared/ui";

const meta = {
  title: "Shared/UI/Components/Error",
  component: Error,
  tags: ["autodocs"],
  argTypes: {
    size: {
      description: 'The error text size',
      control: 'select',
      options: sizePropValues,
      defaultValue: 'sm'
    },
    when: {
      description: 'Conditionally show the error text',
    }
  },
  args: {
    children: "That should not have happened...",
    when: true,
    size: "sm",
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};