import type { Meta, StoryObj } from "storybook-solidjs";
import { Tabs } from "./tabs";
import { Tab } from "./tab";
import { TabsProvider } from "../../contexts";
import { TabList } from "./tab-list";
import { TabTrigger } from "./tab-trigger";
import { TabContent } from "./tab-content";

const meta = {
  title: "Shared/UI/Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {}
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: props => (
    <TabsProvider>
      <Tabs>
        <TabList>
          <TabTrigger value="one">One</TabTrigger>
          <TabTrigger value="two">Two</TabTrigger>
          <TabTrigger value="three">Three</TabTrigger>
        </TabList>
        <Tab value="one">
          Content for tab one
        </Tab>
        <Tab value="two">
          Content for tab two
        </Tab>
        <Tab value="three">
          Content for tab three
        </Tab>
      </Tabs>
    </TabsProvider>
  )
};