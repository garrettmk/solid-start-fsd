import type { Meta, StoryObj } from "storybook-solidjs";
import { MenuItem } from "./menu-item";
import { withDarkMode } from "@/shared/storybook/decorators";

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
  render: (props) => (
    <ul>
      <MenuItem {...props} />
    </ul>
  )
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