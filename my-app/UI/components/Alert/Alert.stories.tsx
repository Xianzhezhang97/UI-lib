import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';
import { BellIcon } from '@heroicons/react/24/outline';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      story: {
        inline: true,
        iframeHeight: '100px',
      },
    },
    grid: {
      gridOn: true,
      columns: 2,
      gap: '16px',
      padding: '16px',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
    closable: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: {
    title: 'Information',
    description: 'This is an informational message.',
    variant: 'info',
  },
};

export const Success: Story = {
  args: {
    title: 'Success',
    description: 'Your changes have been saved successfully.',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    title: 'Warning',
    description: 'Please review your changes before proceeding.',
    variant: 'warning',
  },
};

export const Error: Story = {
  args: {
    title: 'Error',
    description: 'Something went wrong. Please try again.',
    variant: 'error',
  },
};

export const WithCustomIcon: Story = {
  args: {
    title: 'Notification',
    description: 'You have a new notification.',
    icon: <BellIcon className="h-5 w-5" />,
  },
};

export const Closable: Story = {
  args: {
    title: 'Closable Alert',
    description: 'This alert can be closed.',
    closable: true,
  },
};

export const TitleOnly: Story = {
  args: {
    title: 'Alert with title only',
  },
};

export const DescriptionOnly: Story = {
  args: {
    description: 'Alert with description only',
  },
}; 