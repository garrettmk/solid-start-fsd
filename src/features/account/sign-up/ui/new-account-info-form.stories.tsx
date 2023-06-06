import type { Meta, StoryObj } from 'storybook-solidjs';
import { NewAccountInfoForm } from './new-account-info-form';
import { withDarkMode } from '@/shared/storybook/decorators';

const meta = {
  title: 'Features/Account/Sign Up/New Account Info Form',
  component: NewAccountInfoForm,
  tags: ['autodocs'],
  argTypes: {}
};

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