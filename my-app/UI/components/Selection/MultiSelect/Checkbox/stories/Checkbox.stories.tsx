import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '~/components/Selection/MultiSelect/Checkbox/Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
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
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Remember me',
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
    helperText: 'This will keep you signed in',
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: 'You must accept the terms',
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