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
  },
}

export const Initials: Story = {
  args: {
    ...Default.args,
    initials: "GM"
  },

  render: (props) => (
    <div class="flex gap-5 items-center">
      <Avatar {...props} size="xs" />
      <Avatar {...props} size="sm" />
      <Avatar {...props} size="md" />
      <Avatar {...props} size="lg" />
      <Avatar {...props} size="xl" />
      <Avatar {...props} size="2xl" />
      <Avatar {...props} size="3xl" />
      <Avatar {...props} size="4xl" />
    </div>
  )
};

const imageUrl = 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1522&q=80';

export const Image: Story = {
  args: {
    ...Default.args,
    initials: "GM"
  },

  render: (props) => (
    <div class="flex gap-5 items-center">
      <Avatar {...props} size="xs" src={imageUrl} />
      <Avatar {...props} size="sm" src={imageUrl} />
      <Avatar {...props} size="md" src={imageUrl} />
      <Avatar {...props} size="lg" src={imageUrl} />
      <Avatar {...props} size="xl" src={imageUrl} />
      <Avatar {...props} size="2xl" src={imageUrl} />
      <Avatar {...props} size="3xl" src={imageUrl} />
      <Avatar {...props} size="4xl" src={imageUrl} />
    </div>
  )
};

export const Rectangle: Story = {
  args: {
    ...Default.args,
    initials: "GM"
  },

  render: (props) => (
    <div class="flex gap-5 items-center">
      <Avatar {...props} size="xs" shape="square" />
      <Avatar {...props} size="sm" shape="square" />
      <Avatar {...props} size="md" shape="square" />
      <Avatar {...props} size="lg" shape="square" />
      <Avatar {...props} size="xl" shape="square" />
      <Avatar {...props} size="2xl" shape="square" />
      <Avatar {...props} size="3xl" shape="square" />
      <Avatar {...props} size="4xl" shape="square" />
    </div>
  )
};

export const Colors: Story = {
  args: {
    class: 'bg-blue-500 text-white',
  },
};