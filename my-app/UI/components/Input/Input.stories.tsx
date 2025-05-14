import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '~/components/Input/Input';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outline', 'filled', 'flushed'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    fullWidth: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    onChange: {
      action: 'changed',
    },
    onBlur: {
      action: 'blurred',
    },
    onFocus: {
      action: 'focused',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Label',
    placeholder: 'Enter text...',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Label',
    placeholder: 'Enter text...',
    helperText: 'This is a helper text',
  },
};

export const WithError: Story = {
  args: {
    label: 'Label',
    placeholder: 'Enter text...',
    error: 'This field is required',
  },
};

export const WithLeftIcon: Story = {
  args: {
    placeholder: 'Search...',
    leftElement: <MagnifyingGlassIcon className="h-5 w-5" />,
  },
};

export const WithRightIcon: Story = {
  args: {
    placeholder: 'Clear input',
    rightElement: <XMarkIcon className="h-5 w-5" />,
  },
};

export const WithBothIcons: Story = {
  args: {
    placeholder: 'Search...',
    leftElement: <MagnifyingGlassIcon className="h-5 w-5" />,
    rightElement: <XMarkIcon className="h-5 w-5" />,
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    placeholder: 'Enter text...',
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    placeholder: 'Enter text...',
  },
};

export const Flushed: Story = {
  args: {
    variant: 'flushed',
    placeholder: 'Enter text...',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    placeholder: 'Enter text...',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    placeholder: 'Enter text...',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    placeholder: 'Enter text...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Enter text...',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    placeholder: 'Enter text...',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Label',
    value: 'Hello World',
    placeholder: 'Enter text...',
  },
};

export const WithValueAndChangeHandler: Story = {
  args: {
    label: 'Label',
    value: 'Hello World',
    placeholder: 'Enter text...',
    onChange: (value) => console.log('Input value changed:', value),
  },
}; 