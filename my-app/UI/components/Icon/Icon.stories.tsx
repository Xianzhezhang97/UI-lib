import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon, type IconName, type IconStyle } from './Icon';
import { Button } from '../Button/Button';
import { Alert } from '../Alert/Alert';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A collection of icons from Flaticon with different styles.',
      },
    },
  },
  argTypes: {
    name: {
      control: 'select',
      options: [
        'home', 'user', 'settings', 'notification', 'search', 'menu', 'close',
        'edit', 'delete', 'add', 'check', 'cancel', 'arrow-left', 'arrow-right',
        'arrow-up', 'arrow-down', 'star', 'heart', 'share', 'download', 'upload',
        'link', 'calendar', 'clock', 'location', 'phone', 'email', 'message',
        'camera', 'image', 'video', 'music', 'file', 'folder', 'trash'
      ],
    },
    style: {
      control: 'select',
      options: [
        'regular-rounded',
        'regular-straight',
        'solid-rounded',
        'solid-straight',
        'bold-rounded',
        'bold-straight',
        'thin-rounded',
        'thin-straight'
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'color',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

// 基础图标展示
export const Default: Story = {
  args: {
    name: 'home',
    style: 'regular-rounded',
    size: 'md',
    color: 'text-blue-500',
  },
};

// 不同尺寸
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
              <link href="https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-solid-rounded/css/uicons-solid-rounded.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-bold-rounded/css/uicons-bold-rounded.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-thin-rounded/css/uicons-thin-rounded.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-regular-straight/css/uicons-regular-straight.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-solid-straight/css/uicons-solid-straight.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-bold-straight/css/uicons-bold-straight.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-thin-straight/css/uicons-thin-straight.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-regular-filled/css/uicons-regular-filled.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-solid-filled/css/uicons-solid-filled.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-bold-filled/css/uicons-bold-filled.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-thin-filled/css/uicons-thin-filled.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-regular-duotone/css/uicons-regular-duotone.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-solid-duotone/css/uicons-solid-duotone.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-bold-duotone/css/uicons-bold-duotone.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-thin-duotone/css/uicons-thin-duotone.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-regular-line/css/uicons-regular-line.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-solid-line/css/uicons-solid-line.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-bold-line/css/uicons-bold-line.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-thin-line/css/uicons-thin-line.css" rel="stylesheet" />
        <link href="https://cdn-uicons.flaticon.com/uicons-regular-solid/css/uicons-regular-solid.css" rel="stylesheet" />
        <link href="https://cdn-uicons.flaticon.com/uicons-solid-solid/css/uicons-solid-solid.css" rel="stylesheet" />
        <link href="https://cdn-uicons.flaticon.com/uicons-bold-solid/css/uicons-bold-solid.css" rel="stylesheet" />
        <link href="https://cdn-uicons.flaticon.com/uicons-thin-solid/css/uicons-thin-solid.css" rel="stylesheet" />
      <Icon name="home" style="regular-rounded" size="sm" />
      <Icon name="home" style="regular-rounded" size="md" />
      <Icon name="home" style="regular-rounded" size="lg" />
      <Icon name="home" style="regular-rounded" size="xl" />
      <Icon name="home" style="regular-rounded" size="2xl" />
    </div>
  ),
};

// 不同颜色
export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-8">
              <link href="https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-solid-rounded/css/uicons-solid-rounded.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-bold-rounded/css/uicons-bold-rounded.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-thin-rounded/css/uicons-thin-rounded.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-regular-straight/css/uicons-regular-straight.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-solid-straight/css/uicons-solid-straight.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-bold-straight/css/uicons-bold-straight.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-thin-straight/css/uicons-thin-straight.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-regular-filled/css/uicons-regular-filled.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-solid-filled/css/uicons-solid-filled.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-bold-filled/css/uicons-bold-filled.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-thin-filled/css/uicons-thin-filled.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-regular-duotone/css/uicons-regular-duotone.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-solid-duotone/css/uicons-solid-duotone.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-bold-duotone/css/uicons-bold-duotone.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-thin-duotone/css/uicons-thin-duotone.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-regular-line/css/uicons-regular-line.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-solid-line/css/uicons-solid-line.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-bold-line/css/uicons-bold-line.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-thin-line/css/uicons-thin-line.css" rel="stylesheet" />
        <link href="https://cdn-uicons.flaticon.com/uicons-regular-solid/css/uicons-regular-solid.css" rel="stylesheet" />
        <link href="https://cdn-uicons.flaticon.com/uicons-solid-solid/css/uicons-solid-solid.css" rel="stylesheet" />
        <link href="https://cdn-uicons.flaticon.com/uicons-bold-solid/css/uicons-bold-solid.css" rel="stylesheet" />
        <link href="https://cdn-uicons.flaticon.com/uicons-thin-solid/css/uicons-thin-solid.css" rel="stylesheet" />
      <Icon name="heart" style="regular-rounded" color="text-red-500"  size="2xl"/>
      <Icon name="star" style="regular-rounded" color="text-yellow-500"  size="2xl"/>
      <Icon name="check" style="regular-rounded" color="text-green-500"  size="2xl"/>
      <Icon name="settings" style="regular-rounded" color="text-blue-500"  size="2xl" />
    </div>
  ),
};

