import type { Meta, StoryObj } from "storybook-solidjs";
import { Divider } from "./divider";

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