import type { StoryObj } from "storybook-solidjs";
import { Code } from './code';
import { withDarkMode } from "@/shared/storybook/decorators";

const meta = {
  title: "Shared/UI/Components/Code",
  component: Code,
  tags: ["autodocs"],
  argTypes: {
    children: {
      description: 'The code to display',
      control: 'text',
    }
  },
  args: {
    children: JSON.stringify({
      "name": "John Doe",
      "age": 30,
      "cars": [
        {
          "name": "Ford",
          "models": ["Fiesta", "Focus", "Mustang"]
        },
      ]
    }, null, 2),
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