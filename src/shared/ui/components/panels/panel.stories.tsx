import type { Meta, StoryObj } from "storybook-solidjs";
import { Panel } from "./panel";
import { withDarkMode } from "@/shared/storybook/decorators";

const meta = {
  title: "Shared/UI/Components/Panel",
  component: Panel,
  tags: ["autodocs"],
  argTypes: {
    children: {
      description: 'The panel content',
      control: 'none',
    },
    as: {
      description: 'The element type',
      control: 'select',
      options: ["div", "nav", "aside", "section", "p"],
      defaultValue: 'div'
    }
  },
  args: {
    children: "I'm in the panel!",
    as: 'div',
  },
} satisfies Meta<typeof Panel>;

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