// Avatar.stories.tsx
import { withAnimation } from '@/.storybook/decorators/animation';
import { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
    title: 'Components/Avatar',
    component: Avatar,
    tags: [ 'autodocs' ],
    decorators: [ withAnimation ],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `

## Avatar

A versatile user avatar component with multiple display modes and status indicators. This is most strong Avatar component at present. This Avatar component can fit all the Avatar use cases. Welcome to give more suggestions.



### Features

* Four size variants: (sm | md | lg | xl)
* Supports image display, initials fallback, and default icon
* Support auto color generation from name or custom color
* Contrast-optimized text colors (auto decide based on the background color)
* Status indicators (online | offline | away | busy | undefined)
* Customizable border and ring effects (use Tailwind like ring-red-500 or ring-[#FF0000] or ring-[rgb(255,0,0)] or ring-[rgba(255,0,0,0.5)] or ring-[hsl(0,100%,50%)] or ring-[hsla(0,100%,50%,0.5)] or #FF0000 or var(--primary-500))
* Customizable size use Tailwind like h-12 w-12 or w-[25px] h-[25px]
* Customizable message count use Tailwind like text-xs text-white or text-[#FF0000] or text-[rgb(255,0,0)] or text-[rgba(255,0,0,0.5)] or text-[hsl(0,100%,50%)] or text-[hsla(0,100%,50%,0.5)] or #FF0000 or var(--primary-500)
* Customizable background color use Tailwind like bg-red-500 or bg-[#FF0000] or bg-[rgb(255,0,0)] or bg-[rgba(255,0,0,0.5)] or bg-[hsl(0,100%,50%)] or bg-[hsla(0,100%,50%,0.5)] or #FF0000 or var(--primary-500)
* Customizable text color use Tailwind like text-red-500 or text-[#FF0000] or text-[rgb(255,0,0)] or text-[rgba(255,0,0,0.5)] or text-[hsl(0,100%,50%)] or text-[hsla(0,100%,50%,0.5)] or text-[#FF0000] or text-[var(--primary-500)]

### Other

If you like my Avatar component, please give me a star on [GitHub](https://github.com/xianzhezhang/xianzhe.site).



<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" class="mercado-match" width="24" height="24" focusable="false">
      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
    </svg>[scottcheung1110](https://www.linkedin.com/in/scottcheung1110/)
<img class='w-[25px] h-[25px]' src="https://media.licdn.com/dms/image/v2/D5603AQECYxBqcxprfg/profile-displayphoto-shrink_400_400/B56ZaMQ34xHsAs-/0/1746109957382?e=1753315200&v=beta&t=X6tvS6aIbFJSt-15Daub1EVkCOS18ijYkCIjj6nZ5XI" alt="" />
My personal website [xianzhe.site](https://xianzhe.site)

### Usage
        `,
            },
        },
    },
    argTypes: {
        size: {
            options: [ 'sm', 'md', 'lg', 'xl' ],
            control: { type: 'select' },
            description: 'Size variant of the avatar',
            table: {
                defaultValue: { summary: 'md' },
                category: 'Appearance',
            },
        },
        status: {
            options: [ 'online', 'offline', 'away', 'busy', undefined ],
            control: { type: 'select' },
            description: 'User status indicator',
            table: {
                category: 'Status',
            },
        },
        bordered: {
            control: 'boolean',
            description: 'Add white border around avatar',
            table: {
                defaultValue: { summary: 'false' },
                category: 'Appearance',
            },
        },
        ring: {
            control: 'boolean',
            description: 'Add colored ring around avatar',
            table: {
                defaultValue: { summary: 'false' },
                category: 'Appearance',
            },
        },
        customSize: {
            control: 'text',
            description: 'Custom size of the avatar use Tailwind, Like h-12 w-12 or w-[25px] h-[25px]',
            table: {
                category: 'Appearance',
            },
        },
        ringColor: {
            control: 'color',
            description: 'Custom color for the ring effect',
            table: {
                defaultValue: { summary: 'ring-primary-500' },
                category: 'Appearance',
            },
        },
        borderColor: {
            control: 'color',
            description: 'Custom color for the border',
            table: {
                defaultValue: { summary: 'border-gray-400' },
                category: 'Appearance',
            },
        },
        name: {
            control: 'text',
            description: 'Name used for initials and alt text',
            table: {
                category: 'Content',
            },
        },
        bgColor: {
            control: 'color',
            description: 'Custom background color',
            table: {
                category: 'Appearance',
            },
            if: {
                arg: 'src',
                truthy: false,
            },
        },
        src: {
            control: 'text',
            description: 'Image source URL',
            table: {
                category: 'Content',
            },
        },
        alt: {
            control: 'text',
            description: 'Alt text for image',
            table: {
                category: 'Content',
            },
        },
        message: {
            control: { type: 'range', min: 1, max: 200, step: 1 },
            description: 'Message count to display',
            table: {
                category: 'Content',
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
    args: {
        name: '',
    },
    parameters: {
        docs: {
            description: {
                story: 'Default avatar without any info will display default icon.',
            },
        },
    },
};
export const WithAutoBackground: Story = {
    args: {
        name: '张贤哲',
    },
    parameters: {
        docs: {
            description: {
                story:
                    'Default avatar with generated initials and automatic background color based on name.',
            },
        },
    },
};

export const WithImage: Story = {
    args: {
        src: 'https://media.licdn.com/dms/image/v2/D5603AQECYxBqcxprfg/profile-displayphoto-shrink_400_400/B56ZaMQ34xHsAs-/0/1746109957382?e=1753315200&v=beta&t=X6tvS6aIbFJSt-15Daub1EVkCOS18ijYkCIjj6nZ5XI',
        name: 'Scott Cheung',
        bordered: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Avatar with profile image and optional white border.',
            },
        },
    },
};
export const WithMessage: Story = {
    args: {
        src: 'https://media.licdn.com/dms/image/v2/D5603AQECYxBqcxprfg/profile-displayphoto-shrink_400_400/B56ZaMQ34xHsAs-/0/1746109957382?e=1753315200&v=beta&t=X6tvS6aIbFJSt-15Daub1EVkCOS18ijYkCIjj6nZ5XI',
        name: 'Scott Cheung',
        bordered: true,
        message: 48,
    },

    parameters: {
        docs: {
            description: {
                story: 'Avatar with profile image and optional white border.',
            },
        },
    },
};

