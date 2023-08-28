import type { Meta, StoryObj } from 'storybook-solidjs';
import { CreateTenantForm } from './create-tenant-form';
import { withDarkMode } from '@/shared/storybook';

const meta = {
  title: 'Entities/Tenant/CreateTenantForm',
  component: CreateTenantForm,
  tags: ['autodocs'],
} satisfies Meta<typeof CreateTenantForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {}
};

export const Dark: Story = {
  ...Primary,
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  },
  decorators: [withDarkMode]
}