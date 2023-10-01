import { withDarkMode } from "@/shared/storybook";
import { ColumnDef } from "@tanstack/solid-table";
import type { Meta, StoryObj } from "storybook-solidjs";
import { createTable } from "../../helpers";
import { Table } from "./table";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  created: string;
}

// Give me ten users like this:
const data: User[] = [
  {
    id: 1,
    name: "Jane Cooper",
    email: "jane@coop.com",
    role: "Owner",
    status: "Active",
    created: "Jan 7, 2020",
  },
  {
    id: 2,
    name: "Cody Fisher",
    email: "cody@fish.com",
    role: "Member",
    status: "Active",
    created: "Jan 7, 2020",
  },
  {
    id: 3,
    name: "Esther Howard",
    email: "esther@howard.com",
    role: "Member",
    status: "Active",
    created: "Jan 7, 2020",
  }
];

const columns: ColumnDef<User>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Role",
    accessorKey: "role",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
  {
    header: "Created",
    accessorKey: "created",
  }
];

const meta = {
  title: "Shared/UI/Components/Table",
  component: Table,
  tags: ["autodocs"],
  argTypes: {
    table: {
      description: 'The table instance to render',
    },
    expandedComponent: {
      description: 'The component to render when a row is expanded',
    },
    size: {
      description: 'The size of the table',
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl']
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: (props) => {
    const table = createTable({ data, columns });

    return (
        <Table {...props} table={table}/>
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