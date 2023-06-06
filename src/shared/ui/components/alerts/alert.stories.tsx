import type { Meta, StoryObj } from "storybook-solidjs";
import { Alert } from './alert';
import { withDarkMode } from "@/shared/storybook/decorators";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: "Shared/UI/Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    color: {
      description: 'The color of the alert',
      control: "select",
      options: ['blue', 'red', 'green'],
      defaultValue: 'blue',
    }
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
export const Primary: Story = {
  args: {
    children: "Something has happened!",
  },
};

export const Blue: Story = {
  args: {
    ...Primary.args,
    color: "blue",
  },
};

export const BlueDark: Story = {
  args: {
    ...Primary.args,
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    }
  },
  decorators: [withDarkMode]
};

export const Red: Story = {
  args: {
    ...Primary.args,
    color: "red",
  },
};

export const RedDark: Story = {
  args: {
    ...Primary.args,
    color: 'red',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    }
  },
  decorators: [withDarkMode]
};

export const Green: Story = {
  args: {
    ...Primary.args,
    color: "green",
  },
};

export const GreenDark: Story = {
  args: {
    ...Primary.args,
    color: 'green',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    }
  },
  decorators: [withDarkMode]
}