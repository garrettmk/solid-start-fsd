import type { Meta, StoryObj } from "storybook-solidjs";
import { Overlay } from "./overlay";

const meta = {
  title: "Shared/UI/Components/Overlay",
  component: Overlay,
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      description: 'Whether the overlay is open',
      control: 'boolean',
    },
    position: {
      description: 'The positioning strategy for the overlay',
      control: 'radio',
      options: ["fixed", "absolute"],
    }
  },
  args: {
    isOpen: true,
  },
  parameters: {
    layout: 'padded',
    docs: {
      story: {
        inline: false,    // For some reason, this prevents the arg controls from working
      }
    }
  },
  decorators: [
    Story => (
      <>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          consectetur, velit eu aliquam lacinia, nisl nunc aliquet nunc, vitae
          aliquam nisl nunc vitae nisl. Donec euismod, nisl eget ultricies
          aliquam, nisl nunc aliquet nunc, vitae aliquam nisl nunc vitae nisl.
        </p>
        <Story />
      </>
    )
  ]
} satisfies Meta<typeof Overlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};