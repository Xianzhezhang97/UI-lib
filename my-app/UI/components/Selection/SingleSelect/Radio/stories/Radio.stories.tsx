import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from '../Radio';

const meta = {
  title: 'Selection/SingleSelect/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Option 1',
  },
};

export const Checked: Story = {
  args: {
    ...Default.args,
    checked: true,
  },
};

export const WithHelperText: Story = {
  args: {
    ...Default.args,
    helperText: 'This is the first option',
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: 'Please select an option',
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    ...Default.args,
    disabled: true,
    checked: true,
  },
};

export const CardVariant: Story = {
  args: {
    ...Default.args,
    variant: 'card',
  },
}; 