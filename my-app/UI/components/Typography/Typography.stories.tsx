import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A comprehensive typography component with various styles and animations.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'span', 'label', 'small', 'blockquote',
        'code', 'pre', 'kbd', 'mark', 'del', 'ins',
        'sub', 'sup', 'strong', 'em', 'u', 'i', 'b'
      ],
    },
    weight: {
      control: 'select',
      options: [
        'thin', 'extralight', 'light', 'normal',
        'medium', 'semibold', 'bold', 'extrabold', 'black'
      ],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
    },
    color: {
      control: 'select',
      options: [
        'default', 'primary', 'secondary', 'muted',
        'accent', 'success', 'warning', 'error', 'info'
      ],
    },
    animation: {
      control: 'select',
      options: [
        'none', 'fade', 'slide-up', 'slide-down',
        'slide-left', 'slide-right', 'zoom', 'bounce'
      ],
    },
    truncated: {
      control: 'select',
      options: [undefined, 1, 2, 3, 4, 5, 6],
    },
    gradient: {
      control: 'boolean',
    },
    underline: {
      control: 'boolean',
    },
    italic: {
      control: 'boolean',
    },
    uppercase: {
      control: 'boolean',
    },
    lowercase: {
      control: 'boolean',
    },
    capitalize: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

// 基础标题展示
export const Headings: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="h1" content="Heading 1" />
      <Typography variant="h2" content="Heading 2" />
      <Typography variant="h3" content="Heading 3" />
      <Typography variant="h4" content="Heading 4" />
      <Typography variant="h5" content="Heading 5" />
      <Typography variant="h6" content="Heading 6" />
    </div>
  ),
};

// 不同字重
export const Weights: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="p" weight="thin" content="Thin Weight" />
      <Typography variant="p" weight="extralight" content="Extra Light Weight" />
      <Typography variant="p" weight="light" content="Light Weight" />
      <Typography variant="p" weight="normal" content="Normal Weight" />
      <Typography variant="p" weight="medium" content="Medium Weight" />
      <Typography variant="p" weight="semibold" content="Semibold Weight" />
      <Typography variant="p" weight="bold" content="Bold Weight" />
      <Typography variant="p" weight="extrabold" content="Extra Bold Weight" />
      <Typography variant="p" weight="black" content="Black Weight" />
    </div>
  ),
};

// 不同颜色
export const Colors: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="p" color="default" content="Default Color" />
      <Typography variant="p" color="primary" content="Primary Color" />
      <Typography variant="p" color="secondary" content="Secondary Color" />
      <Typography variant="p" color="muted" content="Muted Color" />
      <Typography variant="p" color="accent" content="Accent Color" />
      <Typography variant="p" color="success" content="Success Color" />
      <Typography variant="p" color="warning" content="Warning Color" />
      <Typography variant="p" color="error" content="Error Color" />
      <Typography variant="p" color="info" content="Info Color" />
    </div>
  ),
};

// 不同对齐方式
export const Alignment: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      <Typography variant="p" align="left" content="Left Aligned Text" />
      <Typography variant="p" align="center" content="Center Aligned Text" />
      <Typography variant="p" align="right" content="Right Aligned Text" />
      <Typography 
        variant="p" 
        align="justify" 
        content="Justified Text: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />
    </div>
  ),
};

// 特殊样式
export const SpecialStyles: Story = {
  render: () => (
    <div className="space-y-4 grid grid-cols-2 gap-8">
      <Typography variant="p" gradient content="Gradient Text" />
      <Typography variant="p" underline content="Underlined Text" />
      <Typography variant="p" italic content="Italic Text" />
      <Typography variant="p" uppercase content="uppercase text" />
      <Typography variant="p" lowercase content="LOWERCASE TEXT" />
      <Typography variant="p" capitalize content="capitalized text" />
    </div>
  ),
};

// 文本截断
export const Truncation: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <Typography 
        variant="p" 
        truncated={1} 
        content="This is a very long text that will be truncated after one line. It should show an ellipsis at the end."
      />
      <Typography 
        variant="p" 
        truncated={2} 
        content="This is a very long text that will be truncated after two lines. It should show an ellipsis at the end of the second line. This is additional text to ensure we have enough content to demonstrate the truncation."
      />
      <Typography 
        variant="p" 
        truncated={3} 
        content="This is a very long text that will be truncated after three lines. It should show an ellipsis at the end of the third line. This is additional text to ensure we have enough content to demonstrate the truncation. And even more text to make sure we have three full lines."
      />
    </div>
  ),
};

// 特殊文本元素
export const SpecialElements: Story = {
  render: () => (
    <div className=" grid grid-cols-2 gap-8">
      <Typography variant="blockquote" content="This is a blockquote text" />
      <Typography variant="code" content="const greeting = 'Hello World';" />
      <Typography variant="pre" content={`function hello() {\n  console.log('Hello World');\n}`} />
      <Typography variant="kbd" content="Ctrl + C" />
      <Typography variant="mark" content="Highlighted text" />
      <Typography variant="del" content="Deleted text" />
      <Typography variant="ins" content="Inserted text" />
      <Typography variant="sub" content="Subscript text" />
      <Typography variant="sup" content="Superscript text" />
    </div>
  ),
};
