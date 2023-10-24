import type { Meta, StoryObj } from "storybook-solidjs";
import { NavSidebar } from "./nav-sidebar";
import { Router } from "@solidjs/router";
import { Container, provider } from "tidi";
import { SignOutDependency } from "@/features/session/sign-out";
import { ContainerProvider } from "@/shared/ui";
import { withDarkMode } from "@/shared/storybook";
import { DarkModeProvider } from "@/features/appearance";

const MockSignOutContainer = new Container([
  provider({
    provides: SignOutDependency,
    use: () => async () => {
      null;
    }
  }),

  DarkModeProvider
]);

await MockSignOutContainer.resolveAll();

const meta = {
  title: "Widgets/Navigation/NavSidebar",
  component: NavSidebar,
  tags: ["autodocs"],
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        height: 800,
      }
    }
  },
  decorators: [
    (Story) => (
      <ContainerProvider Container={MockSignOutContainer}>
        <Router>
          <Story />
        </Router>
      </ContainerProvider>
    )
  ]
} satisfies Meta<typeof NavSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {}
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