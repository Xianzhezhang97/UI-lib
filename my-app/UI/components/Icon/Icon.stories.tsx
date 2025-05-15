import type { Meta, StoryObj } from '@storybook/react';
import { Icons } from './Icon';

const meta = {
  title: 'Components/Icon',
  component: Icons.home,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: ['outline', 'solid', 'mini'],
    },
  },
} satisfies Meta<typeof Icons.home>;

export default meta;
type Story = StoryObj<typeof Icons.home>;

// 导航图标
export const Home: Story = {
  args: {
    size: 'md',
    variant: 'outline',
  },
  render: (args) => <Icons.home {...args} />,
};

export const Search: Story = {
  args: {
    size: 'md',
    variant: 'outline',
  },
  render: (args) => <Icons.search {...args} />,
};

export const Menu: Story = {
  args: {
    size: 'md',
    variant: 'outline',
  },
  render: (args) => <Icons.menu {...args} />,
};

// 操作图标
export const Plus: Story = {
  args: {
    size: 'md',
    variant: 'outline',
  },
  render: (args) => <Icons.plus {...args} />,
};

export const Close: Story = {
  args: {
    size: 'md',
    variant: 'outline',
  },
  render: (args) => <Icons.close {...args} />,
};

export const Check: Story = {
  args: {
    size: 'md',
    variant: 'outline',
  },
  render: (args) => <Icons.check {...args} />,
};

// 社交图标
export const Heart: Story = {
  args: {
    size: 'md',
    variant: 'outline',
  },
  render: (args) => <Icons.heart {...args} />,
};

export const Share: Story = {
  args: {
    size: 'md',
    variant: 'outline',
  },
  render: (args) => <Icons.share {...args} />,
};

export const Comment: Story = {
  args: {
    size: 'md',
    variant: 'outline',
  },
  render: (args) => <Icons.comment {...args} />,
};

// 媒体图标
export const Image: Story = {
  args: {
    size: 'md',
    variant: 'outline',
  },
  render: (args) => <Icons.image {...args} />,
};

export const Video: Story = {
  args: {
    size: 'md',
    variant: 'outline',
  },
  render: (args) => <Icons.video {...args} />,
};

export const Music: Story = {
  args: {
    size: 'md',
    variant: 'outline',
  },
  render: (args) => <Icons.music {...args} />,
};

// 展示所有图标
export const AllIcons: Story = {
  render: () => (
    <div className='grid grid-cols-4 gap-4 p-4'>
      {Object.entries(Icons).map(([name, Icon]) => (
        <div
          key={name}
          className='flex flex-col items-center gap-2'
        >
          <Icon size='lg' />
          <span className='text-sm text-gray-500'>{name}</span>
        </div>
      ))}
    </div>
  ),
};
