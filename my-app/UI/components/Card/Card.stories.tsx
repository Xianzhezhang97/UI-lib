import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'centered' },
  tags: [ 'autodocs' ],
  argTypes: {
    variant: { control: 'select', options: [ 'primary', 'secondary', 'tertiary' ] },
    size: { control: 'select', options: [ 'sm', 'md', 'lg', 'xl' ] },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

const DefaultCardContent = (
  <>
    <p>This is the card content. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
  </>
);

export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80',
    width: '200px',
    alt: 'image',
    imagePosition: 'bottom',
    // imageRatio: '1/1',
    children: (
      <>
        { DefaultCardContent }

      </>
    ),
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: DefaultCardContent,
    className: 'flex flex-col max-w-sm',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: DefaultCardContent,
    className: 'flex flex-col max-w-sm',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: DefaultCardContent,
    className: 'flex flex-col max-w-sm',
  },
};

export const Smallsize: Story = {
  args: {
    size: 'sm',
    variant: 'primary',
    children: DefaultCardContent,
    className: 'flex flex-col max-w-sm',
  },
};

export const Largesize: Story = {
  args: {
    size: 'lg',
    variant: 'primary',
    children: DefaultCardContent,
    className: 'flex flex-col max-w-sm',
  },
};

export const WithImage: Story = {
  args: {
    size: 'md',
    variant: 'primary',
    width: '200px',

    className: 'flex flex-col max-w-sm',
    children: (
      <>
        <img
          src='https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80'
          alt='Card cover'
          className='h-48 w-full rounded-t-lg object-cover'
        />
        <div className='p-4'>{ DefaultCardContent }</div>
      </>
    ),
  },
};
