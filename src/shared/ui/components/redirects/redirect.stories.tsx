import type { Meta, StoryObj } from "storybook-solidjs";
import { Redirect } from "./redirect";
import { Router } from "@solidjs/router";

const meta = {
  title: "Shared/UI/Components/Redirect",
  component: Redirect,
  tags: ["autodocs"],
  argTypes: {
    to: {
      description: 'The path to redirect to',
      control: 'text',
    },
    when: {
      description: 'The condition to redirect',
      control: 'boolean',
    }
  },
  args: {
    to: '/',
    when: false,
  },
  decorators: [
    (Story) => (
      <Router>
        <Story />
      </Router>
    )
  ]
} satisfies Meta<typeof Redirect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};