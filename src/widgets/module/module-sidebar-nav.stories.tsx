import { withDarkMode } from "@/shared/storybook/decorators";
import { HomeIcon, SunIcon } from "@/shared/ui";
import { Router } from "@solidjs/router";
import clsx from "clsx";
import type { Meta, StoryObj } from "storybook-solidjs";
import { ModuleSidebarNav } from './module-sidebar-nav';

const meta = {
  title: "Widgets/Module/ModuleSidebarNav",
  component: ModuleSidebarNav,
  tags: ["autodocs"],
  argTypes: {
    children: {
      description: 'The sidebar content',
      control: 'none',
    }
  },
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    children: "I'm in the sidebar!"
  }
} satisfies Meta<typeof ModuleSidebarNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: (props) => (
    <Router>
      <ModuleSidebarNav {...props}>
        <ModuleSidebarNav.Item href="#">
          <HomeIcon class="mr-4" size="xs" />
          Nav Item 1
        </ModuleSidebarNav.Item>
        <ModuleSidebarNav.Item active>
          <SunIcon class="mr-4" size="xs" />
          Nav Item 2
        </ModuleSidebarNav.Item>
      </ModuleSidebarNav>
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