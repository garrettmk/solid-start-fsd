import { withDarkMode } from "@/shared/storybook";
import { Heading, Panel } from "@/shared/ui";
import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import type { Meta, StoryObj } from "storybook-solidjs";
import { Page } from "./page";
import { PageContent } from "./page-content";
import { PageHeader } from "./page-header";


function MockPage() {
  return (
    <div class="relative flex items-stretch">
      <Page>
        <PageHeader title="Page Title">
          <Heading class="text-xl font-medium">Page Header</Heading>
        </PageHeader>
        <PageContent>
          <Panel class="p-6">
            <Heading level="2" class="text-lg mb-4">Page Content</Heading>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptatum, quibusdam, quia, voluptate voluptas quod quos
              exercitationem voluptatibus quas doloribus quidem. Quisquam
              voluptatum, quibusdam, quia, voluptate voluptas quod quos
              exercitationem voluptatibus quas doloribus quidem.
            </p>
          </Panel>
          <Page.Divider class="my-6"/>
          <Panel class="p-6">
            <Heading level="2" class="text-lg mb-4">Page Content</Heading>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptatum, quibusdam, quia, voluptate voluptas quod quos
              exercitationem voluptatibus quas doloribus quidem. Quisquam
              voluptatum, quibusdam, quia, voluptate voluptas quod quos
              exercitationem voluptatibus quas doloribus quidem.
            </p>
          </Panel>
        </PageContent>
      </Page>
    </div>
  );
}


const meta = {
  title: "Widgets/Page",
  component: MockPage,
  tags: ["autodocs"],
  argTypes: {
    component: {
      description: "The component to render the page content as",
      defaultValue: "main",
    }
  },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MetaProvider>
        <Router>
          <Story />
        </Router>
      </MetaProvider>
    )
  ]
} satisfies Meta<typeof PageContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
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