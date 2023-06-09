import type { Meta, StoryObj } from "storybook-solidjs";
import { ModuleSidebar } from './module-sidebar';
import { withDarkMode } from "@/shared/storybook/decorators";

const meta = {
  title: "Shared/UI/Components/ModuleSidebar",
  component: ModuleSidebar,
  tags: ["autodocs"],
  argTypes: {
    children: {
      description: 'The sidebar content',
      control: 'none',
    }
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        height: 400,
      }
    }
  },
  args: {
    children: "I'm in the sidebar!"
  }
} satisfies Meta<typeof ModuleSidebar>;

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