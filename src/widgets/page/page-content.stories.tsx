import type { Meta, StoryObj } from "storybook-solidjs";
import { withDarkMode } from "@/shared/storybook/decorators";
import { PageContent } from "./page-content";

const meta = {
  title: "Widgets/Page/PageContent",
  component: PageContent,
  tags: ["autodocs"],
  argTypes: {
    component: {
      description: "The component to render the page content as",
      defaultValue: "main",
    }
  },
} satisfies Meta<typeof PageContent>;

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