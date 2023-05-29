import type { Meta, StoryObj } from 'storybook-solidjs';
import { ChooseProfessionForm } from './choose-profession-form';


const meta = {
  title: 'Features/Account/Sign Up/Choose Profession Form',
  component: ChooseProfessionForm,
  tags: ['autodocs'],
  argTypes: {}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
}