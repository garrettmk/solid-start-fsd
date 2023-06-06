import { SignOutDependency } from "@/features/session/sign-out";
import { Scope, provider } from "@/shared/lib";
import { withDarkMode } from "@/shared/storybook/decorators";
import { Heading, Panel, ScopeProvider } from "@/shared/ui";
import { NavSidebar } from "@/widgets/navigation/nav-sidebar";
import { Router } from "@solidjs/router";
import type { Meta, StoryObj } from "storybook-solidjs";
import { PageContent } from "./page-content";
import { PageHeader } from "./page-header";
import { DarkModeProvider } from "@/features/appearance";

const MockPageScope = new Scope(undefined, [
  provider({
    provides: SignOutDependency,
    use: () => async () => { }
  }),
  DarkModeProvider
]);

await MockPageScope.resolveAll();

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
      <ScopeProvider scope={MockPageScope}>
        <Router>
          <Story />
        </Router>
      </ScopeProvider>
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