// 不同风格
export const Styles: Story = {
  render: () => {
    const styles: IconStyle[] = [
      'regular-rounded',
      'regular-straight',
      'solid-rounded',
      'solid-straight',
      'bold-rounded',
      'bold-straight',
      'thin-rounded',
      'thin-straight'
    ];

    return (
      <div className="grid grid-cols-4 gap-4">
                <link href="https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-solid-rounded/css/uicons-solid-rounded.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-bold-rounded/css/uicons-bold-rounded.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-thin-rounded/css/uicons-thin-rounded.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-regular-straight/css/uicons-regular-straight.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-solid-straight/css/uicons-solid-straight.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-bold-straight/css/uicons-bold-straight.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-thin-straight/css/uicons-thin-straight.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-regular-filled/css/uicons-regular-filled.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-solid-filled/css/uicons-solid-filled.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-bold-filled/css/uicons-bold-filled.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-thin-filled/css/uicons-thin-filled.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-regular-duotone/css/uicons-regular-duotone.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-solid-duotone/css/uicons-solid-duotone.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-bold-duotone/css/uicons-bold-duotone.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-thin-duotone/css/uicons-thin-duotone.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-regular-line/css/uicons-regular-line.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-solid-line/css/uicons-solid-line.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-bold-line/css/uicons-bold-line.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-thin-line/css/uicons-thin-line.css" rel="stylesheet" />
        <link href="https://cdn-uicons.flaticon.com/uicons-regular-solid/css/uicons-regular-solid.css" rel="stylesheet" />
        <link href="https://cdn-uicons.flaticon.com/uicons-solid-solid/css/uicons-solid-solid.css" rel="stylesheet" />
        <link href="https://cdn-uicons.flaticon.com/uicons-bold-solid/css/uicons-bold-solid.css" rel="stylesheet" />
        <link href="https://cdn-uicons.flaticon.com/uicons-thin-solid/css/uicons-thin-solid.css" rel="stylesheet" />
        {styles.map((style) => (
          <div key={style} className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-100">
            <Icon name="home" style={style} />
            <span className="text-xs mt-1 text-gray-600">{style}</span>
          </div>
        ))}
      </div>
    );
  },
};

// 所有图标网格展示
export const AllIcons: Story = {
  render: () => {
    const [copied, setCopied] = useState(false);
    const [selectedStyle, setSelectedStyle] = useState<IconStyle>('regular-rounded');
    const icons: IconName[] = [
      'home', 'user', 'settings', 'notification', 'search', 'menu', 'close',
      'edit', 'delete', 'add', 'check', 'cancel', 'arrow-left', 'arrow-right',
      'arrow-up', 'arrow-down', 'star', 'heart', 'share', 'download', 'upload',
      'link', 'calendar', 'clock', 'location', 'phone', 'email', 'message',
      'camera', 'image', 'video', 'music', 'file', 'folder', 'trash'
    ];

    const styles: IconStyle[] = [
      'regular-rounded',
      'regular-straight',
      'solid-rounded',
      'solid-straight',
      'bold-rounded',
      'bold-straight',
      'thin-rounded',
      'thin-straight'
    ];

    const copyToClipboard = () => {
      const code = icons.map(name => `<Icon name="${name}" style="${selectedStyle}" />`).join('\n');
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {styles.map((style) => (
              <Button
                key={style}
                variant={selectedStyle === style ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSelectedStyle(style)}
              >
                {style}
              </Button>
            ))}
          </div>
          <Button
            onClick={copyToClipboard}
            variant="primary"
            size="sm"
          >
            {copied ? 'Copied!' : 'Copy All Icons'}
          </Button>
        </div>
        <link href="https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-solid-rounded/css/uicons-solid-rounded.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-bold-rounded/css/uicons-bold-rounded.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-thin-rounded/css/uicons-thin-rounded.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-regular-straight/css/uicons-regular-straight.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-solid-straight/css/uicons-solid-straight.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-bold-straight/css/uicons-bold-straight.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-thin-straight/css/uicons-thin-straight.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-regular-filled/css/uicons-regular-filled.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-solid-filled/css/uicons-solid-filled.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-bold-filled/css/uicons-bold-filled.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-thin-filled/css/uicons-thin-filled.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-regular-duotone/css/uicons-regular-duotone.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-solid-duotone/css/uicons-solid-duotone.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-bold-duotone/css/uicons-bold-duotone.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-thin-duotone/css/uicons-thin-duotone.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-regular-line/css/uicons-regular-line.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-solid-line/css/uicons-solid-line.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-bold-line/css/uicons-bold-line.css" rel="stylesheet" /> 
        <link href="https://cdn-uicons.flaticon.com/uicons-thin-line/css/uicons-thin-line.css" rel="stylesheet" />
        <link href="https://cdn-uicons.flaticon.com/uicons-regular-solid/css/uicons-regular-solid.css" rel="stylesheet" />
        <link href="https://cdn-uicons.flaticon.com/uicons-solid-solid/css/uicons-solid-solid.css" rel="stylesheet" />
        <link href="https://cdn-uicons.flaticon.com/uicons-bold-solid/css/uicons-bold-solid.css" rel="stylesheet" />
        <link href="https://cdn-uicons.flaticon.com/uicons-thin-solid/css/uicons-thin-solid.css" rel="stylesheet" />
        { copied &&
            <Alert title="Copy successfully" description="You have copyed icon to your clipboard" variant='success' className='absolute top-8 right-8' /> }
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
          {icons.map((name) => (
            <div
              key={name}
              className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(`<Icon name="${name}" style="${selectedStyle}" />`);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
            >
              <Icon name={name} style={selectedStyle} />
              <span className="text-xs mt-1 text-gray-600">{name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
}; 