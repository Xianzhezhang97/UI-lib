import { Button } from '@/UI/Components/Button/Button';
import { Card } from '@/UI/Components/Card/Card';
import { Typography } from '@/UI/Components/Typography/Typography';
import { Container } from '@/UI/Layout/Container';
import type { Meta, StoryObj } from '@storybook/react';
import { Animate } from './Animate';
import { VibrantAnimation } from './VibrantAnimation';
const meta: Meta<typeof Animate> = {
  title: 'Animate/Animate',
  component: Animate,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A wrapper component that adds animation capabilities to any component.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: [
        'fade',
        'slide-up',
        'slide-down',
        'slide-left',
        'slide-right',
        'zoom',
        'bounce',
        'flip',
        'rotate',
        'scale',
        'shake',
        'pulse',
        'wiggle',
        'none',
      ],
    },
    duration: {
      control: { type: 'number', min: 0, max: 5, step: 0.1 },
    },
    delay: {
      control: { type: 'number', min: 0, max: 5, step: 0.1 },
    },
    timing: {
      control: 'select',
      options: ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out'],
    },
    repeat: {
      control: { type: 'number', min: 0, max: 10, step: 1 },
    },
    whileHover: {
      control: 'select',
      options: [
        'fade',
        'slide-up',
        'slide-down',
        'slide-left',
        'slide-right',
        'zoom',
        'bounce',
        'flip',
        'rotate',
        'scale',
        'shake',
        'pulse',
        'wiggle',
        'none',
      ],
    },
    whileTap: {
      control: 'select',
      options: [
        'fade',
        'slide-up',
        'slide-down',
        'slide-left',
        'slide-right',
        'zoom',
        'bounce',
        'flip',
        'rotate',
        'scale',
        'shake',
        'pulse',
        'wiggle',
        'none',
      ],
    },
    whileInView: {
      control: 'select',
      options: [
        'fade',
        'slide-up',
        'slide-down',
        'slide-left',
        'slide-right',
        'zoom',
        'bounce',
        'flip',
        'rotate',
        'scale',
        'shake',
        'pulse',
        'wiggle',
        'none',
      ],
    },
    once: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Animate>;

// 基础动画展示
export const Basic: Story = {
  render: () => (
    <div className='grid grid-cols-3 gap-8'>
      <Animate type='fade'>
        <div className='p-4 bg-blue-100 rounded-lg'>
          <Typography
            variant='h5'
            content='Fade'
          />
        </div>
      </Animate>
      <Animate type='slide-up'>
        <div className='p-4 bg-green-100 rounded-lg'>
          <Typography
            variant='h5'
            content='Slide Up'
          />
        </div>
      </Animate>
      <Animate type='zoom'>
        <div className='p-4 bg-purple-100 rounded-lg'>
          <Typography
            variant='h5'
            content='Zoom'
          />
        </div>
      </Animate>
    </div>
  ),
};

// 交互动画
export const Interactive: Story = {
  render: () => (
    <div className='grid grid-cols-3 gap-8'>
      <Animate whileHover='scale'>
        <Button variant='primary'>Hover Me</Button>
      </Animate>
      <Animate whileTap='bounce'>
        <Button variant='secondary'>Tap Me</Button>
      </Animate>
      <Animate
        whileHover='wiggle'
        whileTap='shake'
      >
        <Button variant='accent'>Hover & Tap</Button>
      </Animate>
    </div>
  ),
};

// 滚动动画
export const Scroll: Story = {
  render: () => (
    <div className='space-y-32'>
      <Animate
        whileInView='slide-up'
        once
      >
        <div className='p-8 bg-blue-100 rounded-lg'>
          <Typography
            variant='h4'
            content='Scroll to see me'
          />
        </div>
      </Animate>
      <Animate
        whileInView='slide-right'
        once
      >
        <div className='p-8 bg-green-100 rounded-lg'>
          <Typography
            variant='h4'
            content='Keep scrolling'
          />
        </div>
      </Animate>
      <Animate
        whileInView='zoom'
        once
      >
        <div className='p-8 bg-purple-100 rounded-lg'>
          <Typography
            variant='h4'
            content='Almost there'
          />
        </div>
      </Animate>
    </div>
  ),
};

// 组合动画
export const Combined: Story = {
  render: () => (
    <div className='grid grid-cols-2 gap-8'>
      <Animate
        type='fade'
        whileHover='scale'
        whileTap='bounce'
        duration={0.3}
      >
        <div className='p-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white'>
          <Typography
            variant='h5'
            content='Fade + Scale + Bounce'
          />
        </div>
      </Animate>
      <Animate
        type='slide-up'
        whileHover='rotate'
        whileTap='shake'
        duration={0.3}
      >
        <div className='p-6 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg text-white'>
          <Typography
            variant='h5'
            content='Slide + Rotate + Shake'
          />
        </div>
      </Animate>
    </div>
  ),
};

// 特殊效果
export const Special: Story = {
  render: () => (
    <div className='grid grid-cols-3 gap-8'>
      <Animate type='flip'>
        <div className='p-4 bg-yellow-100 rounded-lg'>
          <Typography
            variant='h5'
            content='Flip'
          />
        </div>
      </Animate>
      <Animate type='rotate'>
        <div className='p-4 bg-red-100 rounded-lg'>
          <Typography
            variant='h5'
            content='Rotate'
          />
        </div>
      </Animate>
      <Animate
        type='pulse'
        repeat={Infinity}
      >
        <div className='p-4 bg-indigo-100 rounded-lg'>
          <Typography
            variant='h5'
            content='Pulse'
          />
        </div>
      </Animate>
    </div>
  ),
};

// 动画组件
export const AnimateComponent: Story = {
  render: () => (
    <div className='w-full flex-col gap-4 flex'>
      <Typography
        variant='h4'
        content='Vibrant Animation'
      />
      <Container
        size='md'
        className='overflow-x-auto'
      >
        <VibrantAnimation className='flex gap-4'>
          {Array.from({ length: 20 }).map((_, index) => (
            <Card
              key={index}
              variant='filled'
              className='p-8'
            >
              {index + 1}
            </Card>
          ))}
        </VibrantAnimation>
      </Container>
      <Typography
        variant='h4'
        content='Vibrant Animation'
      />
      <VibrantAnimation
        className='grid grid-cols-12 gap-4 w-full'
        renderItem={(child, index) => (
          <motion.div
            key={index}
            variants={childVariants}
            className={child.props.className}
          >
            {React.cloneElement(child, { className: '' })}
          </motion.div>
        )}
      >
        {Array.from({ length: 24 }).map((_, index) => (
          <Card
            key={index}
            variant='filled'
            className='p-8 flex justify-center items-center col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3'
          >
            {index + 1}
          </Card>
        ))}
      </VibrantAnimation>
    </div>
  ),
};
