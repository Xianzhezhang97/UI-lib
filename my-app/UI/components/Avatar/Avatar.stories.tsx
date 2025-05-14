import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    status: { control: 'select', options: ['online', 'offline', 'away', 'busy'] },
    bordered: { control: 'boolean' },
    ring: { control: 'boolean' },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = { args: { name: 'John Doe' } };
export const WithImage: Story = { args: { src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', alt: 'John Doe' } };
export const Small: Story = { args: { name: 'John Doe', size: 'sm' } };
export const Large: Story = { args: { name: 'John Doe', size: 'lg' } };
export const ExtraLarge: Story = { args: { name: 'John Doe', size: 'xl' } };
export const WithStatus: Story = { args: { name: 'John Doe', status: 'online' } };
export const WithBordered: Story = { args: { name: 'John Doe', bordered: true } };
export const WithRing: Story = { args: { name: 'John Doe', ring: true } };
export const WithCustomRingColor: Story = { args: { name: 'John Doe', ring: true, ringColor: 'ring-blue-500' } };
export const AllStatuses: Story = {
  render: () => (
    <div className="flex gap-4">
      <Avatar name="Online" status="online" />
      <Avatar name="Offline" status="offline" />
      <Avatar name="Away" status="away" />
      <Avatar name="Busy" status="busy" />
    </div>
  ),
}; 