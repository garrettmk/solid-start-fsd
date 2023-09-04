import { ReactiveContextProvider } from "@/app/providers";
import { SessionProfileDependency } from "@/entities/session";
import { UserProfile } from "@/entities/user-profile";
import { DarkModeProvider } from "@/features/appearance";
import { SignOutDependency } from "@/features/session/sign-out";
import { withDarkMode } from "@/shared/storybook";
import { ReactiveContextDependency, ScopeProvider, runWithOwner } from "@/shared/ui";
import { createResource, getOwner } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs";
import { Scope, provider } from "tidi";
import { UserMenuButton } from "./user-menu-button";

const MockScope = new Scope([
  provider({
    provides: SignOutDependency,
    use: () => async () => { null }
  }),
  
  DarkModeProvider,
  ReactiveContextProvider(getOwner()),

  provider({
    provides: SessionProfileDependency,
    requires: [ReactiveContextDependency],
    use: (reactiveContext) => 
      runWithOwner(reactiveContext, () => 
        createResource(async () => ({
          id: '1',
          fullName: 'John Doe',
          preferredName: 'John Doe',
          avatarUrl: 'https://avatars.githubusercontent.com/u/1?v=4',
          avatarInitials: 'JD',
          createdAt: new Date().toISOString(),
        } as UserProfile | undefined))
      )
  })
]);

await MockScope.resolveAll();

const meta = {
  title: "Widgets/Navigation/UserMenuButton",
  component: UserMenuButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      story: {
        inline: false,
        height: 600
      }
    }
  },
  decorators: [
    (Story) => (
      <ScopeProvider scope={MockScope}>
        <Story />
      </ScopeProvider>
    )
  ],
  args: {
    placement: "right-end",
    size: "xs",
    color: "ghost",
  }
} satisfies Meta<typeof UserMenuButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: (props) => (
    <div class="p-48">
      <UserMenuButton {...props} />
    </div>
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