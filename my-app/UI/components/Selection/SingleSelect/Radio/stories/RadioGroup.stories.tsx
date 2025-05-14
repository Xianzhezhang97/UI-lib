import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from '../RadioGroup';

const meta = {
  title: 'Selection/SingleSelect/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

export const Default: Story = {
  args: {
    options,
    label: 'Select an option',
  },
};

export const WithValue: Story = {
  args: {
    options,
    value: '2',
    label: 'Select an option',
  },
};

export const WithHelperText: Story = {
  args: {
    options,
    label: 'Select an option',
    helperText: 'This is a helper text',
  },
};

export const WithError: Story = {
  args: {
    options,
    label: 'Select an option',
    error: 'This field is required',
  },
};

export const Horizontal: Story = {
  args: {
    options,
    label: 'Select an option',
    orientation: 'horizontal',
  },
};

export const Small: Story = {
  args: {
    options,
    label: 'Select an option',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    options,
    label: 'Select an option',
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    options,
    label: 'Select an option',
    disabled: true,
  },
};

export const WithOptionHelperText: Story = {
  args: {
    options: [
      { label: 'Option 1', value: '1', helperText: 'This is option 1' },
      { label: 'Option 2', value: '2', helperText: 'This is option 2' },
      { label: 'Option 3', value: '3', helperText: 'This is option 3' },
    ],
    label: 'Select an option',
  },
}; 