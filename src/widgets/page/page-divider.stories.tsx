import type { Meta, StoryObj } from "storybook-solidjs";
import { withDarkMode } from "@/shared/storybook/decorators";
import { PageDivider } from "./page-divider";

const meta = {
  title: "Widgets/Page/PageDivider",
  component: PageDivider,
  tags: ["autodocs"],
} satisfies Meta<typeof PageDivider>;

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