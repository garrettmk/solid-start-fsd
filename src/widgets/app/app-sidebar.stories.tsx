import { ReactiveContextProvider } from "@/app/providers";
import { DarkModeProvider } from "@/features/appearance";
import { withDarkMode } from "@/shared/storybook";
import { ContainerProvider, HStack } from "@/shared/ui";
import { Router } from "@solidjs/router";
import { getOwner } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs";
import { Container } from "tidi";
import { AppSidebar } from "./app-sidebar";

const MockSignOutContainer = new Container([
  ReactiveContextProvider(getOwner()),

  DarkModeProvider
]);

await MockSignOutContainer.resolveAll();

const meta = {
  title: "Widgets/App/AppSidebar",
  component: AppSidebar,
  tags: ["autodocs"],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <ContainerProvider container={MockSignOutContainer}>
        <Router>
          <Story />
        </Router>
      </ContainerProvider>
    )
  ]
} satisfies Meta<typeof AppSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: (props) => (
    <HStack class="h-[400px]">
      <AppSidebar {...props}/>
    </HStack>
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