import { DarkModeProvider } from "@/features/appearance";
import { SignOutDependency } from "@/features/session/sign-out";
import { Scope, provider } from "@/shared/lib";
import { withDarkMode } from "@/shared/storybook";
import type { Meta, StoryObj } from "storybook-solidjs";
import { UserMenuButton } from "./user-menu-button";
import { ScopeProvider } from "@/shared/ui";
import { SessionProfileDependency } from "@/entities/session";

const MockScope = new Scope(undefined, [
  provider({
    provides: SignOutDependency,
    use: () => async () => { null }
  }),
  
  DarkModeProvider,

  provider({
    provides: SessionProfileDependency,
    use: () => () => ({
      id: '1',
      fullName: 'John Doe',
      preferredName: 'John Doe',
      avatarUrl: 'https://avatars.githubusercontent.com/u/1?v=4',
      avatarInitials: 'JD',
      createdAt: new Date().toISOString(),
    })
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