import type { Meta, StoryObj } from "storybook-solidjs";
import { Divider } from "./divider";
import { withDarkMode } from "@/shared/storybook/decorators";

const meta = {
  title: "Shared/UI/Components/Divider",
  component: Divider,
  tags: ["autodocs"],
} satisfies Meta<typeof Divider>;

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
  decorators: [
    withDarkMode
  ]
};