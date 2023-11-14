import type { Meta, StoryObj } from "storybook-solidjs";
import { Module } from './module';
import { withDarkMode } from "@/shared/storybook/decorators";
import clsx from "clsx";
import { HomeIcon, SunIcon } from "@/shared/ui";
import { Router } from "@solidjs/router";
import { MetaProvider } from "@solidjs/meta";

const meta = {
  title: "Widgets/Module",
  component: Module,
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
} satisfies Meta<typeof Module>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: (props) => (
    <MetaProvider>
      <Router>
        <Module>
          <Module.Sidebar 
            {...props} 
            class={clsx('h-[400px]', props.class)} 
          >
            <Module.Sidebar.Nav>
              <Module.Sidebar.Nav.Item href="#">
                <HomeIcon class="mr-4" size="xs"/>
                Nav Item 1
              </Module.Sidebar.Nav.Item>
              <Module.Sidebar.Nav.Item active>
                <SunIcon class="mr-4" size="xs"/>
                Nav Item 2
              </Module.Sidebar.Nav.Item>
            </Module.Sidebar.Nav>
          </Module.Sidebar>
        </Module>
      </Router>
    </MetaProvider>
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