import { Meta, StoryObj } from "storybook-solidjs";
import { withDarkMode } from "@/shared/storybook";
import { Notification } from "./notification";

const meta = {
  title: "Shared/UI/Components/Notification",
  component: Notification,
  tags: ["autodocs"],
  argTypes: {
    onClose: {
      description: 'A callback for dismissing the notification',
      action: 'close'
    },
    type: {
      description: 'The type of icon shown on the notification',
      control: 'select',
      options: ['info', 'loading', 'warning', 'error', 'success']
    },
    dismissable: {
      description: 'Whether the notification shows a close button',
      control: 'boolean'
    },
    timeout: {
      description: 'How long before the notification dismisses itself',
      control: 'number',
    },
    message: {
      description: 'The content shown on the notification',
      control: 'text'
    },
    body: {
      description: 'The content shown when the notification is expanded',
      control: 'text'
    }
  },
  args: {},
  parameters: {}
} satisfies Meta<typeof Notification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: 'info',
    message: "Here's a notification...",
    body: "...with some extra content.",
    dismissable: false,
    timeout: 5000
  },
};

export const Dark: Story = {
  ...Primary,
  parameters: {
    backgrounds: {
      default: 'dark',
    }
  },
  decorators: [withDarkMode],
};