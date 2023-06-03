import type { Meta, StoryObj } from "storybook-solidjs";
import { Breadcrumbs, BreadcrumbsProps } from "./breadcrumbs";
import { BreadcrumbItem } from "./breadcrumb-item";
import { Router } from "@solidjs/router";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
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

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
export const Primary: Story = {
  args: {},
  render: (args) => (
    <Breadcrumbs {...args}>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem>&gt;</BreadcrumbItem>
      <BreadcrumbItem href="/about">About</BreadcrumbItem>
      <BreadcrumbItem>&gt;</BreadcrumbItem>
      <BreadcrumbItem>Contact</BreadcrumbItem>
    </Breadcrumbs>
  )
};