import type { Meta, StoryObj } from "storybook-solidjs";
import { withDarkMode } from "@/shared/storybook";
import { TableContainer } from "./table-container";
import { Table } from "./table";
import { ColumnDef } from "@tanstack/solid-table";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  created: string;
}

// Give me ten users like this:
const users: User[] = [
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
]




const meta = {
  title: "Shared/UI/Components/Table",
  component: Table,
  tags: ["autodocs"],
  argTypes: {

  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: (props) => (
    <TableContainer>
      <Table {...props} columns={columns} data={users} />
    </TableContainer>
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