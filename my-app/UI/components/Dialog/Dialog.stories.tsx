import type { Meta, StoryObj } from '@storybook/react';
import { Dialog } from './Dialog';
import { Button } from '../Button/Button';
import { useState } from 'react';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    showClose: { control: 'boolean' },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof Dialog>;

const DialogTemplate: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <Dialog {...args} open={open} onClose={() => setOpen(false)} />
      </>
    );
  },
};

const DialogContent = (
  <div className="mt-4">
    <p>This is the dialog content.</p>
    <div className="mt-6 flex justify-end gap-2">
      <Button variant="ghost" onClick={() => {}}>Cancel</Button>
      <Button onClick={() => {}}>Confirm</Button>
    </div>
  </div>
);

export const Default: Story = {
  ...DialogTemplate,
  args: {
    title: 'Dialog Title',
    description: 'This is a dialog description.',
    children: DialogContent,
  },
};

export const Small: Story = { ...DialogTemplate, args: { size: 'sm', title: 'Small Dialog', description: 'This is a small dialog.', children: <p>This is the dialog content.</p> } };
export const Large: Story = { ...DialogTemplate, args: { size: 'lg', title: 'Large Dialog', description: 'This is a large dialog.', children: <p>This is the dialog content.</p> } };
export const ExtraLarge: Story = { ...DialogTemplate, args: { size: 'xl', title: 'Extra Large Dialog', description: 'This is an extra large dialog.', children: <p>This is the dialog content.</p> } };
export const WithoutClose: Story = { ...DialogTemplate, args: { title: 'Dialog Without Close Button', description: 'This dialog does not have a close button.', showClose: false, children: <p>This is the dialog content.</p> } };
export const WithoutTitle: Story = { ...DialogTemplate, args: { description: 'This dialog does not have a title.', children: <p>This is the dialog content.</p> } };
export const WithoutDescription: Story = { ...DialogTemplate, args: { title: 'Dialog Without Description', children: <p>This is the dialog content.</p> } };

export const WithForm: Story = {
  ...DialogTemplate,
  args: {
    title: 'Form Dialog',
    description: 'This dialog contains a form.',
    children: (
      <form className="mt-4 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" id="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => {}}>Cancel</Button>
          <Button onClick={() => {}}>Submit</Button>
        </div>
      </form>
    ),
  },
}; 