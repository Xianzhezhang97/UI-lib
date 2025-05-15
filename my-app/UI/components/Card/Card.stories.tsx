import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['elevated', 'outlined', 'filled'] },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

const DefaultCardContent = (
  <>
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
      <CardDescription>Card Description</CardDescription>
    </CardHeader>
    <CardContent>
      <p>This is the card content.</p>
    </CardContent>
  </>
);

export const Default: Story = {
  args: {
    children: (
      <>
        {DefaultCardContent}
        <CardFooter>
          <Button variant='ghost'>Cancel</Button>
          <Button variant='full'>Submit</Button>
        </CardFooter>
      </>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: DefaultCardContent,
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: DefaultCardContent,
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    children: DefaultCardContent,
  },
};

export const Smallsize: Story = {
  args: {
    size: 'sm',
    children: DefaultCardContent,
  },
};

export const Largesize: Story = {
  args: {
    size: 'lg',
    children: DefaultCardContent,
  },
};

export const WithImage: Story = {
  args: {
    size: 'md',
    children: (
      <>
        <img
          src='https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80'
          alt='Card cover'
          className='h-48 w-full rounded-t-lg object-cover'
        />
        <div className='p-4'>{DefaultCardContent}</div>
      </>
    ),
  },
};
