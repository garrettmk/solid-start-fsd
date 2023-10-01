import type { Meta, StoryObj } from "storybook-solidjs";
import { Pagination } from "./pagination";
import { withDarkMode } from "@/shared/storybook";
import { createSignal } from "solid-js";
import { Paginated, PaginationInput } from "@/shared/schemas";

const [paginated, setPaginated] = createSignal<Paginated>({
  offset: 0,
  limit: 10,
  total: 25,
});

const setPagination = (pagination: PaginationInput) => setPaginated(c => ({
  ...c,
  ...pagination
}));

const meta = {
  title: "Shared/UI/Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  argTypes: {
    pagination: {
      type: 'function'
    },
    onChange: {
      action: 'changed',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'select',
      options: ['none', 'light', 'dark', 'alternative', 'ghost', 'blue', 'red', 'green'],
    },
    radius: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
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
      pagination={paginated} 
      onChange={(newValue: PaginationInput) => setPagination(newValue) && props.onChange(newValue)}
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