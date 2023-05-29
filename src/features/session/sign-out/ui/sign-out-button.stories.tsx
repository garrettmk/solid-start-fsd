import type { Meta, StoryObj } from 'storybook-solidjs';
import { SignOutButton } from './sign-out-button';
import { Scope, provider } from '@/shared/lib';
import { ScopeProvider } from '@/shared/ui';
import { SignOutDependency } from '../lib';

const mockSignOutScope = new Scope(undefined, [
  provider({
    provides: SignOutDependency,
    use: () => async () => { }
  })
]);

await mockSignOutScope.resolveAll();

const meta = {
  title: 'Features/Session/Sign Out/Sign Out Button',
  component: SignOutButton,
  tags: ['autodocs'],
  argTypes: {}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (props) => (
    <ScopeProvider scope={mockSignOutScope}>
      <SignOutButton {...props} />
    </ScopeProvider>
  )
}