import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';
import { PlusIcon } from '@heroicons/react/24/outline';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultOpen: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    title: 'Accordion Title',
    children: 'This is the accordion content.',
  },
};

export const DefaultOpen: Story = {
  args: {
    title: 'Default Open Accordion',
    defaultOpen: true,
    children: 'This accordion is open by default.',
  },
};

export const Disabled: Story = {
  args: {
    title: 'Disabled Accordion',
    disabled: true,
    children: 'This accordion is disabled.',
  },
};

export const WithCustomIcon: Story = {
  args: {
    title: 'Custom Icon Accordion',
    icon: <PlusIcon className="h-5 w-5" />,
    children: 'This accordion has a custom icon.',
  },
};

export const WithLongContent: Story = {
  args: {
    title: 'Long Content Accordion',
    children: (
      <div className="space-y-4">
        <p>This is a paragraph of text.</p>
        <p>This is another paragraph of text.</p>
        <p>This is a third paragraph of text.</p>
      </div>
    ),
  },
}; 