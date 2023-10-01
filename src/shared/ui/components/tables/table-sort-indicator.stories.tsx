import { withDarkMode } from "@/shared/storybook";
import type { Meta, StoryObj } from "storybook-solidjs";
import { TableSortIndicator } from "./table-sort-indicator";


const meta = {
  title: "Shared/UI/Components/TableSortIndicator",
  component: TableSortIndicator,
  tags: ["autodocs"],
  argTypes: {
    direction: {
      description: 'The sort direction',
      control: 'select',
      options: [false, 'asc', 'desc'],
    },
    size: {
      description: 'The size of the icon',
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl']
    }
  },
  args: {
    direction: 'asc',
  }
} satisfies Meta<typeof TableSortIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: (props) => {
    return (
        <TableSortIndicator {...props}/>
    );
  },
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