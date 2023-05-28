import type { Meta, StoryObj } from 'storybook-solidjs';
import { SessionAvatar } from './session-avatar';

const meta = {
  title: 'Widgets/Session/SessionAvatar',
  component: SessionAvatar,
  tags: ['autodocs'],
  argTypes: {}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
}