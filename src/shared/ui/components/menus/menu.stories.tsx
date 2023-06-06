import type { Meta, StoryObj } from "storybook-solidjs";
import { Menu } from "./menu";
import { MenuItem } from "./menu-item";
import { withDarkMode } from "@/shared/storybook/decorators";

const meta = {
  title: "Shared/UI/Components/Menu/Menu",
  component: Menu,
  tags: ["autodocs"],
  argTypes: {
    children: {
      description: 'The menu items',
      control: 'none',
    },
    isOpen: {
      description: 'Whether the menu is open',
      control: 'boolean',
    },
    onClickItem: {
      description: 'The click handler for menu items',
      control: 'function',
    }
  },
  args: {
    isOpen: true,
  },
  decorators: [
    Story => (
      <div class="w-64" style="height: 7rem">
        <Story />
      </div>
    )
  ],
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: (props) => (
    <Menu {...props}>
      <MenuItem>Engage</MenuItem>
      <MenuItem>Make it so</MenuItem>
      <MenuItem inactive>Tea, Earl Grey, Hot</MenuItem>
    </Menu>
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