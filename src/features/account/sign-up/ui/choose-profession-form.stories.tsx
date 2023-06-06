import type { Meta, StoryObj } from 'storybook-solidjs';
import { ChooseProfessionForm } from './choose-profession-form';
import { withDarkMode } from '@/shared/storybook/decorators';
import { Button } from '@/shared/ui';


const meta = {
  title: 'Features/Account/Sign Up/Choose Profession Form',
  component: ChooseProfessionForm,
  tags: ['autodocs'],
  argTypes: {
    initialValues: {
      description: 'The initial values of the form',
      control: 'object',
    },
    onSubmit: {
      description: 'The function to call when the form is submitted',
      action: 'submit'
    },
    children: {
      description: 'Rendered at the end of the form, useful for adding a submit button',
      control: 'none'
    }
  },
  args: {
    children: <Button type="submit">Submit</Button>
  }
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