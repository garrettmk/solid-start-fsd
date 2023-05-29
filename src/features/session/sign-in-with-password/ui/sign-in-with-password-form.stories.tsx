import type { Meta, StoryObj } from 'storybook-solidjs';
import { SignInWithPasswordForm } from './sign-in-with-password-form';

const meta = {
  title: 'Features/Session/Sign In With Password/Sign In With Password Form',
  component: SignInWithPasswordForm,
  tags: ['autodocs'],
  argTypes: {}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
}