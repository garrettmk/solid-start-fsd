import type { Meta, StoryObj } from "storybook-solidjs";
import { WrenchScrewdriverIcon } from "./wrench-screwdriver-icon";

const meta = {
  title: "Shared/UI/Components/Icons/WrenchScrewdriverIcon",
  component: WrenchScrewdriverIcon,
  tags: ["autodocs"],
} satisfies Meta<typeof WrenchScrewdriverIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};