import type { Meta, StoryObj } from 'storybook-solidjs';
import { CreateTenantForm, CreateTenantFormProps } from './create-tenant-form';
import { withDarkMode } from '@/shared/storybook';
import { useCreateTenantForm } from '../lib';

function WithForm(props: CreateTenantFormProps) {
  const form = useCreateTenantForm();

  return (
    <CreateTenantForm {...props} form={form} />
  );
}

const meta = {
  title: 'Entities/Tenant/CreateTenantForm',
  component: CreateTenantForm,
  tags: ['autodocs'],
} satisfies Meta<typeof CreateTenantForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: (props) => <WithForm {...props} />
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