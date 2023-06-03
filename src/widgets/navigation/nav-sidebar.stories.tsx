import type { Meta, StoryObj } from "storybook-solidjs";
import { NavSidebar } from "./nav-sidebar";
import { Router } from "@solidjs/router";


const meta = {
  title: "Widgets/Navigation/NavSidebar",
  component: NavSidebar,
  tags: ["autodocs"],
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        height: 800,
      }
    }
  },
  decorators: [
    (Story) => (
      <Router>
        <Story />
      </Router>
    )
  ]
} satisfies Meta<typeof NavSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {}
};