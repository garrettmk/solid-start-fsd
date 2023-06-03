import type { Meta, StoryObj } from "storybook-solidjs";
import { Drawer, DrawerProps } from "./drawer";
import { createToggle } from "../../helpers";
import { Button } from "../buttons";

function DrawerWithCloseButton(props: DrawerProps) {
  const isOpen = createToggle(props.isOpen);

  return (
    <>
      <Button class="mx-auto" onClick={isOpen.on}>Open</Button>
      <Drawer {...props} class="flex items-center justify-center" isOpen={isOpen.value}>
        <Button onClick={isOpen.off}>
          Close
        </Button>
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
    backdrop: {
      description: 'Obscures the content under the drawer',
      control: 'boolean',
      defaultValue: { summary: false },
    }
  },
  args: {
    isOpen: false,
    placement: 'left',
    backdrop: false,
  }
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (props) => <DrawerWithCloseButton {...props} />
};