export const WithStatus: Story = {
    args: {
        src: 'https://img.picgo.net/2025/03/17/Aesthetic-Attitude0c7ee64b7da66172.png',
        name: 'Scott Cheung',
        bordered: true,
        status: 'online',
    },
    parameters: {
        docs: {
            description: {
                story: 'Avatar with profile image and status indicator.',
            },
        },
    },
};
export const WithRingEffect: Story = {
    args: {
        name: 'Special User',
        ring: true,
        ringColor: 'ring-blue-500',
        size: 'lg',
    },
    parameters: {
        docs: {
            description: {
                story: 'Avatar with custom colored ring effect for emphasis.',
            },
        },
    },
};

export const DifferentSizeAvatar: Story = {
    render: () => (
        <div className='center gap-16'>
            <Avatar
                name='XS'
                size='sm'
            />
            <Avatar
                name='MD'
                size='md'
            />
            <Avatar
                name='LG'
                size='lg'
            />
            <Avatar
                name='XL'
                size='xl'
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Size variants from small (sm) to extra large (xl).',
            },
        },
    },
};

export const AvatarWithDifferentMessage: Story = {
    render: () => (
        <div className='center gap-16'>
            <div className='flex flex-col items-center gap-4'>
                <Avatar
                    name='Online User'
                    message={ 1 }
                />
                <p>Online</p>
            </div>
            <div className='flex flex-col items-center gap-4'>
                <Avatar message={ 29 } />
                <p>Offline</p>
            </div>
            <div className='flex flex-col items-center gap-4'>
                <Avatar
                    name='Away User'
                    status='away'
                    message={ 2 }
                />
                <p>Away</p>
            </div>
            <div className='flex flex-col items-center gap-4'>
                <Avatar
                    name='Busy User'
                    status='busy'
                    message={ 125 }
                />
                <p>Busy</p>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Various status indicator styles for different user states.',
            },
        },
    },
};

export const AvatarWithDifferentStatuses: Story = {
    render: () => (
        <div className='center gap-16'>
            <div className='flex flex-col items-center gap-4'>
                <Avatar
                    name='Online User'
                    src='https://media.licdn.com/dms/image/v2/D5603AQECYxBqcxprfg/profile-displayphoto-shrink_400_400/B56ZaMQ34xHsAs-/0/1746109957382?e=1753315200&v=beta&t=X6tvS6aIbFJSt-15Daub1EVkCOS18ijYkCIjj6nZ5XI'
                    status='online'
                />
                <p>Online</p>
            </div>
            <div className='flex flex-col items-center gap-4'>
                <Avatar
                    name='Offline User'
                    src=' https://img.picgo.net/2024/12/06/avatar16e4aacd08d86884.jpg'
                    status='offline'
                />
                <p>Offline</p>
            </div>
            <div className='flex flex-col items-center gap-4'>
                <Avatar
                    name='Away User'
                    src='https://img.picgo.net/2025/03/17/Aesthetic-Attitude0c7ee64b7da66172.png'
                    status='away'
                />
                <p>Away</p>
            </div>
            <div className='flex flex-col items-center gap-4'>
                <Avatar
                    name='Busy User'
                    src='https://img.picgo.net/2025/03/17/Learning-Ability760866a761496ab2.png'
                    status='busy'
                />
                <p>Busy</p>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Various status indicator styles for different user states.',
            },
        },
    },
};