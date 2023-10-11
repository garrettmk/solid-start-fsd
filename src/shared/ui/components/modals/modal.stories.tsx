import { withDarkMode } from "@/shared/storybook";
import type { Meta, StoryObj } from "storybook-solidjs";
import { Modal } from "./modal";

const meta = {
  title: "Shared/UI/Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    children: {
      description: 'The drawer content',
    },
    isOpen: {
      description: 'Whether the modal is visible',
      control: 'boolean',
      defaultValue: { summary: false },
    },
    size: {
      description: 'The size of the drawer',
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
      defaultValue: { summary: 'md' },
    },
  },
  args: {
    isOpen: true,
    size: 'md',
    children: 'Modal content',
  }
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (props) => <Modal {...props} />
};

export const Dark: Story = {
  render: (props) => <Modal {...props} />,
  parameters: {
    backgrounds: {
      default: 'dark',
    }
  },
  decorators: [
    withDarkMode
  ]
}