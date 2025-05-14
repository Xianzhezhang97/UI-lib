import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    rounded: { control: 'boolean' },
    dot: { control: 'boolean' },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof Badge>;

export const Primary: Story = { args: { children: 'Badge', variant: 'primary' } };
export const Secondary: Story = { args: { children: 'Badge', variant: 'secondary' } };
export const Success: Story = { args: { children: 'Badge', variant: 'success' } };
export const Danger: Story = { args: { children: 'Badge', variant: 'danger' } };
export const Warning: Story = { args: { children: 'Badge', variant: 'warning' } };
export const Info: Story = { args: { children: 'Badge', variant: 'info' } };
export const Small: Story = { args: { children: 'Badge', size: 'sm' } };
export const Large: Story = { args: { children: 'Badge', size: 'lg' } };
export const Rounded: Story = { args: { children: 'Badge', rounded: true } };
export const WithDot: Story = { args: { children: 'Badge', dot: true } };

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
}; 