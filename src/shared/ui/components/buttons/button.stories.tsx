import type { Meta, StoryObj } from "storybook-solidjs";
import { Button } from "./button";
import { AppIcon } from "../icons";
import { withDarkMode } from "@/shared/storybook/decorators";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: "Shared/UI/Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    children: {
      description: 'The button content',
      control: 'text',
    },
    color: {
      description: 'The color of the button',
      control: 'select',
      options: ['none', 'light', 'dark', 'alternative', 'ghost', 'blue', 'red', 'green'],
      defaultValue: { summary: 'blue' },
    },
    size: {
      description: 'The size of the button',
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      defaultValue: { summary: 'md' },
    },
    description: {
      description: 'The description of the button (for screen readers)',
      control: 'text',
    },
    icon: {
      description: 'Whether the button is an icon-only button',
      control: 'boolean',
      defaultValue: { summary: false },
    },
    disabled: {
      description: 'Whether the button is disabled',
      control: 'boolean',
      defaultValue: { summary: false },
    },
    type: {
      description: 'The type of the button',
      control: 'select',
      options: ['button', 'submit', 'reset'],
      defaultValue: 'button'
    }
  },
  args: {
    size: 'md',
    color: 'blue',
    children: 'Button',
    description: 'Click me',
    icon: false,
    disabled: false,
    type: 'button',
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
export const Primary: Story = {
  render: (props) => <Button {...props} />
};

export const Sizes: Story = {
  render: (props) => (
    <div class="flex gap-5 items-center">
      <Button {...props} size="xs" />
      <Button {...props} size="sm" />
      <Button {...props} size="md" />
      <Button {...props} size="lg" />
      <Button {...props} size="xl" />
      <Button {...props} size="2xl" />
      <Button {...props} size="3xl" />
      <Button {...props} size="4xl" />
    </div>
  )
};

export const Colors: Story = {
  render: (props) => (
    <div class="flex gap-5 items-center">
      <Button {...props} color="light" />
      <Button {...props} color="dark" />
      <Button {...props} color="alternative" />
      <Button {...props} color="ghost" />
      <Button {...props} color="blue" />
      <Button {...props} color="red" />
      <Button {...props} color="green" />
    </div>
  )
};

export const Dark: Story = {
  parameters: {
    backgrounds: {
      default: 'dark',
    }
  },
  decorators: [withDarkMode],
  render: (props) => (
    <div class="flex gap-5 items-center">
      <Button {...props} color="light" />
      <Button {...props} color="dark" />
      <Button {...props} color="alternative" />
      <Button {...props} color="ghost" />
      <Button {...props} color="blue" />
      <Button {...props} color="red" />
      <Button {...props} color="green" />
    </div>
  )
};

export const Icon: Story = {
  render: (props) => (
    <div class="flex gap-5 items-center">
      <Button {...props} icon={true} size='xs'>
        <AppIcon size='xs' />
      </Button>
      <Button {...props} icon={true} size='sm'>
        <AppIcon size='sm' />
      </Button>
      <Button {...props} icon={true} size='md'>
        <AppIcon size='md' />
      </Button>
      <Button {...props} icon={true} size='lg'>
        <AppIcon size='lg' />
      </Button>
      <Button {...props} icon={true} size='xl'>
        <AppIcon size='xl' />
      </Button>
      <Button {...props} icon={true} size='2xl'>
        <AppIcon size='2xl' />
      </Button>
      <Button {...props} icon={true} size='3xl'>
        <AppIcon size='3xl' />
      </Button>
      <Button {...props} icon={true} size='4xl'>
        <AppIcon size='4xl' />
      </Button>
    </div>
  )
}
