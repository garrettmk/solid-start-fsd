import type { Meta, StoryObj } from "storybook-solidjs";
import { NavSidebar } from "./nav-sidebar";
import { Router } from "@solidjs/router";
import { Scope, provider } from "@/shared/lib";
import { SignOutDependency } from "@/features/session/sign-out";
import { ScopeProvider } from "@/shared/ui";
import { withDarkMode } from "@/shared/storybook";
import { DarkModeProvider } from "@/features/appearance";

const MockSignOutScope = new Scope(undefined, [
  provider({
    provides: SignOutDependency,
    use: () => async () => {
      null;
    }
  }),

  DarkModeProvider
]);

await MockSignOutScope.resolveAll();

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
      <ScopeProvider scope={MockSignOutScope}>
        <Router>
          <Story />
        </Router>
      </ScopeProvider>
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