import type { StoryObj } from 'storybook-solidjs';
import { Button } from '../buttons';
import { Tooltip } from './tooltip';
import { createTooltip } from './create-tooltip';

const meta = {
  title: 'Shared/UI/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Hello!'
  },
  render: (props) => (
    <Tooltip {...props}/>
  )
}

export const WithFloatingUI: Story = {
  args: {
    children: 'Hello!'
  },
  render: (props) => {
    const tooltip = createTooltip();

    return (
      <>
        <Button
          ref={tooltip.anchorRef}
        >
          Hover Me
        </Button>
        <Tooltip 
          ref={tooltip.floatingRef}
          {...props}
        />
      </>
    );
  }
};