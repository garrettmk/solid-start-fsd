import type { Meta, StoryObj } from "storybook-solidjs";
import { VerticalDivider } from "./vertical-divider";
import { withDarkMode } from "@/shared/storybook/decorators";

const meta = {
  title: "Shared/UI/Components/VerticalDivider",
  component: VerticalDivider,
  tags: ["autodocs"],
  decorators: [
    Story => (
      <div style="height: 8rem;">
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof VerticalDivider>;

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
  decorators: [
    withDarkMode
  ]
};