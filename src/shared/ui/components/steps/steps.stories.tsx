import type { Meta, StoryObj } from "storybook-solidjs";
import { Steps, Step } from "./steps";
import { For } from "solid-js";
import { IndexProvider } from "../../contexts";
import { Button, ButtonNext, ButtonPrev } from "../buttons";
import { HStack } from "../stacks";
import { withDarkMode } from "@/shared/storybook/decorators";

const meta = {
  title: "Shared/UI/Components/Steps",
  component: Steps,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Steps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: props => (
    <div class="inline-block">
      <IndexProvider initial={{ max: 3, value: 1 }}>
        <Steps {...props}>
          <Step index={0}>Step 1</Step>
          <Step index={1}>Step 2</Step>
          <Step index={2}>Step 3</Step>
        </Steps>
        <HStack justify="around" class="mt-3">
          <ButtonPrev>
            Prev
          </ButtonPrev>
          <ButtonNext>
            Next
          </ButtonNext>
        </HStack>
      </IndexProvider>
    </div>
  )
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