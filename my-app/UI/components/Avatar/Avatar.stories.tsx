import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    status: {
      control: 'select',
      options: ['online', 'offline', 'away', 'busy'],
    },
    bordered: { control: 'boolean' },
    ring: { control: 'boolean' },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = { args: { name: 'Scott Cheung' } };
export const WithImage: Story = {
  args: {
    src: 'https://img.picgo.net/2025/05/01/profile67e8aecd6a789289.png',
    alt: 'Scott Cheung',
  },
};
export const Small: Story = { args: { name: 'Scott Cheung', size: 'sm' } };
export const Large: Story = { args: { name: 'Scott Cheung', size: 'lg' } };
export const ExtraLarge: Story = { args: { name: 'Scott Cheung', size: 'xl' } };
export const WithStatus: Story = {
  args: { name: 'Scott Cheung', status: 'online' },
};
export const WithBordered: Story = {
  args: { name: 'Scott Cheung', bordered: true },
};
export const WithRing: Story = { args: { name: 'Scott Cheung', ring: true } };
export const WithCustomRingColor: Story = {
  args: { name: 'Scott Cheung', ring: true, ringColor: 'ring-blue-500' },
};
export const AllStatuses: Story = {
  render: () => (
    <div className='flex gap-4'>
      <Avatar
        name='Online'
        status='online'
      />
      <Avatar
        name='Offline'
        status='offline'
      />
      <Avatar
        name='Away'
        status='away'
      />
      <Avatar
        name='Busy'
        status='busy'
      />
    </div>
  ),
};
