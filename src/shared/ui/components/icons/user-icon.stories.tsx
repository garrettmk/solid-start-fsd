import type { Meta, StoryObj } from "storybook-solidjs";
import { UserIcon } from "./user-icon";

const meta = {
  title: "Shared/UI/Components/Icons/UserIcon",
  component: UserIcon,
  tags: ["autodocs"],
} satisfies Meta<typeof UserIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};