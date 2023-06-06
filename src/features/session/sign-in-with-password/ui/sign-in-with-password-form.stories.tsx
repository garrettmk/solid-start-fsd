import type { Meta, StoryObj } from 'storybook-solidjs';
import { SignInWithPasswordForm } from './sign-in-with-password-form';
import { Router } from '@solidjs/router';
import { withDarkMode } from '@/shared/storybook/decorators';

const meta = {
  title: 'Features/Session/Sign In With Password/Sign In With Password Form',
  component: SignInWithPasswordForm,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    Story => (
      <Router>
        <Story />
      </Router>
    )
  ]
} satisfies Meta<typeof SignInWithPasswordForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
}

export const Dark: Story = {
  parameters: {
    backgrounds: {
      default: 'dark'
    },
  },
  decorators: [
    withDarkMode
  ]
}