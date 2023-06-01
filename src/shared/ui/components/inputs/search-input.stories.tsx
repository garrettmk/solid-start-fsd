import type { Meta, StoryObj } from "storybook-solidjs";
import { SearchInput } from "./search-input";

const meta = {
  title: "Shared/UI/Components/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      description: 'Shown when the input is empty',
    },
  },
  args: {
    placeholder: 'Search...',
  }
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};