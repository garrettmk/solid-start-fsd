import type { StoryObj } from "storybook-solidjs";
import { Heading } from "./heading";
import { withDarkMode } from "@/shared/storybook/decorators";

const meta = {
  title: "Shared/UI/Components/Heading",
  component: Heading,
  tags: ["autodocs"],
  argTypes: {
    children: {
      description: 'The heading text',
      control: 'text',
    },
    level: {
      description: 'The semantic heading level. Use the `class` prop to set the text size.',
      type: 'number',
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
    }
  },
  args: {
    children: 'I am a heading',
    level: 1
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