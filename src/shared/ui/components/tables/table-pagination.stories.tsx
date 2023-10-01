import { withDarkMode } from "@/shared/storybook";
import type { Meta, StoryObj } from "storybook-solidjs";
import { createPaginatedResult, createPaginationInput } from "../../helpers";
import { TablePagination } from "./table-pagination";
import { createEffect } from "solid-js";


const meta = {
  title: "Shared/UI/Components/TablePagination",
  component: TablePagination,
  tags: ["autodocs"],
  argTypes: {
    perPageOptions: {
      description: 'The options to display in the per page menu',
    },
    pagination: {
      description: 'The pagination object',
    },
  },
} satisfies Meta<typeof TablePagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: (props) => {
    const [pagination, setPagination] = createPaginationInput();
    const [paginated, setPaginated] = createPaginatedResult({ total: 100 });

    createEffect(() => {
      setPaginated({
        ...pagination(),
        total: 100
      })
    })

    return (
        <TablePagination {...props} pagination={paginated} onChange={setPagination}/>
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