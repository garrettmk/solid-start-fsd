import type { Meta, StoryObj } from "storybook-solidjs";
import { Progress } from "./progress";
import { createEffect, createSignal } from "solid-js";

const meta = {
  title: "Shared/UI/Components/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {
    size: {
      description: 'The size of the progress bar',
      control: 'select',
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    value: {
      description: 'The value of the progress bar',
      control: 'number',
      min: 0,
      max: 100
    },
    background: {
      description: 'The background color of the progress bar',
      control: 'radio',
      options: ['none', 'default']
    }
  },
  args: {
    'aria-label': 'Progress bar',
    value: 75,
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export const Dark: Story = {
  parameters: {
    backgrounds: {
      default: 'dark'
    },
    theming: {
      themeOverride: 'dark'
    }
  },
};

export const Motion: Story = {
  name: 'With Motion',
  render: props => {
    const [value, setValue] = createSignal(0);

    createEffect(() => {
      const interval = setInterval(() => {
        setValue((value() + Math.random() * 100) % 100);
      }, 2000);
      return () => clearInterval(interval);
    });

    return (
      <Progress {...props} value={value()} />
    );
  }
};