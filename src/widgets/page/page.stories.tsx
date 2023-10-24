import { SignOutDependency } from "@/features/session/sign-out";
import { Container, provider } from "tidi";
import { withDarkMode } from "@/shared/storybook";
import { Heading, Panel, ContainerProvider } from "@/shared/ui";
import { NavSidebar } from "@/widgets/navigation";
import { Router } from "@solidjs/router";
import type { Meta, StoryObj } from "storybook-solidjs";
import { PageContent } from "./page-content";
import { PageHeader } from "./page-header";
import { DarkModeProvider } from "@/features/appearance";

const MockPageContainer = new Container([
  provider({
    provides: SignOutDependency,
    use: () => async () => { null; }
  }),
  DarkModeProvider
]);

await MockPageContainer.resolveAll();

function MockPage() {
  return (
    <>
      <NavSidebar />
      <div class="ml-14">
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
        </PageContent>
      </div>
    </>
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
      <ContainerProvider Container={MockPageContainer}>
        <Router>
          <Story />
        </Router>
      </ContainerProvider>
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