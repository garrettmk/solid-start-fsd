import { useMockAction, withDarkMode } from '@/shared/storybook';
import { Accessor } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs';
import { Tenant } from '../schemas';
import { DeleteTenantModal } from './delete-tenant-modal';

const tenant: Tenant = {
  id: '1',
  name: 'Mock Tenant',
  slug: 'mock-tenant',
  createdAt: new Date().toISOString(),
};

function useMockDeleteAction(actionState: Accessor<'initial' | 'pending'>) {
  return useMockAction('delete', actionState);
}


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
      action: 'closed'
    },
    'deleteAction': {
      description: 'Whether the delete action is in a pending state',
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
    deleteAction: 'initial',
  },
  render: (props) => {
    return (
      <div class="h-96">
        <DeleteTenantModal 
          class="!absolute" 
          {...props} 
          deleteAction={() => useMockDeleteAction(() => props['deleteAction'])}
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