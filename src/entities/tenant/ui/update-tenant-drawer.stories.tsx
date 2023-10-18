import { useMockMutation, withDarkMode } from '@/shared/storybook';
import type { Meta, StoryObj } from 'storybook-solidjs';
import { UpdateTenantDrawer } from './update-tenant-drawer';


const meta = {
  title: 'Entities/Tenant/UpdateTenantDrawer',
  component: UpdateTenantDrawer,
  tags: ['autodocs'],
  argTypes: {
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
    updateMutation: {
      description: 'A mutation to update the tenant',
      options: ['initial', 'pending'],
      control: 'select',
    }
  }
} satisfies Meta<typeof UpdateTenantDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    isOpen: true,
  },
  render: (props) => {
    const updateMutation = useMockMutation('create', () => props.updateMutation);

    return (
      <div class="h-96">
        <UpdateTenantDrawer 
          class="!absolute" 
          {...props }
          updateMutation={updateMutation}
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