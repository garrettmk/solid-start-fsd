import type { Meta, StoryObj } from 'storybook-solidjs';
import { NewAccountInfoForm } from './new-account-info-form';

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