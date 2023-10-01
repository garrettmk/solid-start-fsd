import { withDarkMode } from "@/shared/storybook";
import type { Meta, StoryObj } from "storybook-solidjs";
import { TableContainer } from "./table-container";


const meta = {
  title: "Shared/UI/Components/TableContainer",
  component: TableContainer,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TableContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: (props) => {
    return (
        <TableContainer {...props}>
          I'm a table container
        </TableContainer>
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