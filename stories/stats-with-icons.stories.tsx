import type { Meta, StoryObj } from '@storybook/react';

import { StatsWithIcon } from '../components/blocks/stats';
import { Store } from 'lucide-react';

const meta: Meta<typeof StatsWithIcon> = {
  component: StatsWithIcon,
  decorators: (Comp) => (
    <div className="grid grid-cols-3 gap-2.5">
      <Comp />
      <Comp />
      <Comp />
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof StatsWithIcon>;

export const Default: Story = {
  args: {
    title: '$7,820.75',
    labelDescription: 'In-store sales',
    icon: Store,
    footer: '5k Orders',
  },
};

export const NoLabel: Story = {
  args: {
    title: '$7,820.75',
    icon: Store,
    footer: '5k Orders',
  },
};

export const NoIcon: Story = {
  args: {
    labelDescription: 'In-store sales',
    title: '$7,820.75',
    footer: '5k Orders',
  },
};

export const NoFooter: Story = {
  args: {
    labelDescription: 'In-store sales',
    title: '$7,820.75',
  },
};
