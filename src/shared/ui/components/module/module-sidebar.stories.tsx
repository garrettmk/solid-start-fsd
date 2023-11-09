import type { Meta, StoryObj } from "storybook-solidjs";
import { ModuleSidebar } from './module-sidebar';
import { withDarkMode } from "@/shared/storybook/decorators";
import clsx from "clsx";
import { HomeIcon, SunIcon } from "../icons";

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
  },
  args: {
    children: "I'm in the sidebar!"
  }
} satisfies Meta<typeof ModuleSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: (props) => (
    <ModuleSidebar 
      {...props} 
      class={clsx('h-[400px]', props.class)} 
    >
      <ModuleSidebar.Nav>
        <ModuleSidebar.Nav.Item href="#">
          <HomeIcon class="mr-4" size="xs"/>
          Nav Item 1
        </ModuleSidebar.Nav.Item>
        <ModuleSidebar.Nav.Item active>
          <SunIcon class="mr-4" size="xs"/>
          Nav Item 2
        </ModuleSidebar.Nav.Item>
      </ModuleSidebar.Nav>
    </ModuleSidebar>
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