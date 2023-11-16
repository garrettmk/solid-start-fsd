import { Meta, StoryObj } from "storybook-solidjs";
import { App } from "./app";
import { HomeIcon } from "@/shared/ui";
import { withDarkMode } from "@/shared/storybook";

const meta = {
  title: "Widgets/App/App",
  component: App,
  tags: ["autodocs"],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: (props) => (
    <App {...props}>
      <App.Sidebar>
        <App.Sidebar.Nav>
          <App.Sidebar.Nav.Item
            icon={<HomeIcon size="xs"/>}
            title="Home"
            href="https://google.com"
          />
        </App.Sidebar.Nav>
      </App.Sidebar>
    </App>
  )
};

export const Dark: Story = {
  ...Primary,
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  },
  decorators: [
    withDarkMode
  ]
};