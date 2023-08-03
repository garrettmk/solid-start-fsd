import type { Meta, StoryObj } from "storybook-solidjs";
import { withDarkMode } from "@/shared/storybook";
import { UpdateUserProfileForm } from "./update-user-profile-form";


// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: "Entities/UserProfile/UserProfileForm",
  component: UpdateUserProfileForm,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof UpdateUserProfileForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
export const Primary: Story = {
  args: {},
};

export const Dark: Story = {
  ...Primary,
  parameters: {
    backgrounds: {
      default: 'dark',
    }
  },
  decorators: [
    withDarkMode
  ]
}