import { Meta, StoryObj } from "storybook-solidjs";
import { NotificationData } from "./notification";
import { withDarkMode } from "@/shared/storybook";

const meta = {
  title: "Shared/UI/Components/Notification",
  component: Notification,
  tags: ["autodocs"],
  argTypes: {
    dismissable: {
      description: 'Whether the notification can be dismissed',
      control: 'boolean',
      defaultValue: true
    }
  },
  args: {},
  parameters: {}
} satisfies Meta<typeof Notification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
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