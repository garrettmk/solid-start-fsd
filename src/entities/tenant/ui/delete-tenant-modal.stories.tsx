import { useMockMutation, withDarkMode } from '@/shared/storybook';
import type { Meta, StoryObj } from 'storybook-solidjs';
import { Tenant } from '../schemas';
import { DeleteTenantModal } from './delete-tenant-modal';

const tenant: Tenant = {
  id: '1',
  name: 'Mock Tenant',
  slug: 'mock-tenant',
  createdAt: new Date().toISOString(),
};



const meta = {
  title: 'Entities/Tenant/DeleteTenantModal',
  component: DeleteTenantModal,
  tags: ['autodocs'],
  argTypes: {
    tenant: {
      description: 'The tenant to delete',
      control: 'none',
    },
    isOpen: {
      description: 'Whether the modal is open or closed',
      control: 'boolean',
      defaultValue: true
    },
    onClose: {
      description: 'A callback to close the modal',
      control: 'none',
      action: 'close'
    },
    deleteMutation: {
      description: 'A mutation to delete the tenant',
      options: ['initial', 'pending'],
      control: 'select',
    }
  }
} satisfies Meta<typeof DeleteTenantModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    tenant,
    isOpen: true,
  },
  render: (props) => {
    const deleteMutation = useMockMutation('delete', () => props.deleteMutation);

    return (
      <div class="h-96">
        <DeleteTenantModal 
          class="!absolute" 
          {...props }
          deleteMutation={deleteMutation}
        />
      </div>
    );
  }
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