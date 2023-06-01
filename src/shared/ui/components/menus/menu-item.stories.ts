import type { Meta, StoryObj } from "storybook-solidjs";
import { MenuItem } from "./menu-item";

const meta = {
  title: "Shared/UI/Components/Menu/MenuItem",
  component: MenuItem,
  tags: ["autodocs"],
  argTypes: {
    children: {
      description: 'The item content',
      control: 'none',
    },
    href: {
      description: 'The item link',
      control: 'text',
    },
    inactive: {
      description: 'Whether the item responds to mouse events',
      control: 'boolean',
    }
  },
  args: {
    children: 'A menu item',
  },
} satisfies Meta<typeof MenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};