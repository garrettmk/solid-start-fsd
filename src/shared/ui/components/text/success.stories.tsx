import { withDarkMode } from "@/shared/storybook";
import type { Meta, StoryObj } from "storybook-solidjs";
import { Success } from "./success";

const meta = {
  title: "Shared/UI/Components/Success",
  component: Success,
  tags: ["autodocs"],
  argTypes: {
    when: {
      description: 'Conditionally show the message text',
    }
  },
  args: {
    children: "Hooray! Everything is fine.",
    when: true,
  }
} satisfies Meta<typeof Success>;

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