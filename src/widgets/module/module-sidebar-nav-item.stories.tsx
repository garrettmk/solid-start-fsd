import { withDarkMode } from "@/shared/storybook/decorators";
import { Router } from "@solidjs/router";
import type { Meta, StoryObj } from "storybook-solidjs";
import { ModuleSidebarNavItem } from './module-sidebar-nav-item';

const meta = {
  title: "Widgets/Module/ModuleSidebarNavItem",
  component: ModuleSidebarNavItem,
  tags: ["autodocs"],
  argTypes: {
    active: {
      description: 'Whether the nav item is highlighted',
      control: 'boolean',
    },
    href: {
      description: 'The href of the nav item',
      control: 'text',
    },
    exact: {
      description: 'Whether to match the href exactly',
      control: 'boolean',
    },
    children: {
      description: 'The nav item contents',
      control: 'text',
    }
  },
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    active: undefined,
    href: "#",
    exact: false,
    children: "I'm a nav item!"
  }
} satisfies Meta<typeof ModuleSidebarNavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: (props) => (
    <Router>
      <ol>
        <ModuleSidebarNavItem {...props}/>
      </ol>
    </Router>
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