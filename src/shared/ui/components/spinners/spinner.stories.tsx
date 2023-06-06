import type { Meta, StoryObj } from "storybook-solidjs";
import { Spinner } from "./spinner";
import { withDarkMode } from "@/shared/storybook/decorators";

const meta = {
  title: "Shared/UI/Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {
    size: {
      description: 'The size of the spinner',
      control: 'select',
      options: ["sm", "md", "lg"],
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
};

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