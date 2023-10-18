import { useMockMutation, withDarkMode } from '@/shared/storybook';
import type { Meta, StoryObj } from 'storybook-solidjs';
import { CreateTenantDrawer } from './create-tenant-drawer';


const meta = {
  title: 'Entities/Tenant/CreateTenantDrawer',
  component: CreateTenantDrawer,
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
    createMutation: {
      description: 'A mutation to create the tenant',
      options: ['initial', 'pending'],
      control: 'select',
    }
  }
} satisfies Meta<typeof CreateTenantDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    isOpen: true,
  },
  render: (props) => {
    const createMutation = useMockMutation('create', () => props.createMutation);

    return (
      <div class="h-96">
        <CreateTenantDrawer 
          class="!absolute" 
          {...props }
          createMutation={createMutation}
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