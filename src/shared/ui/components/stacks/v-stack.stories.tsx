import type { Meta, StoryObj } from "storybook-solidjs";
import { VStack } from "./v-stack";
import { For } from "solid-js";

const meta = {
  title: "Shared/UI/Components/VStack",
  component: VStack,
  tags: ["autodocs"],
  argTypes: {
    spacing: {
      description: 'The spacing between the children',
      control: 'select',
      options: ["none", "xs", "sm", "md", "lg", "xl", "overlap"],
    },
    align: {
      description: 'The alignment of the children',
      control: 'select',
      options: ["start", "center", "end", "stretch"],
    },
    justify: {
      description: 'The justification of the children',
      control: 'select',
      options: ["start", "end", "center", "between", "around", "evenly"],
    },
    as: {
      description: 'The element type to render',
      defaultValue: 'div'
    }
  },
  args: {
    children: (
      <For each={[1, 2, 3, 4, 5, 6, 7, 8, 9]}>
        {(i) => (
          <div class="h-8 bg-blue-500 text-white rounded-md border border-blue-200">
            {i}
            <div style={`width: ${i}rem`} />
          </div>
        )}
      </For>
    )
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};