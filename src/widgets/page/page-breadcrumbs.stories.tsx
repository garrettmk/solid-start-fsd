import { withDarkMode } from "@/shared/storybook/decorators";
import { RouteProvider } from "@/shared/ui";
import { Router } from "@solidjs/router";
import type { Meta, StoryObj } from "storybook-solidjs";
import { PageBreadcrumbs } from "./page-breadcrumbs";

const meta = {
  title: "Widgets/Page/PageBreadcrumbs",
  component: PageBreadcrumbs,
  tags: ["autodocs"],
} satisfies Meta<typeof PageBreadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: (props) => (
    <Router>
      <RouteProvider path="/home" title="Home">
        <RouteProvider path="/test" title="Test">
          <RouteProvider path="/leaf" title="Leaf">
            <PageBreadcrumbs/>
          </RouteProvider>
        </RouteProvider>
      </RouteProvider>
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