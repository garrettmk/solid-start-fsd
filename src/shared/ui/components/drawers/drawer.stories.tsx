import type { Meta, StoryObj } from "storybook-solidjs";
import { Drawer, DrawerProps } from "./drawer";
import { createToggle } from "../../helpers";
import { Button } from "../buttons";
import { withDarkMode } from "@/shared/storybook";

function DrawerWithCloseButton(props: DrawerProps) {
  const isOpen = createToggle(props.isOpen);

  return (
    <>
      <Button class="mx-auto" onClick={isOpen.toggle}>Toggle</Button>
      <Drawer {...props} class="flex items-center justify-center" isOpen={isOpen.value}>
      </Drawer>
    </>
  )
}

const meta = {
  title: "Shared/UI/Components/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  argTypes: {
    children: {
      description: 'The drawer content',
    },
    isOpen: {
      description: 'Whether the drawer is open or closed',
      control: 'none',
      defaultValue: { summary: false },
    },
    placement: {
      description: 'The edge the drawer will be attached to',
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      defaultValue: { summary: 'left' },
    },
    size: {
      description: 'The size of the drawer',
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
      defaultValue: { summary: 'md' },
    },
  },
  args: {
    isOpen: false,
    placement: 'left',
    size: 'md'
  }
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (props) => <DrawerWithCloseButton {...props} />
};

export const Dark: Story = {
  render: (props) => <DrawerWithCloseButton {...props} />,
  parameters: {
    backgrounds: {
      default: 'dark',
    }
  },
  decorators: [
    withDarkMode
  ]
}