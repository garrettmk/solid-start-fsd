import type { Meta, StoryObj } from "storybook-solidjs";
import { Spinner, SpinnerProps } from "./spinner";
import { withDarkMode } from "@/shared/storybook";

const meta = {
  title: "Shared/UI/Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {
    size: {
      description: 'The size of the spinner',
      control: 'select',
      options: ['xs', "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"],
      defaultValue: 'md'
    },
    color: {
      description: 'The color of the spinner',
      control: 'select',
      options: [
        'blue',
        'white',
        'green',
        'red',
        'yellow',
        'pink',
      ],
      defaultValue: 'blue'
    }
  },
  args: {
    'aria-label': 'Loading',
  }
} satisfies Meta<SpinnerProps>;

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
  decorators: [withDarkMode]
};