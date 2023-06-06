import type { Meta, StoryObj } from "storybook-solidjs";
import { Dropzone } from "./dropzone";
import { withDarkMode } from "@/shared/storybook/decorators";

const meta = {
  title: "Shared/UI/Components/Dropzone",
  component: Dropzone,
  tags: ["autodocs"],
  argTypes: {
    children: {
      description: 'The dropzone label'
    },
  },
  args: {
    children: 'Drop files here',
  }
} satisfies Meta<typeof Dropzone>;

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