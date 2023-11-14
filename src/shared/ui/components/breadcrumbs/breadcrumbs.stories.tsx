import { withDarkMode } from "@/shared/storybook";
import { Router } from "@solidjs/router";
import type { Meta, StoryObj } from "storybook-solidjs";
import { Breadcrumbs, BreadcrumbsProps } from "./breadcrumbs";

const meta = {
  title: "Shared/UI/Components/Breadcrumbs",
  component: Breadcrumbs,
  tags: ["autodocs"],
  argTypes: {
    color: {
    } satisfies BreadcrumbsProps
  },
  decorators: [
    Story => (
      <Router>
        <Story />
      </Router>
    )
  ]
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: (args) => (
    <Breadcrumbs {...args}>
      <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
      <Breadcrumbs.Separator/>
      <Breadcrumbs.Item href="/about">About</Breadcrumbs.Item>
      <Breadcrumbs.Separator/>
      <Breadcrumbs.Item>Contact</Breadcrumbs.Item>
    </Breadcrumbs>
  )
};

export const Dark: Story = {
  ...Primary,
  parameters: {
    backgrounds: {
      default: 'dark',
    }
  },
  decorators: [
    withDarkMode
  ]
}