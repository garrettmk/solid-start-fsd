import { Meta, StoryObj } from "storybook-solidjs";
import { KPI } from "./kpi";
import { withDarkMode } from "@/shared/storybook";

const meta = {
  title: "Shared/UI/Components/KPIs/KPI",
  component: KPI,
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'The label for the KPI',
      control: 'text',
    },
    value: {
      description: 'The value for the KPI',
      control: 'number',
    },
    size: {
      description: 'The size of the KPI',
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl']
    },
    loading: {
      description: 'Whether the KPI is loading',
      control: 'boolean',
    },
  },
  args: {
    label: 'Total Users',
    value: 100,
  }
} satisfies Meta<typeof KPI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: props => (
    <KPI class="inline-flex" {...props} />
  )
};

export const Dark: Story = {
  ...Primary,
  parameters: {
    backgrounds: {
      default: 'dark',
    }
  },
  decorators: [withDarkMode],
};