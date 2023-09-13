import type { Meta, StoryObj } from "storybook-solidjs";
import { Pagination } from "./pagination";
import { withDarkMode } from "@/shared/storybook";
import { createSignal } from "solid-js";
import { Paginated } from "@/shared/schemas";

const [value, setValue] = createSignal<Paginated>({
  offset: 0,
  limit: 10,
  total: 25,
});

const meta = {
  title: "Shared/UI/Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  argTypes: {
    value: {
      type: 'function'
    },
    onChange: {
      action: 'changed',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    }
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: props => (
    <Pagination 
      {...props} 
      value={value} 
      onChange={(newValue: Paginated) => setValue(newValue) && props.onChange(newValue)}
    />
  ),
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