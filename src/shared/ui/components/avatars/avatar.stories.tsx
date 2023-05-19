import type { Meta, StoryObj } from "storybook-solidjs";
import { Avatar } from "./avatar";

const meta = {
  title: "Shared/UI/Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    src: {
      description: 'The image source URL',
      control: "text"
    },
    initials: {
      description: 'The initials to display when no image is provided',
      control: "text"
    },
    size: {
      description: 'The size of the avatar',
      control: "select",
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
    },
    shape: {
      description: 'The shape of the avatar',
      control: "select",
      options: ['round', 'square'],
    },
    class: {
      description: 'Additional classes',
      control: "text"
    },
  }
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: '',
    initials: '',
    size: 'md',
    shape: 'round',
  }
}

export const Initials: Story = {
  args: {
    ...Default.args,
    initials: "GM"
  }
};